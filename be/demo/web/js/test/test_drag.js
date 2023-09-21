window.onload = () => {
    Grafis(300, 300);
    let spr = Muat("../gbr/box.png", true);
    Posisi(spr, 150, 100);
    let spr2 = Copy(spr);
    Posisi(spr2, 170, 170);
    let state = false;
    window.requestAnimationFrame(upate);
    window.onkeyup = (e) => {
        state = !state;
        console.log("on key up " + e.code);
        console.log("state " + state);
    };
    function upate() {
        Bersih();
        if (state) {
            Gambar(spr);
            Gambar(spr2);
        }
        else {
            Gambar(spr2);
            Gambar(spr);
        }
        window.requestAnimationFrame(upate);
    }
};
