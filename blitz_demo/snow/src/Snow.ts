let snow: ISnow[] = Dim(100);
snow.forEach((snow: ISnow) => {
	snow.x = Math.random() * 120;
	snow.y = Math.random() * 160;
});

async function Start() {
	Graphics(120, 160);
	// drawAllSnow();
}

//looping
async function Loop(): Promise<void> {
	// if (true) return;
	snow.forEach((item: ISnow) => {
		if (moveDown(item)) return;
		if (moveRight(item)) return;
		if (moveLeft(item)) return;
		item.y = 0;
		item.x = Math.floor(Math.random() * 120);
	});
}

function moveLeft(snow: ISnow): boolean {
	let pixel: number[];

	if (snow.y >= 159) return false;

	pixel = GetPixel(snow.x - 1, snow.y + 1);
	if (pixel[0] > 0) {
		return false;
	}

	// SetColor(0, 0, 0, 1);
	// SetPixel(snow.x, snow.y);
	// snow.x--;
	// snow.y++;
	// SetColor(255, 255, 255, 1);
	// SetPixel(snow.x, snow.y);
	drawSnow(-1, 1, snow);
	return true;
}

function moveRight(snow: ISnow): boolean {
	let pixel: number[];

	if (snow.y >= 159) return false;

	pixel = GetPixel(snow.x + 1, snow.y + 1);
	if (pixel[0] > 0) {
		return false;
	}

	// SetColor(0, 0, 0, 1);
	// SetPixel(snow.x, snow.y);
	// snow.x++;
	// snow.y++;
	// SetColor(255, 255, 255, 1);
	// SetPixel(snow.x, snow.y);
	drawSnow(1, 1, snow);
	return true;
}

function moveDown(snow: ISnow): boolean {
	let pixel: number[];

	if (snow.y >= 159) return false;

	pixel = GetPixel(snow.x, snow.y + 1);
	if (pixel[0] > 0) {
		return false;
	}

	// SetColor(0, 0, 0, 1);
	// SetPixel(snow.x, snow.y);
	// snow.y++;
	// SetColor(255, 255, 255, 1);
	// SetPixel(snow.x, snow.y);
	drawSnow(0, 1, snow);
	return true;
}

function drawSnow(xAdd: number, yAdd: number, snow: ISnow) {
	Color(0, 0, 0, 1);
	SetPixel(snow.x, snow.y);
	snow.x += xAdd;
	snow.y += yAdd;
	Color(255, 255, 255, 1);
	SetPixel(snow.x, snow.y);
}


interface ISnow {
	x: number;
	y: number;
}
