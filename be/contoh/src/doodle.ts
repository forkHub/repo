window.onload = () => {
	Grafis(640, 480);

	let brush: ISprite = Muat('https://forkhub.github.io/gbr/brush.png');
	Handle(brush, 8, 8);

	window.requestAnimationFrame(update);

	function update(): void {
		if (Geser()) {
			Posisi(brush, InputX(), InputY());
			Gambar(brush);
		}
		window.requestAnimationFrame(update);
	}
}

