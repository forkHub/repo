Grafis(240, 320);
let spr: ISprite = Muat("./gbr/box.png", true);
Posisi(spr, 160, 120);

function Loop(): void {
	Bersih();
	Gambar(spr);
}