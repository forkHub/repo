Grafis(320, 240);

let img: ISprite;
let imgBig: ISprite;
let frame: number = 0;
let deg: number = 0;
let rot: number = 0;

let boxAr: IV2D[] = [];
for (let i: number = 0; i < 10; i++) {
	boxAr[i].x = -Math.floor(Math.random() * 320);
	boxAr[i].y = Math.floor(Math.random() * 240);
}

Grafis(320, 240);
img = Muat("./gbr/box.png");
Ukuran(img, 16, 16);
Handle(img, 8, 8);

imgBig = Muat("./gbr/box.png");
Ukuran(imgBig, 30, 200);
Handle(imgBig, 16, 100);
PutarGambar(imgBig, 30);

console.log(ImageCollide(img, 0, 0, imgBig, 100, 0));
}

async function Loop(): Promise<void> {
	Cls();

	for (let i: number = 0; i < 10; i++) {
		let box: IV2D = boxAr[i];
		box.x += 10;
		if (box.x > 320) {
			box.x = 0;
			box.y = Math.floor(Math.random() * 240);
		}

		if (ImageCollide(img, box.x, box.y, imgBig, 290, 120)) {
			box.x = 0;
			box.y = Math.floor(Math.random() * 240);
		}

		DrawImage(img, box.x, box.y);
	}

	rot = ((rot + 5) % 360);
	RotateImage(imgBig, rot);
	DrawImage(imgBig, 290, 120);

}