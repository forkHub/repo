window.onload = () => {
    Grafis(480, 640);

    let tiang: ISprite = Muat("./gbr/timb3.png", true);
    Handle(tiang, 24, 12);
    Posisi(tiang, 150, 20);

    let lengan: ISprite = Muat("./gbr/timb1.png", true, 2);
    Handle(lengan, 160, 12);
    Posisi(lengan, PosisiX(tiang), 20);

    let anakKi: ISprite = Muat("./gbr/timb2.png", true, 2);
    Handle(anakKi, 36, 12);
    Posisi(anakKi, PosisiX(lengan) - 160, 20);

    let anakKa: ISprite = Muat("./gbr/timb2.png", true, 2);
    Handle(anakKa, 36, 12);
    Posisi(anakKa, PosisiX(lengan) + 160, 20);

    window.requestAnimationFrame(upate);
    function upate(): void {
        Bersih();
        GambarSemua();

        Posisi(lengan, PosisiX(tiang), PosisiY(tiang));
        Posisi(anakKi, PosisiX(lengan) - 160, PosisiY(lengan));
        Posisi(anakKa, PosisiX(lengan) + 160, PosisiY(lengan));


        window.requestAnimationFrame(upate);
    }
};
