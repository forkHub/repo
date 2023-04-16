window.onload = () => {
    const Garis = ha.geom.Garis;
    let g = new Garis2();
    let g2 = new Garis2(2);
    Grafis(300, 300);
    window.requestAnimationFrame(update);
    function update() {
        g.g2p();
        g2.g2p();
        Bersih();
        g.gambar();
        g2.gambar();
        Tulis("tabrakan: " + (Garis.tabrakan(g.garis, g2.garis)), 300 / 2, 20);
        window.requestAnimationFrame(update);
    }
};
