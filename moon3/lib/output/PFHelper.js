import { Point } from "./Point.js";
export class PFHelper {
    static ATAS = 1;
    static KANAN = 2;
    static BAWAH = 3;
    static KIRI = 4;
    static KANAN_ATAS = 5;
    static KANAN_BAWAH = 6;
    static KIRI_ATAS = 7;
    static KIRI_BAWAH = 8;
    ruteJalan = [];
    _cellWidth = 32;
    _cellHeight = 32;
    _langkahTotal = 3;
    _langkahIdx = 0;
    jalanIdx = 0;
    _pos = new Point();
    posTemp = new Point();
    _arah = PFHelper.BAWAH;
    _updateArahCallBack;
    _sedangJalan = false;
    constructor() {
    }
    reset() {
        this._sedangJalan = false;
    }
    start(data) {
        if (data.length == 0) {
            throw new Error();
        }
        this.ruteJalan = data;
        this._sedangJalan = true;
        this.jalanIdx = 0;
        this.updateArah();
        this._pos.x = data[0][0] * this._cellWidth;
        this._pos.y = data[0][1] * this._cellHeight;
    }
    updateArah() {
        let x1;
        let y1;
        let x2;
        let y2;
        if (this.jalanIdx >= this.ruteJalan.length - 1) {
            return;
        }
        x1 = this.ruteJalan[this.jalanIdx][0];
        y1 = this.ruteJalan[this.jalanIdx][1];
        x2 = this.ruteJalan[this.jalanIdx + 1][0];
        y2 = this.ruteJalan[this.jalanIdx + 1][1];
        // console.log("x2 " + x2 + '/y2 ' + y2 + '/x1 ' + x1 + '/y1 ' + y1);
        // console.log(y1 + '-' + x1 + '/' + y2 + '-' + x2);
        if (x1 == x2) {
            if (y1 > y2) {
                this._arah = PFHelper.ATAS;
                return;
            }
            else if (y1 < y2) {
                this._arah = PFHelper.BAWAH;
                return;
            }
        }
        else if (y1 == y2) {
            if (x1 > x2) {
                this._arah = PFHelper.KIRI;
                return;
            }
            else if (x1 < x2) {
                this._arah = PFHelper.KANAN;
                return;
            }
        }
        else if (x1 > x2) {
            //kiri - atas
            if (y1 > y2) {
                this._arah = PFHelper.KIRI_ATAS;
                // console.log('kiri atas');
                return;
            }
            //kiri - bawah
            else if (y1 < y2) {
                this._arah = PFHelper.KIRI_BAWAH;
                return;
            }
        }
        else if (x1 < x2) {
            //kanan-atas
            if (y1 > y2) {
                this._arah = PFHelper.KANAN_ATAS;
                return;
            }
            //kanan-bawah
            else if (y1 < y2) {
                this._arah = PFHelper.KANAN_BAWAH;
                // console.log('kanan bawah');
                return;
            }
        }
        throw new Error();
    }
    // console.log("WARN: arah tidak terdefinisi x1 " + x1 + '/y1 ' + y1 + '/x2' + x2 + '/y2 ' + y2);
    // console.log('rute jalan: ' + this.ruteJalan);
    // console.log('jalan idx ' + this.jalanIdx);
    updatePos() {
        this._pos.x = this.ruteJalan[this.jalanIdx][0] * this._cellWidth;
        this._pos.y = this.ruteJalan[this.jalanIdx][1] * this._cellHeight;
        if (this.jalanIdx < this.ruteJalan.length - 1) {
            this.posTemp.x = this.ruteJalan[this.jalanIdx + 1][0] * this._cellWidth;
            this.posTemp.y = this.ruteJalan[this.jalanIdx + 1][1] * this._cellHeight;
            this._pos.x = this._pos.x + (this._langkahIdx / this._langkahTotal) * (this.posTemp.x - this._pos.x);
            this._pos.y = this._pos.y + (this._langkahIdx / this._langkahTotal) * (this.posTemp.y - this._pos.y);
        }
    }
    // private gantiCell(): boolean {
    //     return true;
    // }
    update() {
        if (this._sedangJalan) {
            this._langkahIdx++;
            if (this._langkahIdx >= this._langkahTotal) {
                this._langkahIdx = 0;
                this.jalanIdx++;
                if (this.jalanIdx >= this.ruteJalan.length - 1) {
                    this._sedangJalan = false;
                    this.jalanIdx = this.ruteJalan.length - 1;
                }
                this.updateArah();
                // console.log('hasil arah ' + this._arah);
                if (this._updateArahCallBack) {
                    this._updateArahCallBack();
                }
            }
            this.updatePos();
        }
    }
    get cellWidth() {
        return this._cellWidth;
    }
    set cellWidth(value) {
        this._cellWidth = value;
    }
    get cellHeight() {
        return this._cellHeight;
    }
    set cellHeight(value) {
        this._cellHeight = value;
    }
    get langkahTotal() {
        return this._langkahTotal;
    }
    set langkahTotal(value) {
        this._langkahTotal = value;
    }
    get pos() {
        return this._pos;
    }
    set pos(value) {
        this._pos = value;
    }
    get sedangJalan() {
        return this._sedangJalan;
    }
    get arah() {
        return this._arah;
    }
    set arah(value) {
        this._arah = value;
    }
    get updateArahCallBack() {
        return this._updateArahCallBack;
    }
    set updateArahCallBack(value) {
        this._updateArahCallBack = value;
    }
}
