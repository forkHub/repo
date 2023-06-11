window.onload = () => {
    Grafis(160, 160);
    let jam = Muat('https://forkhub.github.io/gbr/jam.png');
    Handle(jam, 64, 64);
    Posisi(jam, 80, 80);
    let jarumPanjang = Muat('https://forkhub.github.io/gbr/jarum_panjang.png', true, 2);
    Handle(jarumPanjang, 5, 50);
    Posisi(jarumPanjang, 80, 80);
    let jarumPendek = Muat('https://forkhub.github.io/gbr/jarum_pendek.png', true, 2);
    Handle(jarumPendek, 5, 30);
    Posisi(jarumPendek, 80, 80);
    window.requestAnimationFrame(update);
    function update() {
        Bersih();
        Gambar(jam);
        Gambar(jarumPanjang);
        Gambar(jarumPendek);
        window.requestAnimationFrame(update);
    }
};
