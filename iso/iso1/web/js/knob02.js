window.onload = () => {
    Grafis(200, 200);
    //buat tombol yang bisa di rotasi
    let tombol = Muat("https://forkhub.github.io/gbr/tombol2.png", true, 2);
    Handle(tombol, 64, 64);
    Posisi(tombol, 100, 100);
    window.requestAnimationFrame(update);
    function update() {
        Bersih();
        Gambar(tombol);
        Tulis("Tombol ini bisa diputar", 100, 190);
        window.requestAnimationFrame(update);
    }
};
