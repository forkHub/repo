"use strict";
//panjang dan lebar gambar
let pj = 0;
let lb = 0;
//data warna merah, hijau dan biru
let r = new Array(255);
let g = new Array(255);
let b = new Array(255);
let canvasH; //canvas untuk menggambar histogram
let ctxH; //context dari canvas histogram
let ctx; //context dari gambar sumber
let ctr = 0; //counter untuk menghitung sebelum menggambar
window.onload = () => {
    //inisialisasi warna awal
    for (let i = 0; i < 255; i++) {
        r[i] = 0;
        g[i] = 0;
        b[i] = 0;
    }
    initCanvas();
    initCanvasHisto();
    histo(ctx)
        .catch((e) => {
        console.error(e);
    });
};
//inisialisasi canvas buat gambar
function initCanvas() {
    let canvas = document.createElement('canvas');
    let img = document.getElementById('gbr');
    canvas.style.width = img.naturalWidth + 'px';
    canvas.style.height = img.naturalHeight + 'px';
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    pj = img.naturalWidth;
    lb = img.naturalHeight;
    ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
}
//inisialiasi canvas untuk menggambar histogram
function initCanvasHisto() {
    canvasH = document.createElement('canvas');
    ctxH = canvasH.getContext('2d');
    document.body.appendChild(canvasH);
    canvasH.setAttribute('width', '255');
    canvasH.setAttribute('height', '255');
}
async function gambarHisto(ctx) {
    //cari warna maksimal
    let max = 0;
    for (let i = 0; i < r.length; i++) {
        if (r[i] > max)
            max = r[i];
        if (g[i] > max)
            max = g[i];
        if (b[i] > max)
            max = b[i];
    }
    //bersihkan layar
    ctx.clearRect(0, 0, 255, 255);
    //gambar red
    ctx.beginPath();
    ctx.strokeStyle = '#ff0000';
    ctx.moveTo(0, 0);
    for (let i = 0; i < r.length; i++) {
        ctx.lineTo(i, 255 - (r[i] / max) * 255);
    }
    ctx.stroke();
    //gambar green
    ctx.beginPath();
    ctx.strokeStyle = '#00ff00';
    ctx.moveTo(0, 0);
    for (let i = 0; i < g.length; i++) {
        ctx.lineTo(i, 255 - (g[i] / max) * 255);
    }
    ctx.stroke();
    //gambar blue
    ctx.beginPath();
    ctx.strokeStyle = '#00ff';
    ctx.moveTo(0, 0);
    for (let i = 0; i < b.length; i++) {
        ctx.lineTo(i, 255 - (b[i] / max) * 255);
    }
    ctx.stroke();
}
async function histo(ctx) {
    for (let i = 0; i < pj; i++) {
        for (let j = 0; j < lb; j++) {
            await prosesPixel(ctx, i, j);
        }
    }
}
async function prosesPixel(ctx, i, j) {
    let warna; //rgba
    warna = ctx.getImageData(i, j, 1, 1);
    r[warna.data[0]]++;
    g[warna.data[1]]++;
    b[warna.data[2]]++;
    ctr++;
    if (ctr > 100) {
        await gambarHisto(ctxH);
        await delay(0);
        ctr = 0;
    }
}
async function delay(m = 10) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, m);
    });
}
