///<reference path='PathFinder.ts'/>
let canvas;
function mulai() {
    let res = [];
    canvas = document.body.querySelector('canvas');
    canvas.getContext("2d").clearRect(0, 0, 320, 640);
    _peta = initPeta();
    gambarTembok(canvas.getContext('2d'), _peta);
    res = pfCariJalan(2, 2, 7, 2);
    gambarJalan(canvas.getContext("2d"), res);
    console.log(res);
    res = pfCariJalan(0, 0, 7, 0);
    console.log(res);
    res = pfCariJalan(0, 0, 17, 17);
    console.log(res);
    res = pfCariJalan(2, 2, 5, 2);
    console.log(res);
}
function gambarJalan(ctx, jalan) {
    let img = document.body.querySelector('div#image img#img_bola');
    for (let i = 0; i < jalan.length; i++) {
        let posisi = jalan[i];
        ctx.drawImage(img, posisi[0] * 32 + 8, posisi[1] * 32 + 8);
    }
}
function gambarTembok(ctx, _peta) {
    let img = document.body.querySelector('div#image img#img_box');
    let str = '';
    for (let j = 0; j < _peta.length; j++) {
        str = _peta[j];
        console.log(str);
        for (let i = 0; i < str.length; i++) {
            if ("X" == str.charAt(i)) {
                ctx.drawImage(img, i * 32, j * 32);
            }
            else if (" " == str.charAt(i)) {
                //gambar rumput
            }
            else {
                throw new Error();
            }
        }
    }
}
function initPeta() {
    return [
        "XXXXXXXXXX",
        "X        X",
        "X    X   X",
        "X    X   X",
        "X    X   X",
        "X        X",
        "XXXXXXXXXX",
    ];
}
