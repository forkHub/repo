import { JournalRow } from "./JournalRow.js";
export class Db {
    constructor() {
        this._list = [];
    }
    removeAll() {
        while (this._list.length > 0) {
            this._list.pop();
        }
    }
    total() {
        let tot = 0;
        console.log('get total, list length ' + this._list.length);
        for (let i = 0; i < this._list.length; i++) {
            tot += this._list[i].jumlah;
        }
        console.log('total ' + tot);
        return tot;
    }
    get list() {
        return this._list;
    }
    insert(journal) {
        this._list.push(journal);
    }
    toString() {
        return JSON.stringify(this._list);
    }
    fromString(str) {
        let data = JSON.parse(str);
        // console.log(data);
        while (this._list.length > 0) {
            this._list.pop();
        }
        for (let i = 0; i < data.length; i++) {
            let item = new JournalRow();
            item.desc = data[i]._desc;
            item.date = data[i]._date;
            item.jumlah = data[i]._jumlah;
            // console.log(item);
            // console.log(data[i]);
            this.insert(item);
        }
    }
    delete(item) {
        for (let i = 0; i < this._list.length; i++) {
            if (this._list[i] == item) {
                this._list.splice(i, 1);
                return;
            }
        }
        throw new Error('');
    }
}
