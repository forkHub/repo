//DECLARE GLOBAL VARIABLE
let matahari: ISprite;
let bumi: ISprite;
let sudutBumi: number = 90;
let bulan: ISprite;
let sudutBulan: number = 0;

//START PROGRAM
async function Mulai(): Promise<void> {
	Grafis(240, 320);

	matahari = await MuatSprite("./gbr/box.png", true);
	PosisiSprite(matahari, 120, 160);

	bumi = await MuatSprite("./gbr/box.png");
	PosisiSprite(bumi, 160, 120);

	bulan = await MuatSprite("./gbr/box.png");
	PosisiSprite(bulan, 200, 120);

}

//LOOOP
async function Loop(): Promise<void> {
	Bersih();

	sudutBumi++;
	if (sudutBumi > 360) {
		sudutBumi -= 360;
	}

	sudutBulan++;
	if (sudutBulan > 360) {
		sudutBulan -= 360;
	}

	PosisiPolarSprite(bumi, sudutBumi, 60, PosisiXSprite(matahari), PosisiYSprite(matahari));
	PosisiPolarSprite(bulan, sudutBulan, 60, PosisiXSprite(bumi), PosisiYSprite(bumi));

	TaruhSemuaSprite();
}