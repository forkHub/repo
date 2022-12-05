Grafis(300, 300);

let img: ISprite = Muat("./gbr/box.png", false);

function Loop(): void {
	Bersih();
	Ubin(img, 0, 0);
}
