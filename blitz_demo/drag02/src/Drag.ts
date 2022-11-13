//deklarasi variable
let spr: ISprite;
let spr2: ISprite;

async function Mulai(): Promise<void> {
	Grafis(240, 320);

	spr = await MuatSprite("./gbr/box.png", true);
	PosisiSprite(spr, 160, 120);

	spr2 = await MuatSprite("./gbr/box.png", true);
	PosisiSprite(spr2, 160, 120);
}

async function Loop(): Promise<void> {
	Bersih();
	TaruhSemuaSprite();
}