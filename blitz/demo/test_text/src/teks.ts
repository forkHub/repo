Grafis(150, 150);

Font("12px Consolas");
Rata("left");

//kelipatan 7x10

function Loop(): void {
	Bersih();

	Tulis("0 1 2 3 4 5 6 7 8 9", 0, 10);
	Tulis("0 1 2 3 4 5 6 7 8 9", 0, 20);

	kotak(0, 0, 300, 300);
	kotak(0, 0, 300, 9);
	kotak(0, 10, 300, 9);

	kotak(0, 20, 6, 10);
	kotak(7, 20, 6, 10);
	kotak(14, 20, 6, 10);
}

function kotak(x: number, y: number, w: number, h: number): void {
	Kontek().beginPath();
	Kontek().moveTo(x, y);
	Kontek().rect(x, y, w, h);
	Kontek().stroke();
}