import fs from "fs";

let fileStr: string = fs.readFileSync('data/index.html', "utf-8");
let baseDir: string = 'data/';
let content: string = '';

fileStr = ubahCss(fileStr);
fileStr = ubahScript(fileStr);
fs.writeFileSync('output.html', fileStr);

//ambil css
function ubahCss(data: string): string {
    let hasil: string = data;

    while (true) {
        console.log('ambil css tag:');
        // console.log(hasil);

        let tag: string = ambilTag(hasil, /<link href=".*>/);
        console.log('tag: ' + tag);

        if (tag != '') {
            let url: string = ambilTag(tag, /".*.css"/).slice(1);
            console.log('url: ' + url);
            url = url.slice(0, url.length - 1);
            console.log('url:' + url);

            content = fs.readFileSync(baseDir + url, 'utf-8');
            content = `\n<!-- ${url} mulai: -->\n <style>\n ${content} \n</style> \n<!-- ${url} selesai -->\n`;
            hasil = hasil.replace(/<link href=".*>/, content);
        }
        else {
            break;
        }
        console.log('/ambil css tag')
    }

    return hasil;
};

function ambilTag(src: string, reg: RegExp): string {
    let regHasil: RegExpExecArray = reg.exec(src);
    let hasil: string = '';

    if (regHasil) {
        hasil = regHasil[0];
    }

    return hasil;
}

//ambil script
function ubahScript(data: string): string {
    let hasil: string = data;

    while (true) {
        console.log('ambil tag:');

        let tag: string = ambilTag(hasil, /<script.*<\/script>/);
        console.log('tag: ' + tag);

        if (tag != '') {
            let url: string = ambilScriptUrl(tag);
            console.log('url:' + url);

            content = fs.readFileSync(baseDir + url, 'utf-8');
            content = `\n<!-- ${url} mulai: -->\n <script>\n ${content} \n</script> \n<!-- ${url} selesai -->\n`;
            hasil = hasil.replace(/<script.*<\/script>/, content);
        }
        else {
            break;
        }
        console.log('/ambil tag')
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
