import { conf } from "./mdl/Conf.js";
import { dlg } from "./mdl/Dialog.js";
export function wOp() {
    console.log("w op");
    let w = window;
    w.daftarAnggota = () => {
        window.top.location.href = conf.urlAnggotaDaftar;
    };
    w.dialogKlik = () => {
        dlg.klik();
    };
}
