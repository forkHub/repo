window.onload = () => {
    Grafis(300, 300);
    let img = Muat("https://forkhub.github.io/gbr/box.png", false);
    window.requestAnimationFrame(update);
    function update() {
        Bersih();
        Ubin(img, 0, 0);
        window.requestAnimationFrame(update);
    }
};
