Grafis(240, 320);
let spr;
let spr2;
spr = Muat("./gbr/box.png", true);
Posisi(spr, 160, 120);
spr2 = Muat("./gbr/box.png", true);
Posisi(spr2, 160, 120);
console.log('test');
let stat = false;
function Loop() {
    Bersih();
    GambarSemua();
}
