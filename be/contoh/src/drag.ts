window.onload = () => {
	ha.be.Main.Grafis(300, 300);
	let spr: ISprite = ha.be.Sprite.Muat("./gbr/box.png", true);
	ha.be.Sprite.Posisi(spr, 150, 100);

	window.requestAnimationFrame(upate);
	function upate(): void {
		Bersih();
		Gambar(spr);

		Tulis("Kotak ini bisa di drag", 300 / 2, 300 / 2);
		window.requestAnimationFrame(upate);
	}
};
