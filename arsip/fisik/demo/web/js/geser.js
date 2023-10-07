window.onload = () => {
    const Garis = ha.geom.Garis;
    const Point = ha.geom.Point;
    const bola = ha.fb.bola;
    let garis = Garis.create(Point.buat(0, 0), Point.buat(100, 100));
    let b1 = bola.buatBola();
    let b2 = bola.buatBola();
    Grafis(300, 300);
    let p1 = MuatAnimasi("https://forkhub.github.io/gbr/bola.png", 16, 16, true);
    Posisi(p1, 10, 10);
    Handle(p1, 8, 8);
    let p2 = Copy(p1);
    Posisi(p2, 100, 100);
    Handle(p2, 8, 8);
    window.requestAnimationFrame(update);
    window.onkeyup = (e) => {
        if (e.key == 'p') {
            bola.geser(b1, b2);
            Posisi(p1, b1.x, b1.y);
            Posisi(p2, b2.x, b2.y);
            garis.v1.x = b1.x;
            garis.v1.y = b1.y;
            garis.v2.x = b2.x;
            garis.v2.y = b2.y;
        }
        console.log(e);
    };
    function update() {
        garis.v1.x = PosisiX(p1);
        garis.v1.y = PosisiY(p1);
        b1.x = PosisiX(p1);
        b1.y = PosisiY(p1);
        garis.v2.x = PosisiX(p2);
        garis.v2.y = PosisiY(p2);
        b2.x = PosisiX(p2);
        b2.y = PosisiY(p2);
        Bersih();
        gambarGaris();
        Gambar(p1);
        Gambar(p2, 1);
        gambarBola(b1);
        gambarBola(b2);
        let jrk = Math.floor(ha.geom.Transform.jarak(b1.x, b1.y, b2.x, b2.y));
        Tulis(`singgung: ${bola.singgung(b1, b2)} /jarak: ${jrk}`, 300 / 2, 20);
        window.requestAnimationFrame(update);
    }
    function gambarBola(b) {
        let ctx = Kontek();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
        ctx.stroke();
    }
    function gambarGaris() {
        let ctx = Kontek();
        ctx.beginPath();
        ctx.moveTo(PosisiX(p1), PosisiY(p1));
        ctx.lineTo(PosisiX(p2), PosisiY(p2));
        ctx.stroke();
    }
};
