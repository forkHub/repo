Grafis(400, 400);
let tombol = Muat("./gbr/box.png");
Handle(tombol, 100, 100);
Ukuran(tombol, 200, 200);
Posisi(tombol, 200, 200);
let handel = Muat("./gbr/box.png", true);
Handle(handel, 16, 16);
Posisi(handel, 284, 200);
Alpha(handel, 128);
function Loop() {
    Bersih();
    // Sudut
    let sudut = Sudut(PosisiX(handel) - PosisiX(tombol), PosisiY(handel) - PosisiY(tombol));
    Rotasi(tombol, sudut);
    Gambar(tombol);
    Gambar(handel);
}
