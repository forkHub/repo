//deklarasi variable
let spr;
let spr2;
async function Mulai() {
    Grafis(240, 320);
    spr = await MuatSprite("./gbr/box.png", true);
    PosisiSprite(spr, 160, 120);
    spr2 = await MuatSprite("./gbr/box.png", true);
    PosisiSprite(spr2, 160, 120);
}
async function Loop() {
    Bersih();
    TaruhSemuaSprite();
}
