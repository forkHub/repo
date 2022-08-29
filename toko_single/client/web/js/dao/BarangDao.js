class BarangDao {
    static table = "ha.toko_single.barang";
    daftar = [];
    _onPush;
    get onPush() {
        return this._onPush;
    }
    set onPush(value) {
        this._onPush = value;
    }
    async push(barang) {
        this.daftar.push(barang);
        await this.simpan();
        setTimeout(() => {
            this.onPush(barang.id);
        }, 0);
    }
    async reset() {
        this.daftar = [];
        await this.simpan();
    }
    async load() {
        let str;
        let barangAr;
        try {
            str = window.localStorage.getItem(BarangDao.table);
            // console.log(str);
            barangAr = JSON.parse(str);
            // console.log(barangAr);
            barangAr.forEach((item) => {
                this.daftar.push(item);
                this._onPush(item.id);
            });
        }
        catch (e) {
            console.error(e);
        }
    }
    getById(id) {
        let hasil;
        this.daftar.forEach((item) => {
            if (item.id == id) {
                hasil = item;
            }
        });
        if (!hasil) {
            throw Error('tidak ketemu');
        }
        return hasil;
    }
    toDbo(barang) {
        return {
            id: barang.id,
            deskripsi: barang.deskripsi,
            harga: barang.harga,
            nama: barang.nama,
        };
    }
    async simpan() {
        let data = [];
        this.daftar.forEach((barang) => {
            data.push(this.toDbo(barang));
        });
        window.localStorage.setItem(BarangDao.table, JSON.stringify(data));
    }
}
export var barangDao = new BarangDao();
