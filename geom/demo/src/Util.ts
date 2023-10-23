/**
 * garis interaktif
 */
class GarisInt {
    readonly spr1 = MuatAnimasi('./gbr/bola.png', 16, 16, true);
    readonly spr2 = MuatAnimasi('./gbr/bola.png', 16, 16, true);

    update() {

    }

    render() {
        Gambar(this.spr1);
        Gambar(this.spr2);
    }
}