window.onload = () => {
	Grafis(480, 480);

	const mainChar = new MainChar();
	const map: PfMap = new PfMap();
	const tembokGbr: ISprite = Muat('gbr/box.png');

	mainChar.init();

	map.setMap([
		'XXXXXXXXXXXXXXX',
		'X             X',
		'X      X      X',
		'X      X      X',
		'X      X      X',
		'X      X      X',
		'X             X',
		'X   X      X  X',
		'X   X      X  X',
		'X   X      X  X',
		'X   XXXXXXXX  X',
		'X             X',
		'X             X',
		'X             X',
		'XXXXXXXXXXXXXXX',
	])

	mainChar.pos.x = 2 * 32;
	mainChar.pos.y = 2 * 32;
	mainChar.updateView();
	mainChar.map = map;

	requestAnimationFrame(loop);
	function loop(): void {
		Bersih();

		if (InputHit()) {
			if (InputType() == EInput.TOUCH || InputType() == EInput.MOUSE) {
				let posX: number = Math.floor(InputX() / 32);
				let posY: number = Math.floor(InputY() / 32);
				mainChar.jalanKePos(posX, posY);
			}
		}

		mainChar.update();

		gambarTembok();
		Gambar(mainChar.view);

		requestAnimationFrame(loop);
	}

	function gambarTembok() {
		for (let j: number = 0; j < map.height; j++) {
			for (let i: number = 0; i < map.width; i++) {
				if (map.getCellValue(i, j) == 1) {
					Posisi(tembokGbr, i * 32, j * 32);
					Gambar(tembokGbr);
				}
			}
		}
	}
}
