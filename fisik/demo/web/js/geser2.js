window.onload = () => {
    Grafis(300, 300);
    const fb = ha.fb.fb;
    for (let i = 0; i < 5; i++) {
        let b = fb.buatBola();
        b.x = i * 5 + 50;
        b.y = i * 2 + 50;
    }
    window.requestAnimationFrame(update);
    window.onkeyup = (e) => {
        if (e.key == 'p') {
            fb.update();
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
        ctx.stroke();
    }
};
