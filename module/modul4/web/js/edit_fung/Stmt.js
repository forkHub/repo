import { Id } from "../comp/Id.js";
import { Util } from "../comp/Util.js";
import { konsUrl } from "../KonsUrl.js";
import { StmtObj } from "../StmtEnt.js";
import { fungsiId } from "./edit_fungsi.js";
class Stmt {
    init() {
        let tambahTbl = Util.getEl('button.tambah-stmt');
        tambahTbl.onclick = (e) => {
            e.stopPropagation();
            console.log('tambah klik');
            let stmt;
            stmt = new StmtObj(Id.id, fungsiId);
            // StmtObj.tambah(stmt);
            window.top.location.href = konsUrl.pilihTypeStmt + "?fungsiId=" + fungsiId + "&stmtId=" + stmt.id;
            // konsUrl
        };
    }
}
export const stmt = new Stmt();
