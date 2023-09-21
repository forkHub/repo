window.onload = () => {
	Grafis(300, 300);

	let img: ISprite = Muat("https://forkhub.github.io/gbr/box.png", false);

	window.requestAnimationFrame(update);
	function update(): void {
		Bersih();
		Ubin(img, 0, 0);
		window.requestAnimationFrame(update);
	}
}
