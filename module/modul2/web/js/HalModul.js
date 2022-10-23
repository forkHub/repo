class HalModul {
    static init() {
        this.namaModulEl.innerHTML = Modul.getAktif().judul;
    }
    static tampil() {
        document.body.appendChild(HalModul.el);
        this.load();
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
        FragFunction.load();
    }
}
HalModul.el = ha.comp.Util.getEl('div.hal-modul');
HalModul.namaModulEl = ha.comp.Util.getEl('div.header span.nama', document.body);
