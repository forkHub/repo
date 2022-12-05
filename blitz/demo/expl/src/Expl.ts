let img: ISprite;
let frame: number = 0;

Grafis(300, 300);
FPS(20);

img = MuatAnimasi('./gbr/exp2_0.png', 64, 64);
Ukuran(img, 256, 256);

function Loop(): void {
	Bersih();
	frame = ((frame % 8) + 1);
	Gambar(img, frame - 1);
}

