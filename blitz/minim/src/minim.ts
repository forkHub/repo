import fs from "fs";

let file: string = process.argv.slice(2)[0];
let output: string = process.argv.slice(2)[1];

let buff: string = fs.readFileSync(file, 'utf-8');
let hasil: string = '';

buff.split(/\r?\n/).forEach((str: string) => {
	str = str.trim();
	hasil += str;
});

//tulis ke file
fs.writeFileSync(output, hasil);