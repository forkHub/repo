class Data {
    constructor(id, type, data) {
        this.id = id;
        this.type = type;
        this.data = data;
    }
    static toObj(data) {
        return {
            id: data.id,
            type: data.type,
            data: data.data
        };
    }
    static simpan() {
        let obj = [];
        //modul
        Modul.daftar.forEach((item) => {
            let data = Data.toObj(new Data(item.id, MODUL, JSON.stringify(Modul.toObj(item))));
            obj.push(data);
        });
        //variable
        Variable.daftar.forEach((item) => {
            obj.push(Data.toObj(new Data(item.id, VARIABLE, JSON.stringify(Variable.toObj(item)))));
        });
        //fungsi
        Fungsi.toData(obj);
        window.localStorage.setItem(this.namaDb, JSON.stringify(obj));
    }
    static load() {
        let str = window.localStorage.getItem(this.namaDb);
        let obj = JSON.parse(str);
        while (this.data.length > 0) {
            this.data.pop();
        }
        obj.forEach((obj) => {
            this.data.push(new Data(obj.id, obj.type, obj.data));
            // id: obj.id,
            // 	type: obj.type,
            // 		data: obj.data
        });
    }
    ;
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
        // if (value == MODUL) {
        // 	ha.comp.Util.stackTrace();
        // }
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
}
Data.data = [];
Data.namaDb = 'ha.modul.data';
