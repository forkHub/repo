Grafis(320, 240);

let rot: number = 0;
let jml: number = 10;
let boxAr: ISprite[] = [];

let spr: ISprite = Muat('./gbr/box.png');

for (let i: number = 0; i < jml; i++) {
	let spr2: ISprite = Copy(spr);
	Ukuran(spr2, 16, 16);
	Handle(spr2, 8, 8);
	boxAr.push(spr2);
	Posisi(spr2, -Math.floor(Math.random() * 320), Math.floor(Math.random() * 240));
}

let imgBesar: ISprite = Copy(spr);
Posisi(imgBesar, 120, 120);
Ukuran(imgBesar, 30, 200);
Handle(imgBesar, 16, 100);
Rotasi(imgBesar, 30);

function Loop(): void {
	Bersih();

	for (let i: number = 0; i < jml; i++) {
		let box: ISprite = boxAr[i];
		Posisi(box, PosisiX(box) + 10, PosisiY(box));

		if (PosisiX(box) > 320) {
			PosisiX(box, 0);
			PosisiY(box, Math.floor(Math.random() * 240));
		}

		if (Tabrakan(box, imgBesar)) {
			PosisiX(box, 0);
			PosisiY(box, Math.floor(Math.random() * 240));
		}

		Gambar(box);
	}

	rot = ((rot + .5) % 360);
	Rotasi(imgBesar, rot);
	Gambar(imgBesar);
}