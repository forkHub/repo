var md;
(function (md) {
    class Modul {
        constructor() {
            this._id = 0;
            this._nama = "modul_default";
            this._anak = [];
        }
        static get tambahEvt() {
            return Modul._tambahEvt;
        }
        static set tambahEvt(value) {
            Modul._tambahEvt = value;
        }
        get id() {
            return this._id;
        }
        set id(value) {
            this._id = value;
        }
        get nama() {
            return this._nama;
        }
        set nama(value) {
            this._nama = value;
        }
        get anak() {
            return this._anak;
        }
        set anak(value) {
            this._anak = value;
        }
        static buat(nama) {
            let hasil = new Modul();
            hasil.id = ha.comp.Id.id;
            hasil.nama = nama;
            this.tambahEvt.forEach((item) => {
                item.baru(hasil);
            });
            return hasil;
        }
    }
    md.Modul = Modul;
})(md || (md = {}));
