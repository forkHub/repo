"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let fileStr = fs_1.default.readFileSync('data/index.html', "utf-8");
let baseDir = 'data/';
let content = '';
fileStr = ubahCss(fileStr);
fileStr = ubahScript(fileStr);
fs_1.default.writeFileSync('output.html', fileStr);
//ambil css
function ubahCss(data) {
    let hasil = data;
    while (true) {
        console.log('ambil css tag:');
        // console.log(hasil);
        let tag = ambilTag(hasil, /<link href=".*>/);
        console.log('tag: ' + tag);
        if (tag != '') {
            let url = ambilTag(tag, /".*.css"/).slice(1);
            console.log('url: ' + url);
            url = url.slice(0, url.length - 1);
            console.log('url:' + url);
            content = fs_1.default.readFileSync(baseDir + url, 'utf-8');
            content = `\n<!-- ${url} mulai: -->\n <style>\n ${content} \n</style> \n<!-- ${url} selesai -->\n`;
            hasil = hasil.replace(/<link href=".*>/, content);
        }
        else {
            break;
        }
        console.log('/ambil css tag');
    }
    return hasil;
}
;
function ambilTag(src, reg) {
    let regHasil = reg.exec(src);
    let hasil = '';
    if (regHasil) {
        hasil = regHasil[0];
    }
    return hasil;
}
//ambil script
function ubahScript(data) {
    let hasil = data;
    while (true) {
        console.log('ambil tag:');
        let tag = ambilTag(hasil, /<script.*<\/script>/);
        console.log('tag: ' + tag);
        if (tag != '') {
            let url = ambilScriptUrl(tag);
            console.log('url:' + url);
            content = fs_1.default.readFileSync(baseDir + url, 'utf-8');
            content = `\n<!-- ${url} mulai: -->\n <script>\n ${content} \n</script> \n<!-- ${url} selesai -->\n`;
            hasil = hasil.replace(/<script.*<\/script>/, content);
        }
        else {
            break;
        }
        console.log('/ambil tag');
    }
    return hasil;
}
function ambilScriptUrl(src) {
    let regSrc = /".*"/.exec(src);
    if (regSrc) {
        let str = regSrc[0].slice(1);
        str = str.slice(0, str.length - 1);
        return str;
    }
    throw Error('');
}
