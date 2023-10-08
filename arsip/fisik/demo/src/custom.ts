window.onload = () => {
    Grafis(320, 320);

    const bt = ha.fb.bentuk;
    const kt = ha.fb.kt;
    const bl = ha.fb.bola;

    let b1 = buatGear();
    bt.geser(b1, 64, 64);

    let b2 = buatGear();
    bt.geser(b2, 128, 64);
    putar(b2, 16, 128, 64);
    // putar(b1, 1, 64, 64);
    // putar;

    Bersih();
    // for (let i = 0; i < 52; i++) {
    //     Bersih();
    //     putar(b1, 1, 64, 64);

    //     for (let j = 0; j < 10; j++) {
    //         kt.update();
    //     }

    //     bt.debug(b1, Kontek());
    //     kt.debug(Kontek());
    // }

    function update() {
        Bersih();
        putar(b1, 2, 64, 64);

        for (let i = 0; i < 10; i++) {
            kt.update();
            b1.bola.forEach((item) => {
                b2.bola.forEach((item2) => {
                    ha.fb.bola.geser(item, item2);
                })
            })
        }

        bt.debug(b1, Kontek());
        bt.debug(b2, Kontek());
        // kt.debug(Kontek());

        window.requestAnimationFrame(update);
    }
    update();

    function buatGear(rad: number = 32, jmlBola: number = 8): ha.fb.BentukObj {
        let b1 = bt.buat([]);
        let b = bl.buatBola();
        b.statik = true;
        b1.bola.push(b);

        for (let i = 0; i < jmlBola; i++) {
            let b = bl.buatBola();
            ha.geom.Transform.posPolar(rad, i * (360 / 8));
            b.x = ha.geom.Transform.lastX;
            b.y = ha.geom.Transform.lastY;
            b1.bola.push(b);
        }
        bt.konst2(b1);

        return b1;
    }

    function putar(b: ha.fb.BentukObj, sudut: number = 0, px: number = 0, py: number = 0) {
        b.bola.forEach((item) => {
            let sudutBola = ha.geom.Transform.sudut(item.x - px, item.y - py);
            let jarakBola = ha.geom.Transform.jarak(item.x, item.y, px, py);
            ha.geom.Transform.posPolar(jarakBola, sudutBola + sudut);
            item.x = ha.geom.Transform.lastX + px;
            item.y = ha.geom.Transform.lastY + py;

            // console.group();
            // console.log(item);
            // console.log("sudut ", sudutBola);
            // console.log("jarak ", jarakBola);
            // console.groupEnd();

        })
    }
} 