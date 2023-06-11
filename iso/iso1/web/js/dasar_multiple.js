window.onload = () => {
    Grafis(300, 300);
    let spr = Muat("https://forkhub.github.io/gbr/box.png", true);
    Posisi(spr, 50, 100);
    let spr2 = Muat("https://forkhub.github.io/gbr/box.png", true);
    Posisi(spr2, 250, 100);
    window.requestAnimationFrame(update);
    function update() {
        Bersih();
        Gambar(spr);
        Gambar(spr2);
        Tulis("Kotak ini bisa di drag dg dua jari", 300 / 2, 300 / 2);
        window.requestAnimationFrame(update);
    }
};
