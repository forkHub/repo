window.onload = () => {
    Grafis(320, 320);
    const bt = ha.fb.bentuk;
    const bl = ha.fb.bola;
    const kt = ha.fb.kt;
    let b1 = bt.buat([
        'xxxxxxx',
        'xxx   x',
        'xxx   x',
        'xxx   x',
        'xxx   x',
    ]);
    window.requestAnimationFrame(update);
    function update() {
        Bersih();
        bt.list[0].bola[0].x++;
        bl.update();
        kt.update();
        kt.update();
        kt.update();
        kt.update();
        kt.update();
        kt.update();
        bt.update();
        bt.debug(b1, Kontek());
        kt.debug(Kontek());
        window.requestAnimationFrame(update);
    }
};
