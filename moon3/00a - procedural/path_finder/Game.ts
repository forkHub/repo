///<reference path='PathFinder.ts'/>

let peta: Array<string> = [];

function mulai() {
	let res: Array<any> = [];

	initPeta();

	res = pfCariJalan(2, 2, 7, 2);
	console.log(res);

	res = pfCariJalan(0, 0, 7, 0);
	console.log(res);

	res = pfCariJalan(0, 0, 17, 17);
	console.log(res);

	res = pfCariJalan(2, 2, 5, 2);
	console.log(res);
}

function initPeta(): void {
	pfDataPeta = [
		"XXXXXXXXXX",
		"X        X",
		"X    X   X",
		"X    X   X",
		"X    X   X",
		"X        X",
		"XXXXXXXXXX",
	];

	console.log('init peta');
}