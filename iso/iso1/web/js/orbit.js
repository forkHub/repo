window.onload = () => {
    Grafis(480, 480);
    let matahari;
    let bumi;
    let sudut = 10;
    matahari = Muat("https://forkhub.github.io/gbr/matahari.png", true);
    Ukuran(matahari, 100, 100);
    Handle(matahari, 50, 50);
    Posisi(matahari, 240, 240);
    bumi = Muat("https://forkhub.github.io/gbr/bumi.png");
    Ukuran(bumi, 50, 50);
    Handle(bumi, 25, 25);
    window.requestAnimationFrame(update);
    function update() {
        Bersih();
        sudut++;
        if (sudut > 360) {
            sudut -= 360;
        }
        PosisiPolar(bumi, sudut, 160, PosisiX(matahari), PosisiY(matahari));
        GambarSemua();
        window.requestAnimationFrame(update);
    }
};
