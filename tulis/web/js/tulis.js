window.onload = () => {
    const gPj = 950;
    const gLb = 1024;
    Grafis(gPj, gLb);
    let teks = [
        "- Kami sekeluarga akan pergi umrah",
        "- ",
        "- Hanan sudah tidak sabar untuk melihat Ka'bah",
        "- ",
        "- Kami ke bandara bersama rombongan",
        "- ",
        "- Walau masih anak-anak, kami antri dengan",
        "- ",
        "- tertib. Kami berjalan melalui terowongan",
        "- ",
        "- garbarata. Para pramugari memeriksa tiket",
        "- ",
    ];
    let jarak = 80;
    let marginKi = 25;
    let marginTop = 50;
    Rata("left");
    window.requestAnimationFrame(update);
    function update() {
        Bersih(255, 255, 255);
        // gambarGrid();
        Kontek().fillStyle = '#000';
        Kontek().font = '36px Consolas';
        for (let j = 0; j < teks.length; j++) {
            Tulis(teks[j], marginKi, jarak * j + marginTop);
        }
        window.requestAnimationFrame(update);
        gambarGrid();
    }
    function gambarGrid() {
        let c = Kontek();
        // const gridPjg = 24;
        const gridLbr = 80;
        const gridMarginTop = 50;
        c.strokeStyle = "#00000040";
        c.strokeRect(0, 0, gPj, gLb);
        //horizontal
        // for (let i = 0; i < 100; i++) {
        // 	c.beginPath();
        // 	c.moveTo(i * gridPjg, 0);
        // 	c.lineTo(i * gridPjg, 2000);
        // 	c.stroke();
        // }
        //vertical
        for (let i = 0; i < 80; i++) {
            c.beginPath();
            c.moveTo(0, i * gridLbr + gridMarginTop);
            c.lineTo(2000, i * gridLbr + gridMarginTop);
            c.stroke();
            c.beginPath();
            c.moveTo(0, i * gridLbr + gridMarginTop - 15);
            c.lineTo(2000, i * gridLbr + gridMarginTop - 15);
            c.stroke();
        }
    }
};
