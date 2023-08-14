import { dialogShow } from "../dialog";
import { df } from "../ent/DF";
export function tblTambahDekFungsi() {
    let tbl = document.createElement('button');
    tbl.onclick = (e) => {
        e.stopPropagation();
        let str = window.prompt('nama fungsi:');
        if (!str) {
            dialogShow('nama invalid');
            return;
        }
        df.tambah(str, 0);
        //update list
    };
    return tbl;
}
