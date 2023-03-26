import { Id } from "../comp/Id.js";
import { Util } from "../comp/Util.js";
import { FungView } from "../edit_modul/FungView.js";
import { FungObj } from "../FungEnt.js";
import { daftarFungCont, param } from "./edit_fungsi.js";
class Fungsi {
    _fungObj;
    get fungObj() {
        return this._fungObj;
    }
    set fungObj(value) {
        this._fungObj = value;
    }
    init() {
        FungObj.loadData();
        this.fungObj = FungObj.getById(parseInt(param));
        FungObj.getByParentId(parseInt(param)).forEach((item) => {
            FungView.tambah(daftarFungCont, item);
        });
        let tambahFungTbl = Util.getEl('button.tambah-fung');
        console.log(tambahFungTbl);
        tambahFungTbl.onclick = () => {
            console.log('tambah fungsi');
            let nama = window.prompt('nama:');
            FungObj.tambah(new FungObj(Id.id, nama, parseInt(param)));
        };
        FungObj.ditambah = () => {
            window.top.location.reload();
        };
        FungObj.diedit = () => {
            window.top.location.reload();
        };
        FungObj.dihapus = () => {
            window.top.location.reload();
        };
    }
}
export const fungsi = new Fungsi();
