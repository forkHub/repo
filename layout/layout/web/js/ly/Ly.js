var ly;
(function (ly) {
    ly.tombol = [];
    ly.tombol.push(buatTombol('+kolom', async () => {
    }));
    function buatTombol(label, klik) {
        let tbl;
        tbl = document.createElement('button');
        tbl.innerText = label;
        tbl.onclick = async (e) => {
            e.stopPropagation();
            await klik();
        };
        return tbl;
    }
})(ly || (ly = {}));
