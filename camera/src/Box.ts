let imgDrag: boolean = false;	//img is dragged or not

let ratio: number = 0;
let w2: number = 0;
let normalFl: boolean = false;

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
	Graphics(400, 800);

	// await loadData();
	await load();
	await gantiGambar('./img/sumur.jpg');
}

function normalize(): void {
	if (spot.img.x > 400) {
		spot.img.x -= w2 - 2;
		spot.img.dragX = spot.img.x;

		for (let i: number = 0; i < spot.tbl.length; i++) {
			let tbl: ITombol = spot.tbl[i];
			tbl.x -= w2 - 2;
			tbl.dragX = tbl.x;
		}

		console.log('normalize >');
		console.log('w2 ' + w2);
		console.log('img x ' + spot.img.x);
	}
	else if ((spot.img.x + w2) < 0) {
		spot.img.x += w2 + 2;
		spot.img.dragX = spot.img.x;

		for (let i: number = 0; i < spot.tbl.length; i++) {
			let tbl: ITombol = spot.tbl[i];
			tbl.x += w2 + 2;
			tbl.dragX = tbl.x;
		}

		console.log('normalize <');
		console.log('w2 ' + w2);
		console.log('img x ' + spot.img.x);
	}
}

async function Loop(): Promise<void> {
	Cls();

	drag();

	if (InputHit() > 0) {
		console.log('hit: ' + Math.floor(InputX() - spot.img.x) + '/' + (InputY()));
		console.log('key ' + GetKey());

		if (GetKey() == 'ArrowRight') {
			console.log('kanan');
			geser();
			FlushKeys();
		}

		await checkHit();
	}

	//draw second
	gambar();
	// gambar2();
}

function geser(): void {
	spot.img.x += 100;
	spot.img.dragX = spot.img.x;

	for (let i: number = 0; i < spot.tbl.length; i++) {
		let tbl: ITombol = spot.tbl[i];
		tbl.x += 100;
		tbl.dragX = tbl.x;
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

	ratio = 800 / spot.img.img.height;
	ResizeImage(spot.img.img, spot.img.img.width * ratio, spot.img.img.height * ratio);
	w2 = spot.img.img.width * ratio;
}

function drag() {

	if (InputDown()) {

		imgDrag = true;
		spot.img.dragX = spot.img.x;

		for (let i: number = 0; i < spot.tbl.length; i++) {
			let tbl: ITombol = spot.tbl[i];
			tbl.dragX = tbl.x;
		}
	}
	else {
		imgDrag = false;
		spot.img.x = spot.img.dragX;

		for (let i: number = 0; i < spot.tbl.length; i++) {
			let tbl: ITombol = spot.tbl[i];
			tbl.x = tbl.dragX;
		}

		normalize();
	}

	if (InputDrag() && imgDrag) {
		spot.img.dragX = spot.img.x + InputDragX();

		for (let i: number = 0; i < spot.tbl.length; i++) {
			let tbl: ITombol = spot.tbl[i];
			tbl.dragX = tbl.x + InputDragX();
		}
	}
}

function gambar() {

	DrawImage(spot.img.img, spot.img.dragX, 0);

	for (let i: number = 0; i < spot.tbl.length; i++) {
		let tbl: ITombol = spot.tbl[i];
		DrawImage(tbl.img, tbl.dragX, tbl.y);
	}
}

async function checkHit(): Promise<void> {
	for (let i: number = 0; i < spot.tbl.length; i++) {
		let tbl: ITombol = spot.tbl[i];

		if (ImageDotCollide(tbl.img, tbl.dragX, tbl.y, InputX(), InputY())) {
			//collide tombol
			console.log('collide tombol normal');
			await gantiGambar(tbl.target);
		}

		//kiri
		if (spot.img.dragX < 0) {
			if (ImageDotCollide(tbl.img, tbl.dragX + (w2) - 2, tbl.y, InputX(), InputY())) {
				//collide tombol
				console.log('collide tombol kiri')
				await gantiGambar(tbl.target);
			}
		}
		else {
			if (ImageDotCollide(tbl.img, tbl.dragX - (w2) + 2, tbl.y, InputX(), InputY())) {
				//collide tombol
				console.log('collide tombol kanan')
				await gantiGambar(tbl.target);
			}

			// DrawImage(spot.img.img, spot.img.dragX - (w2) + 2, 0);
		}

		//kanan
	}

}

function gambar2(): void {
	if (spot.img.dragX < 0) {

		DrawImage(spot.img.img, spot.img.dragX + (w2) - 2, 0);
		for (let i: number = 0; i < spot.tbl.length; i++) {
			let tbl: ITombol = spot.tbl[i];
			DrawImage(tbl.img, tbl.dragX + (w2) - 2, 0);
		}
	}
	else {
		DrawImage(spot.img.img, spot.img.dragX - (w2) + 2, 0);

		for (let i: number = 0; i < spot.tbl.length; i++) {
			let tbl: ITombol = spot.tbl[i];
			DrawImage(tbl.img, tbl.dragX - (w2) + 2, 0);
		}
	}
}

async function gantiGambar(gbr: string): Promise<void> {
	for (let i: number = 0; i < spots.length; i++) {
		let spotItem: ISpot = spots[i];
		if (spotItem.img.url == gbr) {
			spot = spotItem;
			await load();
			return;
		}
	}

	throw Error('gbr tidak ketemu ' + gbr);
}