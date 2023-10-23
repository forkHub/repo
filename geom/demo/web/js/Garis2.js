/**
 * Garis interaktif
 */
class Garis2 {
    garis;
    p1;
    p2;
    fr = 0; //frame gambar
    constructor(fr = 0) {
        this.garis = ha.geom.Garis.create(ha.geom.Point.buat(0, 0), ha.geom.Point.buat(100, 100));
        this.fr = fr;
        this.p1 = MuatAnimasi("https://forkhub.github.io/gbr/bola.png", 16, 16, true);
        Posisi(this.p1, 10, 10);
        Handle(this.p1, 8, 8);
        this.p2 = Copy(this.p1);
        Posisi(this.p2, 100, 100);
        Handle(this.p2, 8, 8);
    }
    /**
     * update posisi garis dari posisi sprite
     */
    g2p() {
        this.garis.v1.x = PosisiX(this.p1);
        this.garis.v1.y = PosisiY(this.p1);
        this.garis.v2.x = PosisiX(this.p2);
        this.garis.v2.y = PosisiY(this.p2);
    }
    /**
     * update posisi sprite dari posisi garis
     */
    p2g() {
        Posisi(this.p1, this.garis.v1.x, this.garis.v1.y);
        Posisi(this.p2, this.garis.v2.x, this.garis.v2.y);
    }
    gambar() {
        let ctx = Kontek();
        ctx.beginPath();
        ctx.moveTo(PosisiX(this.p1), PosisiY(this.p1));
        ctx.lineTo(PosisiX(this.p2), PosisiY(this.p2));
        ctx.stroke();
        Gambar(this.p1, this.fr);
        Gambar(this.p2, this.fr + 1);
    }
}
