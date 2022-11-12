let img: IBuffer;
let frame: number = 0;
let slide: number = 0;

async function Start(): Promise<void> {
	Graphics(300, 300);
	img = await LoadAnimImage("./gbr/exp2_0.png", 64, 64);
	ResizeImage(img, 120, 120);
}

async function Loop(): Promise<void> {
	Cls();
	frame = ((frame % 8) + 1);
	slide = (slide % 120) + 5;
	TileImage(img, 0, 0, 0);
	TileImage(img, slide, slide, frame - 1);
}
