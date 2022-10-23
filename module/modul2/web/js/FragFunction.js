class FragFunction {
    static get dipilih() {
        return this._dipilih;
    }
    static set dipilih(value) {
        this._dipilih = value;
    }
    static load() {
        let modul = Modul.getAktif();
        this._cont.innerHTML = '';
        modul.fungsi.forEach((id) => {
            let fungsi = Fungsi.getId(id);
            this.buatView(fungsi);
        });
    }
    static buatView(fungsi) {
        let view;
        view = ha.comp.Util.getTemplate('div.item');
        view.setAttribute('id', fungsi.id + '');
        view.setAttribute('type', FUNGSI);
        view.querySelector('span.nama').innerHTML = fungsi.judul;
        view.onclick = () => {
            FragFunction.itemKlik(view);
        };
        this._cont.appendChild(view);
    }
    static tombolTambahKlik() {
        console.log('tambah klik');
        let judul;
        let hasil;
        judul = window.prompt('nama modul:');
        if (judul) {
            hasil = Fungsi.buat(judul);
            Modul.getAktif().fungsi.push(hasil.id);
            this.buatView(hasil);
            Data.simpan();
        }
    }
    static itemKlik(el) {
        console.log(el);
        if (this.dipilih) {
            this.dipilih.classList.remove('dipilih');
        }
        this.dipilih = el;
        this.dipilih.classList.add('dipilih');
        Kontek.fungsiId = parseInt(el.getAttribute('id'));
    }
    static tombolHapusKlik(el) {
        console.log('hapus klik');
        if (this.dipilih) {
            el.parentElement.removeChild(el);
            let id = parseInt(el.getAttribute('id'));
            Fungsi.hapus(id);
            Data.simpan();
        }
        else {
            console.log('tidak ada dipilih');
        }
    }
    static tombolViewKlik() {
    }
    static tombolEditKlik() {
        if (!this.dipilih) {
            console.error('tidak ada yang dipilih');
            return;
        }
        HalModul.el.parentElement.removeChild(HalModul.el);
        HalEditFungsi.tampil().catch((e) => {
            console.error(e);
        });
    }
}
FragFunction._cont = ha.comp.Util.getEl('div.fungsi div.daftar', document.body);
