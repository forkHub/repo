import { config } from "./config.js";
import { ModeGeser, data } from "./data.js";
import { isoUtil } from "./isoUtil.js";
class PilihArea {
    _x1 = 0;
    _y1 = 0;
    _x2 = 0;
    _y2 = 0;
    _status = 0;
    update() {
        if (data.modeGeser != ModeGeser.drag)
            return;
        if (Pencet()) {
            if (!data.isoDrag.status) {
                console.log('start drag');
                data.isoDrag.status = true;
                isoUtil.layar2Iso(InputX() + data.vp.x, InputY() + data.vp.y);
                data.isoDrag.xgr = data.isoPos.xgr;
                data.isoDrag.ygr = data.isoPos.ygr;
            }
            pilihArea.geserViewportPinggir();
        }
    }
    dragSelesai() {
        console.log('drag selesai');
        if (data.isoDrag.status) {
            this._x1 = data.isoDrag.xgr;
            this._y1 = data.isoDrag.ygr;
            this._x2 = data.isoDrag.x2gr;
            this._y2 = data.isoDrag.y2gr;
            this._status++;
        }
        data.isoDrag.status = false;
    }
    render() {
        this.gambarAreaDrag();
    }
    /**
     * geser viewport saat dipencet dan pointer ditekan
     * //TODO: data dipinhdah ke entitiy viewport
     */
    geserViewportPinggir() {
        if (InputX() > config.panjangGrafis - 50) {
            data.vp.x++;
        }
        else if (InputX() < 50) {
            data.vp.x--;
        }
        else if (InputY() < 50) {
            data.vp.y--;
        }
        else if (InputY() > config.lebargrafis - 50) {
            data.vp.y++;
        }
    }
    gambarAreaDrag() {
        //jika sedang drag
        if (data.isoDrag.status) {
            //mencari posisi akhir drag di koordinat iso
            isoUtil.layar2Iso(InputX() + data.vp.x, InputY() + data.vp.y);
            //simpan hasilnya
            data.isoDrag.x2gr = data.isoPos.xgr;
            data.isoDrag.y2gr = data.isoPos.ygr;
            //gambar kotak area drag
            //cari posisi min dan mak.
            //drag bisa bergerak ke arah positif atau negatif
            let xmin = Math.min(data.isoDrag.xgr, data.isoDrag.x2gr);
            let ymin = Math.min(data.isoDrag.ygr, data.isoDrag.y2gr);
            let xmax = Math.max(data.isoDrag.xgr, data.isoDrag.x2gr);
            let ymax = Math.max(data.isoDrag.ygr, data.isoDrag.y2gr);
            for (let i = xmin; i <= xmax; i++) {
                for (let j = ymin; j <= ymax; j++) {
                    isoUtil.iso2Layar(i * 32, j * 32);
                    Posisi(data.kursorSpr, data.layarPos.x, data.layarPos.y);
                    Gambar(data.kursorSpr);
                }
            }
        }
        //jika telah selesai drag
        else if (this._status) {
            //gambar kotak area drag
            //cari posisi min dan mak.
            //drag bisa bergerak ke arah positif atau negatif
            let xmin = Math.min(this._x1, this._x2);
            let ymin = Math.min(this._y1, this._y2);
            let xmax = Math.max(this._x1, this._x2);
            let ymax = Math.max(this._y1, this._y2);
            for (let i = xmin; i <= xmax; i++) {
                for (let j = ymin; j <= ymax; j++) {
                    isoUtil.iso2Layar(i * 32, j * 32);
                    Posisi(data.kursorSpr, data.layarPos.x, data.layarPos.y);
                    Gambar(data.kursorSpr);
                }
            }
        }
    }
    get status() {
        let hasil = this._status;
        this._status = 0;
        return hasil;
    }
    set status(value) {
        this._status = value;
    }
    get x1() {
        return this._x1;
    }
    set x1(value) {
        this._x1 = value;
    }
    get y1() {
        return this._y1;
    }
    set y1(value) {
        this._y1 = value;
    }
    get x2() {
        return this._x2;
    }
    set x2(value) {
        this._x2 = value;
    }
    get y2() {
        return this._y2;
    }
    set y2(value) {
        this._y2 = value;
    }
}
export const pilihArea = new PilihArea();
