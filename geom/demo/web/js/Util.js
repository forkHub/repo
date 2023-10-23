/**
 * garis interaktif
 */
class GarisInt {
    spr1 = MuatAnimasi('./gbr/bola.png', 16, 16, true);
    spr2 = MuatAnimasi('./gbr/bola.png', 16, 16, true);
    update() {
    }
    render() {
        Gambar(this.spr1);
        Gambar(this.spr2);
    }
}
