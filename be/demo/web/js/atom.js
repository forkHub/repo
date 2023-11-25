/**
 * simulasi atom
 */
window.onload = () => {
    Grafis(240, 320);
    const sudut = [
        0, 30, 60, 90, 120, 150
    ];
    //el
    const el = MuatAnimasi("./gbr/bola.png", 16, 16);
    Handle(el, 8, 8);
    window.requestAnimationFrame(update);
    function update() {
        Bersih();
        Posisi(el, 120, 160);
        Gambar(el, 0);
        for (let i = 0; i < sudut.length; i++) {
            let ctx = Kontek();
            ctx.strokeStyle = "#ffffff33";
            Oval(120, 160, 100, 1, .3, i * 30);
        }
        for (let i = 0; i < sudut.length; i++) {
            sudut[i] += 3;
            PosisiPolar(el, sudut[i], 100, 120, 160, 1, .3);
            ha.be.Transform.rotateRel(PosisiX(el), PosisiY(el), 120, 160, i * 30);
            Posisi(el, ha.be.Transform.lastX, ha.be.Transform.lastY);
            Gambar(el, i);
        }
        // Gambar(el, 1);
        window.requestAnimationFrame(update);
    }
    function gambarOval(x, y, radius, skalax, skalay, sudut) {
        let ctx = Kontek();
        ctx.moveTo(x, y);
        radius;
        skalax;
        skalay;
        sudut;
    }
    gambarOval(0, 0, 1, 1, 1, 1);
};
