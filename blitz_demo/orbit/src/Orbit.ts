//DECLARE GLOBAL VARIABLE
let spr: ha_blitz.ISprite;
let spr2: ha_blitz.ISprite;
let sudut: number = 10;

//START PROGRAM
async function Start(): Promise<void> {
	Graphics(240, 320);

	spr = await LoadSprite("./gbr/box.png", true);
	PositionSprite(spr, 120, 160);

	spr2 = await LoadSprite("./gbr/box.png", true);
	PositionSprite(spr2, 160, 120);
}

//LOOOP
async function Loop(): Promise<void> {
	Cls();

	sudut++;
	if (sudut > 360) {
		sudut -= 360;
	}

	PositionPolarSprite(spr2, sudut, 60, GetSpritePositionX(spr), GetSpritePositionY(spr));
	DrawAllSprite();
}