var pecahan02;
(function (pecahan02) {
    function mulai() {
        document.body.querySelector('div.progress-cont').appendChild(pg.el);
        for (let i = 0; i < jmlSoal; i++) {
            soals.push(buatSoal(false, true));
        }
        renderSoal(soals[0]);
        pg.progress(0);
    }
    pecahan02.mulai = mulai;
})(pecahan02 || (pecahan02 = {}));
pecahan02.mulai();
