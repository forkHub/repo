window.onload = () => {
    Grafis(600, 800);

    const p = Panah.buat();
    p.spr = Muat('./gbr/kotak.png', true);
    Handle(p.spr, 16, 16);

    p.spr2 = Copy(p.spr);
    Handle(p.spr2, 16, 16);

    function update() {
        Bersih();

        gambarPanah();
        Gambar(p.spr2);
        Gambar(p.spr);
        window.requestAnimationFrame(update);
    }

    function gambarPanah() {
        let ctx = Kontek();
        ctx.beginPath();
        ctx.moveTo(PosisiX(p.spr), PosisiY(p.spr));
        ctx.lineTo(PosisiX(p.spr2), PosisiY(p.spr2));
        ctx.stroke();
    }

    window.requestAnimationFrame(update);
}