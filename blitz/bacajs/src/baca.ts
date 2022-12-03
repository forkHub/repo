import fs from "fs";

let file: string = process.argv.slice(2)[0];

let buff: string = fs.readFileSync(file, 'utf-8');
let hasil: string = '';
// let statusEnter: boolean = false;
let statusKomentSekarang: boolean = false;
let statusKomentSebelum: boolean = false;

buff.split(/\n/).forEach((str: string) => {
	updateStatusKomentar(str);

	if (tambahEnterSebelum(str)) {
		hasil += '\n';
		// statusEnter = true; 
	}
	else {
		// statusEnter = false;
	}

	hasil += str;
	hasil += '\n';

	if (tambahEnterSesudah(str)) {
		hasil += '\n';
	}
});

let ctr: number = 0;
while (ctr < 100) {
	ctr++;
	// hasil.replace(/\r?\n\r?\n\r?\n/, '\n');
}

//tulis ke file
fs.writeFileSync(process.argv.slice(2)[1], hasil);

function tambahEnterSesudah(str: string): boolean {
	if (str.indexOf('Grafis(') > -1) return true;

	return false;
}

function updateStatusKomentar(str: string): void {
	statusKomentSebelum = statusKomentSekarang;

	if (str.trim().slice(0, 2) == '//') {
		statusKomentSekarang = true;
	}
	else {
		statusKomentSekarang = false;
	}

	console.log('update status komentar');
	console.log('str ' + str);
	console.log('sebelum ' + statusKomentSebelum);
	console.log('sekarang ' + statusKomentSekarang);
	console.log('');
}

function tambahEnterSebelum(str: string): boolean {
	if (statusKomentSebelum == false) {
		if (str.indexOf('//') > -1) return true;
		if (str.indexOf('/*') > -1) return true;
		if (str.indexOf('function') > -1) return true;
		if (str.indexOf('if (') > -1) return true;
		if (str.indexOf('else if (') > -1) return true;
		if (str.indexOf('else {') > -1) return true;
		if (str.indexOf('for (let') > -1) return true;
	}

	return false;
}
