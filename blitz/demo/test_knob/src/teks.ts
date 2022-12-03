Grafis(150, 150);

Font("12px Consolas");
Rata("left");

//kelipatan 7x10

function Loop(): void {
	Bersih();

	let ctx: CanvasRenderingContext2D = Kontek();
	ctx.lineWidth = 2;
	Oval(75, 75, 65, 1, 1);
	Oval(120, 75, 15, 1, 1);
	Oval(75, 75, 5, 1, 1);
}

