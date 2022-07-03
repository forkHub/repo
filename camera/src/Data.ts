let spots: ISpot[] = [];

//depan
spots.push({
	img: {
		x: 0,
		y: 0,
		dragX: 0,
		// dragY: 0,
		img: null,
		url: "./img/depan.jpg"
	},
	tbl: [
		{
			x: 2540,
			y: 475,
			dragX: 2540,
			img: null,
			url: "./img/box.png",
			target: './img/lompongan_kanan_1.jpg'
		},
		{
			x: 3910,
			y: 475,
			dragX: 3910,
			img: null,
			url: "./img/box.png",
			target: './img/ruang_tamu.jpg'
		},
		{
			x: 5860,
			y: 480,
			dragX: 5860,
			img: null,
			url: "./img/box.png",
			target: './img/lompongan_kiri.jpg'
		},

	]
});

//ruang tamu
spots.push({
	img: {
		x: 0,
		y: 0,
		dragX: 0,
		img: null,
		url: "./img/ruang_tamu.jpg"
	},
	tbl: [
		{
			x: 3110,
			y: 570,
			dragX: 3110,
			img: null,
			url: "./img/box.png",
			target: './img/depan.jpg'
		},

		{
			x: 230,
			y: 310,
			dragX: 230,
			img: null,
			url: "./img/box.png",
			target: './img/dapur_1.jpg'
		},

		//ke arah dapur
	]
});

//ruang tamu 2

//dapur 1
spots.push({
	img: {
		x: 0,
		y: 0,
		dragX: 0,
		img: null,
		url: "./img/dapur_1.jpg"
	},
	tbl: [
		{
			x: 2120,
			y: 380,
			dragX: 2120,
			img: null,
			url: "./img/box.png",
			target: './img/ruang_tamu.jpg'
		},
		{
			x: 380,
			y: 420,
			dragX: 380,
			img: null,
			url: "./img/box.png",
			target: './img/dapur_2.jpg'
		},
	]
});

//dapur 2
spots.push({
	img: {
		x: 0,
		y: 0,
		dragX: 0,
		img: null,
		url: "./img/dapur_2.jpg"
	},
	tbl: [
		{
			x: 4070,
			y: 450,
			dragX: 4070,
			img: null,
			url: "./img/box.png",
			target: './img/dapur_1.jpg'
		},
		{
			x: 5790,
			y: 450,
			dragX: 5790,
			img: null,
			url: "./img/box.png",
			target: './img/sumur.jpg'
		},
	]
});

//sumur
spots.push({
	img: {
		x: 0,
		y: 0,
		dragX: 0,
		img: null,
		url: "./img/sumur.jpg"
	},
	tbl: [
		{
			x: 3790,
			y: 450,
			dragX: 3790,
			img: null,
			url: "./img/box.png",
			target: './img/dapur_2.jpg'
		},
	]
});

//lompongan kiri depan
spots.push({
	img: {
		x: 0,
		y: 0,
		dragX: 0,
		// dragY: 0,
		img: null,
		url: "./img/lompongan_kiri.jpg"
	},
	tbl: [
		{
			x: 6170,
			y: 380,
			dragX: 6170,
			img: null,
			url: "./img/box.png",
			target: './img/depan.jpg'
		},
	]
});

//lompongan kanan depan
spots.push({
	img: {
		x: 0,
		y: 0,
		dragX: 0,
		img: null,
		url: "./img/lompongan_kanan_1.jpg"
	},
	tbl: [
		{
			x: 230,
			y: 400,
			dragX: 230,
			img: null,
			url: "./img/box.png",
			target: './img/depan.jpg'
		},
	]
});

//tamu

let spot: ISpot = spots[0];