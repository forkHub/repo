"use strict";
var teks = '';
var teksDebug = '';
let ok = 0;
let gagal = 0;
function hidden(charBin) {
    let teksTest;
    console.log('hidden, charBin: ' + charBin);
    if (teks.length < 64) {
        teksTest = teks;
    }
    else {
        teksTest = teks.slice(teks.length - 64);
    }
    console.log('test text: ' + teksTest);
    let index = teksTest.indexOf(charBin);
    let bin2;
    console.log('index: ' + index);
    if (index >= 0) {
        bin2 = '000000' + index.toString(2);
        bin2 = bin2.slice(bin2.length - 64);
        bin2 = '1' + bin2;
        ok++;
    }
    else {
        bin2 = '0' + charBin;
        gagal++;
    }
    console.log('bin2 ' + bin2);
    teks += bin2;
    teksDebug += '-' + bin2;
}
for (let i = 0; i < 10; i++) {
    let angka = Math.floor(Math.random() * 256);
    let bin = '00000000' + angka.toString(2);
    bin = bin.slice(bin.length - 8);
    console.group();
    hidden(bin);
    console.groupEnd();
}
