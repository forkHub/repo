window.onload = () => {
    Grafis(300, 300);
    let sdtBola = 0;
    //bola besar
    let bola = MuatAnimasi("https://forkhub.github.io/gbr/bola_b.png", 64, 64, true);
    Handle(bola, 32, 32);
    Posisi(bola, 150, 150);
    //bola kecil
    let bolaK = MuatAnimasi("https://forkhub.github.io/gbr/bola.png", 16, 16, true);
    Handle(bolaK, 8, 8);
    Posisi(bolaK, 150 - 32 + 12, 150);
    //kotak 1
    let kotak1 = MuatAnimasi("https://forkhub.github.io/gbr/kotak_2.png", 32, 16);
    Handle(kotak1, 8, 8);
    Ukuran(kotak1, 90, 16);
    let kotak2 = MuatAnimasi("https://forkhub.github.io/gbr/kotak_2.png", 32, 16);
    Ukuran(kotak2, 90, 32);
    Handle(kotak2, 8, 16);
    Rotasi(kotak2, -90);
    Alpha(kotak2, 50);
    window.requestAnimationFrame(upate);
    function upate() {
        Bersih();
        //update bolak
        sdtBola += 5;
        if (sdtBola > 360)
            sdtBola -= 360;
        PosisiPolar(bolaK, sdtBola, 20, PosisiX(bola), PosisiY(bola));
        Posisi(kotak1, PosisiX(bolaK), PosisiY(bolaK));
        let sdt = Sudut(PosisiX(kotak2) - PosisiX(kotak1), PosisiY(kotak2) - PosisiY(kotak1));
        Rotasi(kotak1, sdt);
        // Posisi(kotak2, 150, 50);
        PosisiPolar(kotak2, sdt, 64 + 8, PosisiX(kotak1), PosisiY(kotak1));
        PosisiX(kotak2, 150);
        GambarSemua();
        // Gambar(bola, 0);
        // Gambar(test);
        window.requestAnimationFrame(upate);
    }
};
