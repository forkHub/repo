//DECLARE GLOBAL VARIABLE
let matahari: ISprite;
let bumi: ISprite;
let sudut: number = 10;

//START PROGRAM
async function Mulai(): Promise<void> {
	Grafis(480, 480);

	matahari = await MuatSprite("./gbr/matahari.png", true);
	UkuranSprite(matahari, 100, 100);
	HandleSpriteTengah(matahari);
	PosisiSprite(matahari, 240, 240);

	bumi = await MuatSprite("./gbr/bumi.png", true);
	UkuranSprite(bumi, 50, 50);
	HandleSpriteTengah(bumi);
	PosisiSprite(bumi, 500, 240);
}

//LOOOP
async function Loop(): Promise<void> {
	Bersih();

	sudut++;
	if (sudut > 360) {
		sudut -= 360;
	}

	PosisiPolarSprite(bumi, sudut, 160, PosisiXSprite(matahari), PosisiYSprite(matahari));
	TaruhSemuaSprite();
}