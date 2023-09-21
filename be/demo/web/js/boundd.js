window.onload = () => {
    Grafis(300, 300);
    let spr = Muat("./gbr/box.png");
    Posisi(spr, 150, 100);
    Handle(spr, 16, 16);
    let k = Kontek();
    window.requestAnimationFrame(upate);
    function upate() {
        Rotasi(spr, Rotasi(spr) + 4);
        Bersih();
        Gambar(spr);
        let b = Bound(spr);
        k.beginPath();
        k.moveTo(ha.be.Kotak.minX(b), ha.be.Kotak.minY(b));
        k.lineTo(ha.be.Kotak.maxX(b), ha.be.Kotak.minY(b));
        k.lineTo(ha.be.Kotak.maxX(b), ha.be.Kotak.maxY(b));
        k.lineTo(ha.be.Kotak.minX(b), ha.be.Kotak.maxY(b));
        k.lineTo(ha.be.Kotak.minX(b), ha.be.Kotak.minY(b));
        k.stroke();
        window.requestAnimationFrame(upate);
    }
};
