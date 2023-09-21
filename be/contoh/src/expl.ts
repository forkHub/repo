window.onload = () => {
	let img: ISprite;
	let frame: number = 0;

	Grafis(300, 300);

	img = MuatAnimasi('https://forkhub.github.io/gbr/exp2_0.png', 64, 64);
	Ukuran(img, 256, 256);

	window.requestAnimationFrame(update);
	function update(): void {
		Bersih();
		frame = ((frame % 8) + 1);
		Gambar(img, frame - 1);
		window.requestAnimationFrame(update);
	}
}
