import { Id } from "../comp/Id.js";
import { Util } from "../comp/Util.js";
import { VariableObj } from "../VarEnt.js";
import { daftarVarCont, fungsiId } from "./edit_fungsi.js";
import { VarView } from "./VarView.js";//variable:

class Variable {
    private tambahVarTbl: HTMLButtonElement;

    init() {
        this.tambahVarTbl = Util.getEl('button.tambah-var') as HTMLButtonElement;
        this.tambahVarTbl.onclick = () => {
            console.log('tambah klik');
            let nama: string = window.prompt('Nama var: ');
            VariableObj.tambah(new VariableObj(
                Id.id,
                nama,
                fungsiId,
                'modul'
            ));
        }

        VariableObj.dihapus = () => {
            window.top.location.reload();
        }

        VariableObj.ditambah = () => {
            window.top.location.reload();
        }

        VariableObj.diedit = () => {
            window.top.location.reload();
        }

        VariableObj.getByParentId((fungsiId)).forEach((item: VariableObj) => {
            VarView.tambah(daftarVarCont, item);
        });
    }

}

export const variable: Variable = new Variable();
