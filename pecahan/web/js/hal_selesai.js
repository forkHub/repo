class HalSelesai {
    static get el() {
        return HalSelesai._el;
    }
    static set el(value) {
        HalSelesai._el = value;
    }
    static tombolMulaiLagiKlik() {
        window.top.location.reload();
    }
    static tombolHalUtamaKlik() {
        window.top.location.href = urlHalUtama;
    }
    static async tampil(cont, nilai) {
        if (!this.el) {
            this.el = ha.comp.Util.createEl(await ha.comp.File.load('./data/selesai.html'));
        }
        this.el.querySelector('h3.nilai').innerHTML = 'Nilai: ' + nilai + '';
        cont.appendChild(this.el);
    }
}
