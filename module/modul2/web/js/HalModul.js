class HalModul {
    static init() {
        this.namaModulEl.innerHTML = Modul.getAktif().judul;
    }
    static itemKlik(e) {
        console.log(e);
        let type = e.getAttribute('type');
        if (VARIABLE == type) {
        }
        else if (MODUL == type) {
        }
        else if (FUNGSI == type) {
        }
        else {
            throw Error('type: ' + type);
        }
    }
    static load() {
        FragModul.load();
        FragVariable.load();
    }
}
HalModul.namaModulEl = ha.comp.Util.getEl('div.header span.nama', document.body);
