window.onload = () => {
    let img;
    let frame = 0;
    Grafis(300, 300);
    img = MuatAnimasi('https://forkhub.github.io/gbr/exp2_0.png', 64, 64);
    img = MuatAnimasi('./gbr/angka.png', 64, 64);
    Ukuran(img, 256, 256);
    window.requestAnimationFrame(update);
    function update() {
        Bersih();
        frame = ((frame % 8) + 1);
        Gambar(img, frame - 1);
        window.requestAnimationFrame(update);
    }
};
