let brush: IBuffer;

async function Start(): Promise<void> {
	Graphics(640, 480);
	FPS(60);
	brush = await LoadImage('./gbr/brush.png');
	MidHandle(brush);
}

async function Loop(): Promise<void> {
	if (InputDrag()) {
		DrawImage(brush, InputX(), InputY());
	}
}