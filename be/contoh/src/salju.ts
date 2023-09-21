window.onload = () => {
	Grafis(120, 160);

	//buat 100 object salju
	let salju: ISalju[] = [];
	for (let i: number = 0; i < 100; i++) {
		salju.push({
			x: Math.random() * 120,
			y: Math.random() * 150
		});
	}

	window.requestAnimationFrame(update);
	function update(): void {

		//proses tiap salju
		salju.forEach((item: ISalju) => {

			//check apakah masih bisa turun ke bawah
			if (turun(item)) return;

			//check apakah masih bisa turun ke kanan bawah
			if (kanan(item)) return;

			//check apakah bisa turun ke kiri bawah
			if (kiri(item)) return;

			//bila sudah tidak bisa gerak
			//balikkan posisi salju ke atas
			//posisi x diacak agar posisi berubah
			item.y = 0;
			item.x = Math.floor(Math.random() * 120);
		});
		window.requestAnimationFrame(update);
	}
}

//check apakah bisa belok kiri
function kiri(salju: ISalju): boolean {

	//bila sudah sampai bawah tidak perlu lanjut
	if (salju.y >= 159) return false;

	//ambil piksel kiri bawah, untuk di check warnanya
	AmbilPiksel(salju.x - 1, salju.y + 1);

	/** 
	 * check apakah sudah ada salju disitu
	 * dengan mengecheck salah satu komponen warna
	 * Bila salah satu komponen warna merah/biru/hijau bukan 0
	 * berarti disitu sudah ada saljunya
	 * */
	if (Biru() > 0) {
		return false;
	}

	//gambar salju dengan posisi belok ke kiri-bawah
	gambarSalju(-1, 1, salju);

	//bila masih bisa gerak maka return true
	return true;
}

//check apakah bisa belok kanan
function kanan(salju: ISalju): boolean {

	//bila sudah sampai bawah tidak perlu lanjut
	if (salju.y >= 159) return false;

	AmbilPiksel(salju.x + 1, salju.y + 1);
	if (Biru() > 0) {
		return false;
	}

	gambarSalju(1, 1, salju);
	return true;
}

//check apakah bisa turun
function turun(salju: ISalju): boolean {

	//bila sudah sampai bawah tidak perlu lanjut
	if (salju.y >= 159) return false;

	AmbilPiksel(salju.x, salju.y + 1);
	if (Biru() > 0) {
		return false;
	}

	gambarSalju(0, 1, salju);
	return true;
}

//gambar salju
function gambarSalju(tambahX: number, tambahY: number, salju: ISalju) {
	Warna(0, 0, 0, 255);
	SetPiksel(salju.x, salju.y);
	salju.x += tambahX;
	salju.y += tambahY;
	Warna(255, 255, 255, 255);
	SetPiksel(salju.x, salju.y);
}

interface ISalju {
	x: number;
	y: number;
}
