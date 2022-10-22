class FragModul {
    static get dipilih() {
        return FragModul._dipilih;
    }
    static set dipilih(value) {
        FragModul._dipilih = value;
    }
    static init() {
        this.namaModulEl.innerHTML = Modul.getDipilih().judul;
    }
    static load() {
        let modul = Modul.getId(Kontek.session.modulId);
        modul.sub.forEach((id) => {
            let sub = Modul.getId(id);
            this.buatView(sub);
        });
        //
    }
    static buatView(hasil) {
        let view;
        view = ha.comp.Util.getTemplate('div.item');
        view.setAttribute('id', hasil.id + '');
        view.querySelector('span.nama').innerHTML = hasil.judul;
        this._cont.appendChild(view);
    }
    static tombolTambahKlik() {
        console.log('tambah klik');
        let judul;
        judul = window.prompt('nama modul:');
        let hasil = Modul.buat(judul);
        Modul.getDipilih().sub.push(hasil.id);
        this.buatView(hasil);
        Data.simpan();
    }
    static itemKlik(el) {
        console.log(el);
        if (this.dipilih) {
            this.dipilih.classList.remove('dipilih');
        }
        this.dipilih = el;
        this.dipilih.classList.add('dipilih');
        Kontek.session.modulId = parseInt(this.dipilih.getAttribute('id'));
    }
    static tombolHapusKlik(el) {
        console.log('hapus klik');
        if (this.dipilih) {
            el.parentElement.removeChild(el);
            let id = parseInt(el.getAttribute('id'));
            Modul.hapus(id);
            Data.simpan();
        }
        else {
            console.log('tidak ada dipilih');
        }
    }
    static tombolViewKlik() {
    }
    static tombolEditKlik() {
    }
}
FragModul._cont = ha.comp.Util.getEl('div.sub-modul div.daftar', document.body);
FragModul.namaModulEl = ha.comp.Util.getEl('div.header span.nama', document.body);
