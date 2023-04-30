window.onload = () => {
    Grafis(300, 300);
    const fb = ha.fb.fb;
    let b = fb.buatBola();
    b.x = 50;
    b.y = 50;
    let b2 = fb.buatBola();
    b2.x = 100;
    b2.y = 50;
    let k = ha.fb.Konstrain.buat(b, b2);
    b2.x = 65;
    b2.y = 65;
    window.requestAnimationFrame(update);
    window.onkeyup = (e) => {
        if (e.key == 'p') {
            k.geser(b, b2);
            // k.geser(b2, b);
        }
        console.log(e);
    };
    function update() {
        Bersih();
        gambarBola();
        window.requestAnimationFrame(update);
    }
    function gambarBola() {
        let ctx = Kontek();
        ctx.beginPath();
        fb.bolaAr.forEach((b) => {
            ctx.moveTo(b.x, b.y);
            ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
        });
        ctx.moveTo(100, 100);
        ctx.arc(100, 100, b.r, 0, 2 * Math.PI);
        ctx.stroke();
    }
};
