window.onload = () => {
    const gPj = 600;
    const gLb = 800;
    Grafis(gPj, gLb);
    let teks = "Hanan membantu umi";
    let jarak = 22;
    let marginKi = 10;
    let marginTop = 20;
    let jarakV = 48;
    Rata("left");
    window.requestAnimationFrame(update);
    function update() {
        Bersih(255, 255, 255);
        gambarGrid();
        Kontek().fillStyle = '#000';
        Kontek().font = '32px Consolas';
        //kunci psosi y pada posisi 100
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < teks.length; i++) {
                Tulis(teks.charAt(i), i * jarak + marginKi, 20 + marginTop + (j * jarakV));
            }
        }
        window.requestAnimationFrame(update);
    }
    function gambarGrid() {
        let c = Kontek();
        c.strokeStyle = '#000';
        c.strokeRect(0, 0, gPj, gLb);
        for (let i = 0; i < 60; i++) {
            for (let j = 0; j < 80; j++) {
                c.beginPath();
                c.moveTo(i * jarak, 0);
                c.lineTo(i * jarak, gLb);
                c.stroke();
                c.beginPath();
                c.moveTo(i * jarak, 0);
                c.lineTo(i * jarak, gLb);
                c.stroke();
            }
        }
    }
};
