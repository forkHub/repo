Grafis(240, 320);
let spr: ISprite;
let spr2: ISprite;

spr = Muat("./gbr/box.png", true);
Posisi(spr, 160, 120);

spr2 = Muat("./gbr/box.png", true);
Posisi(spr2, 160, 120);
console.log('test');
let stat: boolean = false;

function Loop(): void {
	Bersih();
	GambarSemua();
}