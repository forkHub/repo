import fs from "fs";

let file: string = process.argv.slice(2)[0];

let buff: string = fs.readFileSync(file, 'utf-8');
let hasil: string = '';

buff.split(/\r?\n/).forEach((str: string) => {
	if (tambahEnterSebelum(str)) {
		hasil += '\n';
	}

	hasil += str;
	hasil += '\n';

	if (tambahEnterSesudah(str)) {
		hasil += '\n';
	}
});

//tulis ke file
fs.writeFileSync(process.argv.slice(2)[1], hasil);

function tambahEnterSesudah(str: string): boolean {
	if (str.indexOf('Grafis(') > -1) return true;

	return false;
}

function tambahEnterSebelum(str: string): boolean {
	if (str.indexOf('function') > -1) return true;
	if (str.indexOf('if (') > -1) return true;
	if (str.indexOf('else if (') > -1) return true;
	if (str.indexOf('else {') > -1) return true;
	if (str.indexOf('for (let') > -1) return true;

	return false;
}
