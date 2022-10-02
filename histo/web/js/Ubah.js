"use strict";
let pj = 0;
let lb = 0;
let r = new Array(255);
let g = new Array(255);
let b = new Array(255);
let canvasR;
let ctxR;
let ctr = 0;
window.onload = () => {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let img = document.getElementById('gbr');
    canvas.style.width = img.naturalWidth + 'px';
    canvas.style.height = img.naturalHeight + 'px';
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    pj = img.naturalWidth;
    lb = img.naturalHeight;
    document.body.appendChild(canvas);
    ctx.drawImage(img, 0, 0);
    for (let i = 0; i < 255; i++) {
        r[i] = 0;
        g[i] = 0;
        b[i] = 0;
    }
    initCanvasR();
    histo(ctx)
        .catch((e) => {
        console.error(e);
    });
};
function initCanvasR() {
    canvasR = document.createElement('canvas');
    ctxR = canvasR.getContext('2d');
    document.body.appendChild(canvasR);
    canvasR.setAttribute('width', '255');
    canvasR.setAttribute('height', '255');
}
async function gambarHisto(ctx) {
    for (let i = 0; i < r.length; i++) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, r[i]);
        ctx.stroke();
    }
}
async function histo(ctx) {
    for (let i = 0; i < pj; i++) {
        for (let j = 0; j < lb; j++) {
            await proses(ctx, i, j);
        }
    }
}
async function proses(ctx, i, j) {
    let warna; //rgba
    warna = ctx.getImageData(i, j, 1, 1);
    r[warna.data[0]]++;
    g[warna.data[1]]++;
    b[warna.data[2]]++;
    ctr++;
    if (ctr > 500) {
        await gambarHisto(ctxR);
        await ha.comp.Util.delay(0);
        ctr = 0;
    }
}
