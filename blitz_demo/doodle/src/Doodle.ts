Grafis(640, 480);
let brush: ISprite = Muat('./gbr/brush.png');
Handle(brush, 8, 8);

function Loop(): void {
	if (Geser()) {
		Posisi(brush, InputX(), InputY());
		Gambar(brush);
	}
}