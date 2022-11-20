Grafis(480, 480);
let matahari: ISprite;
let bumi: ISprite;
let sudut: number = 10;

matahari = Muat("./gbr/matahari.png", true);
Ukuran(matahari, 100, 100);
Handle(matahari, 50, 50);
Posisi(matahari, 240, 240);

bumi = Muat("./gbr/bumi.png");
Ukuran(bumi, 50, 50);
Handle(bumi, 25, 25);

function Loop(): void {
	Bersih();

	sudut++;
	if (sudut > 360) {
		sudut -= 360;
	}

	PosisiPolar(bumi, sudut, 160, PosisiX(matahari), PosisiY(matahari));
	GambarSemua();
}