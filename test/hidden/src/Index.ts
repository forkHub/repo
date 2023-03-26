let angka1: number = Math.floor(Math.random() * 255);
let angka2: number = Math.floor(Math.random() * 255);
let angka3: number = Math.floor(Math.random() * 255);
let angkaH: string[] = [];

let bin1: string = kanan('00000000' + angka1.toString(2));
let bin2: string = kanan('00000000' + angka2.toString(2));
let bin3: string = kanan('00000000' + angka3.toString(2));

console.log(bin1);
console.log(bin2);
console.log(bin3);

let bin: string = bin1 + bin2;

console.log(bin);


function kanan(str: string, pjg: number = 8): string {
	return str.slice(str.length - pjg);
}

for (let i: number = 0; i < bin.length; i++) {
	let str: string = bin.slice(i, i + 8);
	if (str.length >= 8) {
		if (angkaH.indexOf(str) == -1) {
			console.log(str);
			angkaH.push(str);
		}
		else {

		}
	}
}

if (angkaH.indexOf(bin3) >= 0) {
	console.log('ada');
}
else {
	console.log('tidak ada');
}