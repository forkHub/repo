window.onload = () => {
    Grafis(320, 320);
    const bt = ha.fb.bentuk;
    const kt = ha.fb.kt;
    let b1 = bt.buat([
        "xx",
        "xx",
    ]);
    bt.geser(b1, 10, 80);
    let b2 = bt.buat([
        "xxxxxxxx",
        " xxxxxxx",
        " xxxxxxx",
        " xxxxxxx",
        " xxxxxxx",
        " xxxxxxx",
        " xxxxxxx",
        "xxxxxxxx",
    ]);
    bt.geser(b2, 100, 10);
    function update() {
        Bersih();
        bt.list[0].bola[0].x += 5;
        for (let i = 0; i < 10; i++) {
            kt.update();
            //tabrakan antar bentuk
            b1.bola.forEach((item) => {
                b2.bola.forEach((item2) => {
                    ha.fb.bola.geser(item, item2);
                });
            });
        }
        bt.debug(b1, Kontek());
        bt.debug(b2, Kontek());
        window.requestAnimationFrame(update);
    }
    update();
};
