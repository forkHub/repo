window.onload = () => {
    const Garis = ha.geom.Garis;
    const Point = ha.geom.Point;
    let garis = Garis.create(Point.buat(0, 0), Point.buat(100, 100));
    let garis2 = Garis.create(Point.buat(0, 0), Point.buat(100, 100));
    Grafis(300, 300);
    let p1 = MuatAnimasi("https://forkhub.github.io/gbr/bola.png", 16, 16, true);
    Posisi(p1, 10, 10);
    Handle(p1, 8, 8);
    let p2 = Copy(p1);
    Posisi(p2, 100, 100);
    Handle(p2, 8, 8);
    //garis 2
    let q1 = Copy(p1);
    Posisi(q1, 110, 10);
    Handle(q1, 8, 8);
    //garis 3
    let q2 = Copy(p1);
    Posisi(q2, 100, 90);
    Handle(q2, 8, 8);
    window.requestAnimationFrame(update);
    function update() {
        garis.v1.x = PosisiX(p1);
        garis.v1.y = PosisiY(p1);
        garis.v2.x = PosisiX(p2);
        garis.v2.y = PosisiY(p2);
        garis2.v1.x = PosisiX(q1);
        garis2.v1.y = PosisiY(q1);
        garis2.v2.x = PosisiX(q2);
        garis2.v2.y = PosisiY(q2);
        Bersih();
        gambarGaris(p1, p2);
        gambarGaris(q1, q2);
        gambarBound(p1, p2);
        gambarBound(q1, q2);
        Gambar(p1);
        Gambar(p2, 1);
        Gambar(q1, 2);
        Gambar(q2, 3);
        Tulis("bound coll: " + Garis.boundCollide(garis, garis2), 300 / 2, 10);
        window.requestAnimationFrame(update);
    }
    function gambarGaris(p1, p2) {
        let ctx = Kontek();
        ctx.beginPath();
        ctx.moveTo(PosisiX(p1), PosisiY(p1));
        ctx.lineTo(PosisiX(p2), PosisiY(p2));
        ctx.stroke();
    }
    function gambarBound(p1, p2) {
        let ctx = Kontek();
        ctx.beginPath();
        ctx.moveTo(PosisiX(p1), PosisiY(p1));
        ctx.lineTo(PosisiX(p2), PosisiY(p1));
        ctx.lineTo(PosisiX(p2), PosisiY(p2));
        ctx.lineTo(PosisiX(p1), PosisiY(p2));
        ctx.lineTo(PosisiX(p1), PosisiY(p1));
        ctx.stroke();
    }
};
