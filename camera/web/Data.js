let spots = [];

//depan
spots.push({
	gbr: {
		url: "./img/depan.jpg"
	},
	tbl: [
		{
			x: 1280,
			y: 200,
			url: "./img/box.png",
			target: './img/lompongan_kanan_1.jpg',
			geser: -1860
		},
		{
			x: 1950,
			y: 200,
			url: "./img/box.png",
			target: './img/ruang_tamu.jpg',
			geser: 0
		},
		{
			x: 2950,
			y: 200,
			url: "./img/box.png",
			target: './img/lompongan_kiri.jpg',
			geser: -51
		},

	]
});

//ruang tamu ok
spots.push({
	gbr: {
		url: "./img/ruang_tamu.jpg"
	},
	tbl: [
		{
			x: 1530,
			y: 200,
			url: "./img/box.png",
			target: './img/depan.jpg',
			geser: 0
		},

		{
			x: 130,
			y: 200,
			url: "./img/box.png",
			target: './img/tengah.jpg',
			geser: -513
		},
	]
});

//ruang tamu 2 ok
spots.push({
	gbr: {
		url: "./img/tengah.jpg"
	},
	tbl: [
		{
			x: 2578,
			y: 200,
			url: "./img/box.png",
			target: './img/ruang_tamu.jpg',
			geser: -970
		},

		{
			x: 1020,
			y: 200,
			url: "./img/box.png",
			target: './img/dapur_1.jpg',
			geser: -3222
		},

		{
			x: 60,
			y: 200,
			url: "./img/box.png",
			target: './img/lompongan_kanan_2.jpg',
			geser: 0
		},


	]
});

//dapur 1 ok
spots.push({
	gbr: {
		url: "./img/dapur_1.jpg"
	},
	tbl: [
		{
			x: 1050,
			y: 200,
			url: "./img/box.png",
			target: './img/tengah.jpg',
			geser: -2140
		},
		{
			x: 190,
			y: 200,
			url: "./img/box.png",
			target: './img/dapur_2.jpg',
			geser: 0
		},
		{
			x: 3620,
			y: 200,
			url: "./img/box.png",
			target: './img/musholla.jpg',
			geser: 0
		},
	]
});

//musholla ok
spots.push({
	gbr: {
		url: "./img/musholla.jpg"
	},
	tbl: [
		{
			x: 2950,
			y: 200,
			url: "./img/box.png",
			target: './img/dapur_1.jpg',
			geser: - 589
		},
	]
});

//dapur 2 ok
spots.push({
	gbr: {
		url: "./img/dapur_2.jpg"
	},
	tbl: [
		{
			x: 1930,
			y: 200,
			url: "./img/box.png",
			target: './img/dapur_1.jpg',
			geser: -1699

		},
		{
			x: 2890,
			y: 200,
			url: "./img/box.png",
			target: './img/sumur.jpg',
			geser: 0
		},
	]
});

//sumur ok
spots.push({
	gbr: {
		url: "./img/sumur.jpg"
	},
	tbl: [
		{
			x: 1850,
			y: 200,
			url: "./img/box.png",
			target: './img/dapur_2.jpg',
			geser: 0
		},
	]

});

//lompongan kiri depan ok
spots.push({
	gbr: {
		url: "./img/lompongan_kiri.jpg"
	},
	tbl: [
		{
			x: 3100,
			y: 200,
			url: "./img/box.png",
			target: './img/depan.jpg',
			geser: -450
		},

	]
});

//lompongan kanan depan ok
spots.push({
	gbr: {
		url: "./img/lompongan_kanan_1.jpg"
	},
	tbl: [
		{
			x: 140,
			y: 200,
			url: "./img/box.png",
			target: './img/depan.jpg',
			geser: -2410
		},
		{
			x: 2580,
			y: 200,
			url: "./img/box.png",
			target: './img/lompongan_kanan_2.jpg',
			geser: -928
		},
	]
});

//lompongan kanan belakang ok
spots.push({
	gbr: {
		url: "./img/lompongan_kanan_2.jpg"
	},
	tbl: [
		{
			x: 2310,
			y: 200,
			url: "./img/box.png",
			target: './img/tengah.jpg',
			geser: -1600
		},
		{
			x: 3450,
			y: 200,
			url: "./img/box.png",
			target: './img/lompongan_kanan_1.jpg',
			geser: 0
		},
	]
});


let spot = spots[0];