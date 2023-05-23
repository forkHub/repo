/**
 * gambar kontek
 * 
 */

window.onload = () => {
    Grafis(300, 300);

    const petaSpr = Muat('./gbr/peta_kecil.png');
    const ubinSpr = Muat("./gbr/ubin.png");
    Handle(ubinSpr, 32, 0);

    window.requestAnimationFrame(upate);
    function upate(): void {
        Bersih();

        let ctx = Kontek();

        Kontek(SpriteKontek(petaSpr));
        Posisi(ubinSpr, 32, 0);
        Gambar(ubinSpr);

        Kontek(ctx);
        Posisi(petaSpr, 100, 100);
        Gambar(petaSpr);

        window.requestAnimationFrame(upate);
    }

}
