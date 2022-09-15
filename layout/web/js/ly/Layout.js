var ly;
(function (ly) {
    class Layout {
        static daftar = [];
        _id;
        _anak;
        get id() {
            return this._id;
        }
        set id(value) {
            this._id = value;
        }
        get anak() {
            return this._anak;
        }
        set anak(value) {
            this._anak = value;
        }
        constructor() {
        }
        static create() {
            let hasil;
            hasil = new Layout();
            this.daftar.push(hasil);
            return hasil;
        }
    }
    ly.Layout = Layout;
})(ly || (ly = {}));
