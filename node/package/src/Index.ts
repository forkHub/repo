import fs from "fs";

let fileStr: string = fs.readFileSync('index.html', "utf-8");
let content: string = '';

//ambil script
while (true) {
    let tag: string = ambilScriptTag(fileStr);

    if (tag != '') {
        content = fs.readFileSync(ambilScriptUrl(tag), 'utf-8');
        fileStr = fileStr.replace(/<script.*<\/script>/, content);
    }
    else {
        break;
    }
}

function ambilScriptTag(src: string): string {
    let reg: RegExpExecArray = /<script.*<\/script>/.exec(src);
    let hasil: string = '';

    if (reg) {
        hasil = reg[0];
    }

    return hasil;
}

function ambilScriptUrl(src: string): string {
    let regSrc: RegExpExecArray = /".*"/.exec(src);

    if (regSrc) {
        let str: string = regSrc[0].slice(1);
        str = str.slice(0, str.length - 1);
        return str;
    }

    throw Error('');
}
