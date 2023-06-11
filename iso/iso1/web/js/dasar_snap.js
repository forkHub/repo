window.onload = () => {
    Grafis(300, 300);
    const snap = 10;
    let pos = 0;
    let spr = Muat("https://forkhub.github.io/gbr/box.png", true);
    Posisi(spr, 50, 100);
    window.requestAnimationFrame(update);
    function update() {
        Bersih();
        //buat posisi agar snap 
        pos = PosisiX(spr);
        pos = Math.floor(pos / snap);
        pos = pos * snap;
        PosisiX(spr, pos);
        pos = PosisiY(spr);
        pos = Math.floor(pos / snap);
        pos = pos * snap;
        PosisiY(spr, pos);
        Gambar(spr);
        window.requestAnimationFrame(update);
    }
};
