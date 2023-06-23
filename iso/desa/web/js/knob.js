window.onload = () => {
    Grafis(400, 400);
    //buat tombol
    let tombol = Muat("https://forkhub.github.io/gbr/knob.png");
    Handle(tombol, 75, 75);
    Posisi(tombol, 200, 200);
    //buat pegangan
    let pegangan = Muat("https://forkhub.github.io/gbr/knob_tombol.png", true);
    Handle(pegangan, 16, 16);
    Posisi(pegangan, 245, 200);
    Alpha(pegangan, 50);
    window.requestAnimationFrame(update);
    function update() {
        Bersih();
        //hitung sudut antara pegangan dan tombol
        let sudut = Sudut(PosisiX(pegangan) - PosisiX(tombol), PosisiY(pegangan) - PosisiY(tombol));
        //rotasi tombol berdasarkan sudut
        Rotasi(tombol, sudut);
        //jaga posisi pegangan agar tetap di tempatnya
        PosisiPolar(pegangan, sudut, 45, PosisiX(tombol), PosisiY(tombol));
        Gambar(tombol);
        Gambar(pegangan);
        //tulis sudut
        Tulis("Sudut: " + Math.floor(sudut), 200, 110);
        Tulis("Tombol ini bisa diputar", 200, 310);
        window.requestAnimationFrame(update);
    }
};
