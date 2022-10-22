class Data {
    static simpan() {
        let obj = [];
        //modul
        Modul.daftar.forEach((item) => {
            obj.push({
                id: item.id,
                type: 'modul',
                data: JSON.stringify(Modul.toObj(item))
            });
        });
        //variable
        Variable.daftar.forEach((item) => {
            obj.push({
                id: item.id,
                type: 'variable',
                data: JSON.stringify(Variable.toObj(item))
            });
        });
        //fungsi
        Fungsi.daftar.forEach((item) => {
            obj.push({
                id: item.id,
                type: FUNGSI,
                data: JSON.stringify(Fungsi.toObj(item))
            });
        });
        window.localStorage.setItem(this.namaDb, JSON.stringify(obj));
    }
    static load() {
        let str = window.localStorage.getItem(this.namaDb);
        let obj = JSON.parse(str);
        while (this.data.length > 0) {
            this.data.pop();
        }
        obj.forEach((obj) => {
            this.data.push({
                id: obj.id,
                type: obj.type,
                data: obj.data
            });
        });
    }
}
Data.data = [];
Data.namaDb = 'ha.modul.data';
