//DECLARE GLOBAL VARIABLE
let imgX: number = 100;			//img x position
let imgY: number = 100;			//img y position
let imgDrag: boolean = false;	//img is dragged or not
let imgDragX: number = 100;		//img x position when dragged
let imgDragY: number = 100;		//img y position when dragged

//define data structure for drag image 
let imgObj: ImgData = {
	img: null,
	x: 0,
	y: 0,
	isDrag: false,
	dragX: 0,
	dragY: 0
}

let imgAr: ImgData[] = Dim(10, imgObj);

//START PROGRAM
async function Start(): Promise<void> {
	Graphics(320, 240);

	let img: IBuffer = await LoadImage("./gbr/box.png");

	for (let i: number = 0; i < imgAr.length; i++) {
		let item: ImgData = imgAr[i];
		item.x = Math.floor(Math.random() * 320 - 32);
		item.y = Math.floor(Math.random() * 240 - 32);
		item.dragX = item.x;
		item.dragY = item.y;
		item.img = CopyImage(img);
		RotateImage(item.img, Math.floor(Math.random() * 360));
	}

	Color(255, 255, 255, 1);
}

//LOOOP
async function Loop(): Promise<void> {
	Cls();

	handleInput();

	for (let i: number = 0; i < imgAr.length; i++) {
		DrawImage(imgAr[i].img, imgAr[i].dragX, imgAr[i].dragY);
	}

}

function handleInput() {
	//if input is pressed (mouse/touch)
	if (InputDown()) {
		let draggedImg: IBuffer = null;

		//get current dragged image
		for (let i: number = 0; i < imgAr.length; i++) {
			if (imgAr[i].isDrag) {
				draggedImg = imgAr[i].img;
			}
		}

		//if there already dragged image, don't take new image
		if (!draggedImg) {
			//if input position collide with image
			for (let i: number = 0; i < imgAr.length; i++) {
				if (ImageDotCollide(imgAr[i].img, imgAr[i].x, imgAr[i].y, InputX(), InputY())) {
					imgAr[i].isDrag = true;
					imgAr[i].dragX = imgAr[i].x;
					imgAr[i].dragY = imgAr[i].y;
					break;
				}
			}
		}
	}
	else {
		for (let i: number = 0; i < imgAr.length; i++) {
			imgAr[i].isDrag = false;
			imgAr[i].x = imgAr[i].dragX;
			imgAr[i].y = imgAr[i].dragY;
		}
	}

	if (InputDrag()) {
		for (let i: number = 0; i < imgAr.length; i++) {
			if (imgAr[i].isDrag) {
				imgAr[i].dragX = imgAr[i].x + InputDragX();
				imgAr[i].dragY = imgAr[i].y + InputDragY();
			}
		}
	}
}


interface ImgData {
	img: IBuffer,
	x: number,
	y: number,
	isDrag: boolean,
	dragX: number,
	dragY: number
}