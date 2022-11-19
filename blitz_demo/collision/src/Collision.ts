Grafis(320, 240);

let img: ISprite;
let imgBig: ISprite;
let frame: number = 0;
let deg: number = 0;
let rot: number = 0;
let jml: number = 10;
let boxAr: ISprite[] = [];

for (let i: number = 0; i < jml; i++) {
	let spr: ISprite = Muat('./gbr/box.png');
	Ukuran(spr, 16, 16);
	Handle(spr, 8, 8);
	boxAr.push(spr);
	Posisi(spr, -Math.floor(Math.random() * 320), Math.floor(Math.random() * 240));
}

imgBig = Muat("./gbr/box.png");
Posisi(imgBig, 120, 120);
Ukuran(imgBig, 30, 200);
Handle(imgBig, 16, 100);
Rotasi(imgBig, 30);

// console.log(Tabrakan(img, 0, 0, imgBig, 100, 0));

function Loop(): void {
	Bersih();

	for (let i: number = 0; i < jml; i++) {
		let box: ISprite = boxAr[i];
		Posisi(box, PosisiX(box) + 10, PosisiY(box));

		if (PosisiX(box) > 320) {
			PosisiX(box, 0);
			PosisiY(box, Math.floor(Math.random() * 240));
		}

		//TODO:
		if (ha.Image.gambarTabrakan(box.buffer, box.x, box.y, imgBig.buffer, PosisiX(imgBig), PosisiY(imgBig))) {
			PosisiX(box, 0);
			PosisiY(box, Math.floor(Math.random() * 240));
		}

		Gambar(box);
	}

	rot = ((rot + .5) % 360);
	Rotasi(imgBig, rot);
	Gambar(imgBig);
}