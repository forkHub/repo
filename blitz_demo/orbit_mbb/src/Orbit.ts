//DECLARE GLOBAL VARIABLE
let matahari: ISprite;
let bumi: ISprite;
let sudut: number = 10;
let bulan: ISprite;
let sudutBulan: number = 0;

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

	bulan = await MuatSprite("./gbr/bulan_32.png", true);
	UkuranSprite(bulan, 32, 32);
	HandleSpriteTengah(bulan);

}

//LOOOP
async function Loop(): Promise<void> {
	Bersih();

	sudut += .5;
	if (sudut > 360) {
		sudut -= 360;
	}

	sudutBulan += 6;
	if (sudutBulan > 360) {
		sudutBulan -= 360;
	}

	PosisiPolarSprite(bumi, sudut, 160, PosisiXSprite(matahari), PosisiYSprite(matahari));
	PosisiPolarSprite(bulan, sudutBulan, 80, PosisiXSprite(bumi), PosisiYSprite(bumi));
	TaruhSemuaSprite();
}