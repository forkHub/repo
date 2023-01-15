class Angka {
    _v;
    get v() {
        return this._v;
    }
    set v(value) {
        this._v = value;
        List.onChange(this);
    }
}
class List {
    static list = [];
    static daftar(key, f) {
        console.log('daftar');
        console.log(key);
        for (let i = 0; i < this.list.length; i++) {
            let item = this.list[i];
            if (item.key == key) {
                if (item.onChange == f) {
                    return;
                }
            }
        }
        console.log('baru');
        this.list.push({
            key: key,
            onChange: f
        });
    }
    static onChange(key) {
        for (let i = 0; i < this.list.length; i++) {
            let item = this.list[i];
            console.log(item);
            console.log(key);
            if (item.key == key) {
                item.onChange(key);
            }
        }
    }
    ;
}
const state = {
    karakter: {
        x: new Angka(),
        y: new Angka(),
    }
};
List.daftar(state.karakter.x, (key) => {
    console.log('method 1');
    console.log('key');
    console.log(key);
});
state.karakter.x.v = Number(10);
