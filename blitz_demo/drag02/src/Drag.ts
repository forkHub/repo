Grafis(300, 300);
let spr: ISprite = Muat("./gbr/box.png", true);
Posisi(spr, 150, 100);

function Loop(): void {
	Bersih();
	Gambar(spr);

	Tulis("Kotak ini bisa di drag", 300 / 2, 300 / 2);
}