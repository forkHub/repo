let spots: ISpot[] = [];

//depan
spots.push({
	img: {
		x: 0,
		y: 0,
		startX: 0,
		img: null,
		url: "./img/depan.jpg"
	},
	tbl: [
		{
			x: 1280,
			y: 200,
			dragX: 1280,
			img: null,
			url: "./img/box.png",
			target: './img/lompongan_kanan_1.jpg',
			geser: -1860
		},
		{
			x: 1950,
			y: 200,
			dragX: 1950,
			img: null,
			url: "./img/box.png",
			target: './img/ruang_tamu.jpg',
			geser: 0
		},
		{
			x: 2950,
			y: 200,
			dragX: 2950,
			img: null,
			url: "./img/box.png",
			target: './img/lompongan_kiri.jpg',
			geser: -51
		},

	]
});

//ruang tamu
spots.push({
	img: {
		x: 0,
		y: 0,
		startX: 0,
		img: null,
		url: "./img/ruang_tamu.jpg"
	},
	tbl: [
		{
			x: 1530,
			y: 200,
			dragX: 1530,
			img: null,
			url: "./img/box.png",
			target: './img/depan.jpg',
			geser: 0
		},

		{
			x: 130,
			y: 200,
			dragX: 130,
			img: null,
			url: "./img/box.png",
			target: './img/dapur_1.jpg',
			geser: 0
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
		startX: 0,
		img: null,
		url: "./img/dapur_1.jpg"
	},
	tbl: [
		{
			x: 1050,
			y: 200,
			dragX: 1050,
			img: null,
			url: "./img/box.png",
			target: './img/ruang_tamu.jpg',
			geser: 0
		},
		{
			x: 190,
			y: 200,
			dragX: 190,
			img: null,
			url: "./img/box.png",
			target: './img/dapur_2.jpg',
			geser: 0
		},
		{
			x: 3620,
			y: 200,
			dragX: 3620,
			img: null,
			url: "./img/box.png",
			target: './img/musholla.jpg',
			geser: 0
		},
	]
});

//musholla
spots.push({
	img: {
		x: 0,
		y: 0,
		startX: 0,
		img: null,
		url: "./img/musholla.jpg"
	},
	tbl: [
		{
			x: 2950,
			y: 200,
			dragX: 2950,
			img: null,
			url: "./img/box.png",
			target: './img/dapur_1.jpg',
			geser: 0
		},
	]
});

//dapur 2
spots.push({
	img: {
		x: 0,
		y: 0,
		startX: 0,
		img: null,
		url: "./img/dapur_2.jpg"
	},
	tbl: [
		{
			x: 1930,
			y: 200,
			dragX: 1930,
			img: null,
			url: "./img/box.png",
			target: './img/dapur_1.jpg',
			geser: 0

		},
		{
			x: 2890,
			y: 200,
			dragX: 2890,
			img: null,
			url: "./img/box.png",
			target: './img/sumur.jpg',
			geser: 0
		},
	]
});

//sumur
spots.push({
	img: {
		x: 0,
		y: 0,
		startX: 0,
		img: null,
		url: "./img/sumur.jpg"
	},
	tbl: [
		{
			x: 1850,
			y: 200,
			dragX: 1850,
			img: null,
			url: "./img/box.png",
			target: './img/dapur_2.jpg',
			geser: 0
		},
	]

});

//lompongan kiri depan
spots.push({
	img: {
		x: 0,
		y: 0,
		startX: 0,
		img: null,
		url: "./img/lompongan_kiri.jpg"
	},
	tbl: [
		{
			x: 3100,
			y: 200,
			dragX: 3100,
			img: null,
			url: "./img/box.png",
			target: './img/depan.jpg',
			geser: -450
		},

	]
});

//lompongan kanan depan
spots.push({
	img: {
		x: 0,
		y: 0,
		startX: 0,
		img: null,
		url: "./img/lompongan_kanan_1.jpg"
	},
	tbl: [
		{
			x: 140,
			y: 200,
			dragX: 140,
			img: null,
			url: "./img/box.png",
			target: './img/depan.jpg',
			geser: -2410
		},
		{
			x: 2580,
			y: 200,
			dragX: 2580,
			img: null,
			url: "./img/box.png",
			target: './img/lompongan_kanan_2.jpg',
			geser: 0
		},
	]
});

//lompongan kanan belakang
spots.push({
	img: {
		x: 0,
		y: 0,
		startX: 0,
		img: null,
		url: "./img/lompongan_kanan_2.jpg"
	},
	tbl: [
		{
			x: 2310,
			y: 200,
			dragX: 2310,
			img: null,
			url: "./img/box.png",
			target: './img/ruang_tamu.jpg',	//TODO: diganti ruang tamu tengah
			geser: 0
		},
		{
			x: 3450,
			y: 200,
			dragX: 3450,
			img: null,
			url: "./img/box.png",
			target: './img/lompongan_kanan_1.jpg',
			geser: 0
		},
	]
});


//tamu

let spot: ISpot = spots[0];