Grafis(400, 400);

//buat tombol yang bisa di rotasi
let tombol: ISprite = Muat("./gbr/knob.png", true, 1);
Handle(tombol, 75, 75);
Posisi(tombol, 200, 200);

function Loop(): void {
	Bersih();

	Gambar(tombol);

	Tulis("Tombol ini bisa diputar", 200, 300);
}