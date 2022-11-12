//DECLARE GLOBAL VARIABLE
let img: IBuffer;				//img object
let imgX: number = 100;			//img x position
let imgY: number = 100;			//img y position
let imgDrag: boolean = false;	//img is dragged or not
let imgDragX: number = 100;		//img x position when dragged
let imgDragY: number = 100;		//img y position when dragged


//START PROGRAM
async function Start(): Promise<void> {
	Graphics(320, 240);
	img = await LoadImage("./gbr/box.png");
	RotateImage(img, 30);
	MidHandle(img);
	Color(255, 255, 255, 1);
}

//LOOOP
async function Loop(): Promise<void> {
	Cls();

	//if input is pressed (mouse/touch)
	if (InputDown()) {

		//if input position collide with image
		if (ImageDotCollide(img, imgX, imgY, InputX(), InputY())) {
			imgDrag = true;
			imgDragX = imgX;
			imgDragY = imgY;
		}
	}
	else {
		imgDrag = false;
		imgX = imgDragX;
		imgY = imgDragY;
	}

	if (InputDrag() && imgDrag) {
		imgDragX = imgX + InputDragX();
		imgDragY = imgY + InputDragY();
	}

	DrawImage(img, imgDragX, imgDragY);
}