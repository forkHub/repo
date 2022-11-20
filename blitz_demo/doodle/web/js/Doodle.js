Grafis(640, 480);
let brush = Muat('./gbr/brush.png');
Handle(brush, 8, 8);
function Loop() {
    if (Geser()) {
        Posisi(brush, InputX(), InputY());
        Gambar(brush);
    }
}
