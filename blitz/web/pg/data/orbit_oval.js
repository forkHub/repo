Grafis(800, 500);


let sudut = 10;
let sudutBulan = 0;


//matahari
let matahari = Muat("./gbr/matahari.png", true);
Ukuran(matahari, 100, 100);
Handle(matahari, 50, 50);
Posisi(matahari, 200, 250);


//bumi
let bumi = Muat("./gbr/bumi.png");
Handle(bumi, 25, 25);
Ukuran(bumi, 50, 50);


//bulan
let bulan = Muat("./gbr/bulan_32.png");
Ukuran(bulan, 24, 24);
Handle(bulan, 12, 12);


function Loop() {
    Bersih();


    //sudut bumi
    sudut += .5;


    if (sudut > 360) {
        sudut -= 360;
    }


    //sudut bulan
    sudutBulan += 6;


    if (sudutBulan > 360) {
        sudutBulan -= 360;
    }


    //posisi bumi terhadap matahari
    //dengan skala vertikal .5
    //untuk membuat gerakan memutar oval
    PosisiPolar(bumi, sudut, 350, PosisiX(matahari), PosisiY(matahari), 1, .5);
    Posisi(bumi, PosisiX(bumi) + 180, PosisiY(bumi));


    //posisi bulan terhadap bumi
    PosisiPolar(bulan, sudutBulan, 60, PosisiX(bumi), PosisiY(bumi));


    //oval
    Oval(PosisiX(matahari) + 180, PosisiY(matahari), 350, 1, .5);


    //gambar semua sprite
    GambarSemua();
}


