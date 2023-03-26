import { Id } from "../comp/Id.js";
import { Util } from "../comp/Util.js";
import { konsUrl } from "../KonsUrl.js";
import { StmtObj } from "../StmtEnt.js";
import { fungsiId } from "./edit_fungsi.js";

class Stmt {
    init(): void {
        let tambahTbl: HTMLButtonElement = Util.getEl('button.tambah-stmt') as HTMLButtonElement;

        tambahTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            console.log('tambah klik');
            let stmt: StmtObj;
            stmt = new StmtObj(Id.id, fungsiId);
            // StmtObj.tambah(stmt);
            window.top.location.href = konsUrl.pilihTypeStmt + "?fungsiId=" + fungsiId + "&stmtId=" + stmt.id;
            // konsUrl
        }
    }
}
export const stmt: Stmt = new Stmt()