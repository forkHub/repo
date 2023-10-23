/**
 * test method getbound dari garis
 */
window.onload = () => {
    Grafis(240, 320);
    let Garis = ha.geom.Garis;
    let g = new Garis2(0);
    window.g = g;
    function update() {
        Bersih();
        Garis.updateBound(g.garis);
        g.g2p();
        ha.geom.Bound.render(Kontek(), g.garis.b);
        g.gambar();
        Gambar(g.p1);
        Gambar(g.p2);
        window.requestAnimationFrame(update);
    }
    update();
};
