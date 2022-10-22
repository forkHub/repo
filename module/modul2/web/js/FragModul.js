class FragModul {
    static get dipilih() {
        return FragModul._dipilih;
    }
    static set dipilih(value) {
        FragModul._dipilih = value;
    }
    static load() {
        let modul = Modul.getId(Kontek.modulId);
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
        view.setAttribute('type', MODUL);
        view.querySelector('span.nama').innerHTML = hasil.judul;
        this._cont.appendChild(view);
    }
    static tombolTambahKlik() {
        console.log('tambah klik');
        let judul;
        judul = window.prompt('nama modul:');
        let hasil = Modul.buat(judul);
        Modul.getAktif().sub.push(hasil.id);
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
