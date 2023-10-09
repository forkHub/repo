window.onload = () => {
	Grafis(300, 300);
	let spr: ISprite = Muat("https://forkhub.github.io/gbr/box.png", true);
	Posisi(spr, 150, 100);

	window.requestAnimationFrame(update);
	function update(): void {
		Bersih();

		//kunci psosi y pada posisi 100
		PosisiY(spr, 100);
		Gambar(spr);
		Tulis("Kotak ini bisa di drag horizontal", 300 / 2, 300 / 2);
		window.requestAnimationFrame(update);
	}
}