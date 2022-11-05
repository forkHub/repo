var teks: string = '';
var teksDebug: string = '';
let ok: number = 0;
let gagal: number = 0;

function hidden(charBin: string): void {
    let teksTest: string;

    console.log('hidden, charBin: ' + charBin);

    if (teks.length < 64) {
        teksTest = teks;
    }
    else {
        teksTest = teks.slice(teks.length - 64);
    }

    console.log('test text: ' + teksTest)

    let index: number = teksTest.indexOf(charBin);
    let bin2: string;

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
    teksDebug += '-' + bin2
}

for (let i: number = 0; i < 10; i++) {
    let angka: number = Math.floor(Math.random() * 256);
    let bin: string = '00000000' + angka.toString(2);

    bin = bin.slice(bin.length - 8);

    console.group();
    hidden(bin);
    console.groupEnd();
}