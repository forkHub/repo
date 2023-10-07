window.onload = () => {
    Grafis(320, 320);

    const bt = ha.fb.bentuk;
    // const bl = ha.fb.bola;
    const kt = ha.fb.kt;

    // let b1 = bt.buat(
    //     [
    //         'xxxxxxx',
    //         'xxx   x',
    //         'xxx   x',
    //         'xxx   x',
    //         'xxx   x',
    //     ]);

    let b1 = bt.buat([
        "x",
        "x",
        "x",
        "xx",
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
    ])

    function update() {
        Bersih();

        bt.list[0].bola[0].x += .5;

        // bl.update();

        for (let i = 0; i < 10; i++) {
            kt.update();
            // bl.update();
        }

        // kt.update();
        // kt.update();
        // kt.update();
        // kt.update();
        // kt.update();
        // kt.update();

        // bt.update();

        bt.debug(b1, Kontek(), 10, 10);
        // kt.debug(Kontek(), 10, 10);

        window.requestAnimationFrame(update);
    }
    update();
} 