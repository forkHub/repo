window.onload = () => {
    Grafis(800, 500);
    let sudutBumi = 10;
    let perubahanKec = 1;
    //matahari
    let matahari = Muat("https://forkhub.github.io/gbr/matahari.png", true);
    Ukuran(matahari, 100, 100);
    Handle(matahari, 50, 50);
    Posisi(matahari, 200, 250);
    //bumi
    let bumi = Muat("https://forkhub.github.io/gbr/bumi.png");
    Handle(bumi, 25, 25);
    Ukuran(bumi, 50, 50);
    window.requestAnimationFrame(update);
    function update() {
        Bersih();
        //perubahan sudut bumi
        sudutBumi += (.5 * perubahanKec);
        if (sudutBumi > 360) {
            sudutBumi -= 360;
        }
        perubahanKec = (((180 - Math.abs(sudutBumi - 180)) / 180) * 5) + 1;
        //posisi bumi terhadap matahari
        //dengan skala vertikal .5
        //untuk membuat gerakan memutar oval
        PosisiPolar(bumi, sudutBumi, 350, PosisiX(matahari), PosisiY(matahari), 1, .5);
        //geser posisi bumi agak ke kanan
        Posisi(bumi, PosisiX(bumi) + 180, PosisiY(bumi));
        //gambar oval
        Oval(PosisiX(matahari) + 180, PosisiY(matahari), 350, 1, .5);
        //gambar semua sprite
        GambarSemua();
        window.requestAnimationFrame(update);
    }
};
