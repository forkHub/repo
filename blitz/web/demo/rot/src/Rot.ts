let img: IBuffer;
let frame: number = 0;
let deg: number = 0;

async function Start(): Promise<void> {
	Graphics(300, 300);
	img = await LoadImage("https://images.unsplash.com/photo-1622273460359-e23b14724da0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MjUzNzk0Nw&ixlib=rb-1.2.1&q=80&w=400");
	ResizeImage(img, 250, 250);
	MidHandle(img);
	RotateImage(img, 30);
	DrawImage(img);
}

async function Loop(): Promise<void> {
	Cls();

	deg++;
	deg = deg % 360;

	RotateImage(img, deg);
	DrawImage(img, 150, 150);
}
