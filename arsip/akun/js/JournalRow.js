export class JournalRow {
    constructor() {
        this._date = 0;
        this._desc = '';
        this._jumlah = 0;
        let date = new Date();
        this._date = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        // console.log('journal constructor');
        // console.log(this._date);
    }
    get date() {
        return this._date;
    }
    set date(value) {
        this._date = value;
    }
    get desc() {
        return this._desc;
    }
    set desc(value) {
        this._desc = value;
    }
    get jumlah() {
        return this._jumlah;
    }
    set jumlah(value) {
        this._jumlah = value;
    }
    padding(str) {
        str = "00" + str;
        return str.slice(str.length - 2, str.length);
    }
    date2Input() {
        let date = (new Date(this._date));
        let res;
        let month = (date.getMonth() + 1) + '';
        let day = (date.getDate()) + '';
        res = date.getFullYear() + '-' + this.padding(month) + '-' + this.padding(day);
        // res = '2019-10-10';
        // console.log('date2input');
        // console.log(res);
        return res;
    }
    getDateStr() {
        let date = (new Date(this._date));
        let res = date.toLocaleDateString();
        // console.log('getdatestr');
        // console.log(this._date);
        // console.log(res);
        return res;
    }
    backup() {
    }
    restore() {
    }
}
