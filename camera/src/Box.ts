let imgDrag: boolean = false;	//img is dragged or not
let imgDragX: number = 0;		//img x position when dragged
let imgDragY: number = 0;		//img y position when dragged

let ratio: number = 0;
let w2: number = 0;
let normalFl: boolean = false;
let gw: number = 800;
let gh: number = 400;
let boxIdx: number = 0;

async function loadData(): Promise<void> {
	let hasil: XMLHttpRequest = await ha.comp.Util.Ajax('get', './data.json', '');
	if (200 == hasil.status) {
		spots = JSON.parse(hasil.responseText);
		spot = spots[0];
	}
	else {
		ha.comp.dialog.tampil(hasil.responseText);
	}
}

async function Start(): Promise<void> {
	Graphics(gw, gh);

	// await loadData();
	await load();
	await gantiGambar('./img/depan.jpg', -1200);
}

function normalize(): void {
	let b: boolean = true;
	if (b) return;

	if (spot.img.x > gw) {
		spot.img.x -= w2;
		// spot.img.startX = spot.img.x;

		for (let i: number = 0; i < spot.tbl.length; i++) {
			let tbl: ITombol = spot.tbl[i];
			tbl.x -= w2;
			// tbl.dragX = tbl.x;
		}

		console.log('normalize >');
		console.log('w2 ' + w2);
		console.log('img x ' + spot.img.x);
	}
	else if ((spot.img.x + w2) < 0) {
		spot.img.x += w2;
		// spot.img.startX = spot.img.x;

		for (let i: number = 0; i < spot.tbl.length; i++) {
			let tbl: ITombol = spot.tbl[i];
			tbl.x += w2;
			// tbl.dragX = tbl.x;
		}

		console.log('normalize <');
		console.log('w2 ' + w2);
		console.log('img x ' + spot.img.x);
	}
}

function getBox(): void {
	boxIdx++;
	if (boxIdx >= spot.tbl.length) {
		boxIdx = 0;
	}
	console.log('get box ' + boxIdx);
}

async function Loop(): Promise<void> {
	Cls();

	//if input is pressed (mouse/touch)
	if (InputDown()) {
		imgDrag = true;
		imgDragX = spot.img.x;
		imgDragY = spot.img.y;
	}
	else {
		imgDrag = false;
		spot.img.x = imgDragX;
		spot.img.y = imgDragY;
	}

	if (InputDrag() && imgDrag) {
		imgDragX = spot.img.x + InputDragX();
		imgDragY = spot.img.y + InputDragY();
	}

	// DrawImage(spot.img.img, imgDragX, 0);
	gambar();

	if (InputHit() > 0) {
		console.log('hit: x: ' + (InputX() - spot.img.x) + '/y: ' + InputY());
	}

}

/*
async function Loop2(): Promise<void> {
	Cls();

	drag();

	if (InputHit() > 0) {
		console.log('hit: ' + Math.floor(InputX() - spot.img.x) + '/' + (InputY()));
		console.log('key ' + GetKey());

		if (GetKey() == 'ArrowRight') {
			console.log('kanan');
			getBox();
			geser(-(spot.tbl[boxIdx].x - 100));
			FlushKeys();
		}

		if (GetKey() == 'ArrowLeft') {
			console.log('kiri');
			geser(Math.floor(gw * .75));
			FlushKeys();
		}


		await checkHit();
	}

	//draw second
	gambar();
	gambar2();

	//debug
	if (spot && spot.img) {
		let str: string = spot.img.x + '/' + spot.img.startX + '<br/>';
		str += 'imgdrag ' + InputDrag() + '/x ' + InputDragX() + '/y ' + InputDragY();
		ha.comp.Util.getEl('div.debug').innerHTML = str;
	}
}
*/

function geser(jml: number): void {
	let b: boolean = true;
	if (b) return;

	console.log('geser' + jml);

	spot.img.x = jml;
	// spot.img.startX = spot.img.x;

	for (let i: number = 0; i < spot.tbl.length; i++) {
		let tbl: ITombol = spot.tbl[i];
		tbl.x = spot.img.x + tbl.x;
		// tbl.dragX = tbl.x;
	}

	normalize();
}

async function load(): Promise<void> {

	if (!spot.img.img) {
		spot.img.img = await LoadImage(spot.img.url);
	}

	for (let i: number = 0; i < spot.tbl.length; i++) {
		let tbl: ITombol = spot.tbl[i];

		if (!tbl.img) {
			tbl.img = await LoadImage(tbl.url);
		}
	}

	ratio = gh / spot.img.img.height;
	ResizeImage(spot.img.img, Math.ceil(spot.img.img.width * ratio), Math.ceil(spot.img.img.height * ratio));
	w2 = Math.ceil(spot.img.img.width * ratio);
}

function drag() {

	if (InputDown()) {
		if (imgDrag == false) {
			imgDrag = true;

			spot.img.startX = spot.img.x;

			// for (let i: number = 0; i < spot.tbl.length; i++) {
			// 	let tbl: ITombol = spot.tbl[i];
			// 	tbl.dragX = tbl.x;
			// }
		}
	}
	else {
		if (imgDrag) {
			imgDrag = false;
		}

		// spot.img.x = spot.img.dragX;

		// for (let i: number = 0; i < spot.tbl.length; i++) {
		// 	let tbl: ITombol = spot.tbl[i];
		// 	tbl.x = tbl.dragX;
		// }

		normalize();
	}

	if (InputDrag() && imgDrag) {
		spot.img.startX = spot.img.x + InputDragX();

		for (let i: number = 0; i < spot.tbl.length; i++) {
			let tbl: ITombol = spot.tbl[i];
			tbl.dragX = tbl.x + InputDragX();
		}
	}
}

function gambar() {

	DrawImage(spot.img.img, imgDragX, 0);
	// DrawImage(spot.img.img, spot.img.startX, 0);

	for (let i: number = 0; i < spot.tbl.length; i++) {
		let tbl: ITombol = spot.tbl[i];
		DrawImage(tbl.img, imgDragX + tbl.x, tbl.y);
	}
}

async function checkHit(): Promise<void> {
	for (let i: number = 0; i < spot.tbl.length; i++) {
		let tbl: ITombol = spot.tbl[i];

		if (ImageDotCollide(tbl.img, tbl.dragX, tbl.y, InputX(), InputY())) {
			//collide tombol
			console.log('collide tombol normal');
			await gantiGambar(tbl.target, tbl.geser);
		}

		//kiri
		if (spot.img.startX < 0) {
			if (ImageDotCollide(tbl.img, tbl.dragX + (w2) - 2, tbl.y, InputX(), InputY())) {
				//collide tombol
				console.log('collide tombol kiri')
				await gantiGambar(tbl.target, tbl.geser);
			}
		}
		else {
			if (ImageDotCollide(tbl.img, tbl.dragX - (w2) + 2, tbl.y, InputX(), InputY())) {
				//collide tombol
				console.log('collide tombol kanan')
				await gantiGambar(tbl.target, tbl.geser);
			}

			// DrawImage(spot.img.img, spot.img.dragX - (w2) + 2, 0);
		}

		//kanan
	}

}

function gambar2(): void {
	if (spot.img.startX < 0) {

		DrawImage(spot.img.img, spot.img.startX + (w2), 0);
		for (let i: number = 0; i < spot.tbl.length; i++) {
			let tbl: ITombol = spot.tbl[i];
			DrawImage(tbl.img, tbl.dragX + (w2), tbl.y);
		}
	}
	else {
		DrawImage(spot.img.img, spot.img.startX - (w2), 0);

		for (let i: number = 0; i < spot.tbl.length; i++) {
			let tbl: ITombol = spot.tbl[i];
			DrawImage(tbl.img, tbl.dragX - (w2), tbl.y);
		}
	}
}

async function gantiGambar(gbr: string, geserJml: number): Promise<void> {
	for (let i: number = 0; i < spots.length; i++) {
		let spotItem: ISpot = spots[i];
		if (spotItem.img.url == gbr) {
			spot = spotItem;
			await load();
			geser(geserJml);
			return;
		}
	}

	throw Error('gbr tidak ketemu ' + gbr);
}