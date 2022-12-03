Grafis(240, 320);

let spr = Muat("./gbr/box.png", true);
Posisi(spr, 160, 120);

function Loop() {
    Bersih();
    Gambar(spr);
}

