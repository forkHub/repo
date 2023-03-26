var md;
(function (md) {
    class Modul {
        constructor() {
            this._induk = 0;
            this.type = "modul";
            this._id = 0;
            this._nama = "modul_default";
            this._anak = [];
        }
        static load(data) {
            data.forEach((item) => {
                if ('modul' == item.type) {
                    console.group('load modul ' + item.id);
                    let obj = JSON.parse(item.meta);
                    Modul.buat(obj.nama, obj.id);
                    console.groupEnd();
                }
            });
        }
        static hapusAktif() {
            for (let i = 0; i < this.daftar.length; i++) {
                if (this.daftar[i].id == this.modulAktif.id) {
                    this.daftar.splice(i, 1);
                }
            }
            this.modulAktif = null;
        }
        static reset() {
            while (this.daftar.length > 0) {
                this.daftar.pop();
            }
            this._modulAktif = null;
        }
        static toDao(data) {
            this.daftar.forEach((item) => {
                let obj = {
                    id: item.id,
                    anak: item.anak,
                    induk: item.induk,
                    nama: item.nama,
                    type: item.type
                };
                console.log('simpan');
                console.log(obj);
                console.log(item);
                data.push({
                    id: item.id,
                    type: item.type,
                    meta: JSON.stringify(obj)
                });
            });
        }
        static buat(nama, id) {
            let hasil;
            console.group('buat modul');
            hasil = new Modul();
            hasil.id = id;
            hasil.nama = nama;
            // this.tambahEvt.forEach((item: IModulEvt) => {
            // 	item.baru(hasil);
            // });
            if (this._modulAktif) {
                this._modulAktif.anak.push(hasil.id);
            }
            this.daftar.push(hasil);
            // this._onBuat(hasil);
            console.groupEnd();
            return hasil;
        }
        get induk() {
            return this._induk;
        }
        set induk(value) {
            this._induk = value;
        }
        static get modulAktif() {
            return this._modulAktif;
        }
        static set modulAktif(value) {
            this._modulAktif = value;
        }
        // public static get tambahEvt(): IModulEvt[] {
        // 	return Modul._tambahEvt;
        // }
        // public static set tambahEvt(value: IModulEvt[]) {
        // 	Modul._tambahEvt = value;
        // }
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
    }
    Modul.daftar = [];
    md.Modul = Modul;
    // Modul.onBuat = (item: IModul) => {
    // halModul.baru(item);
    // item; //TODO:
    // }
})(md || (md = {}));
