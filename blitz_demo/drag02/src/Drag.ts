//DECLARE GLOBAL VARIABLE
let img: IBuffer;				//img object
let spr: ha_blitz.ISprite;

//START PROGRAM
async function Start(): Promise<void> {
	Graphics(320, 240);
	img = await LoadImage("./gbr/box.png");
	MidHandle(img);

	spr = CreateSprite(img, true);
	PositionSprite(spr, 160, 120);
}

//LOOOP
async function Loop(): Promise<void> {
	Cls();
	DrawSprite(spr);
}