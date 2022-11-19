Grafis(320, 240);
let img;
let imgBig;
let frame = 0;
let deg = 0;
let rot = 0;
let jml = 10;
let boxAr = [];
for (let i = 0; i < jml; i++) {
    let spr = Muat('./gbr/box.png');
    Ukuran(spr, 16, 16);
    Handle(spr, 8, 8);
    boxAr.push(spr);
    Posisi(spr, -Math.floor(Math.random() * 320), Math.floor(Math.random() * 240));
}
imgBig = Muat("./gbr/box.png");
Posisi(imgBig, 120, 120);
Ukuran(imgBig, 30, 200);
Handle(imgBig, 16, 100);
Rotasi(imgBig, 30);
// console.log(Tabrakan(img, 0, 0, imgBig, 100, 0));
function Loop() {
    Bersih();
    for (let i = 0; i < jml; i++) {
        let box = boxAr[i];
        Posisi(box, PosisiX(box) + 10, PosisiY(box));
        if (PosisiX(box) > 320) {
            PosisiX(box, 0);
            PosisiY(box, Math.floor(Math.random() * 240));
        }
        //TODO:
        if (ha.Image.gambarTabrakan(box.buffer, box.x, box.y, imgBig.buffer, PosisiX(imgBig), PosisiY(imgBig))) {
            PosisiX(box, 0);
            PosisiY(box, Math.floor(Math.random() * 240));
        }
        Gambar(box);
    }
    rot = ((rot + .5) % 360);
    Rotasi(imgBig, rot);
    Gambar(imgBig);
}
