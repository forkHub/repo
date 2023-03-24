import { Id } from "../comp/Id.js";
import { Util } from "../comp/Util.js";
import { ModulObj } from "../modulEnt.js";
import { VariableObj } from "../VarEnt.js";
import { VarView } from "./VarView.js";


const param: string = Util.getParam('id');
ModulObj.loadData();
const modulObj: ModulObj = ModulObj.getById(parseInt(param));

const namaEl: HTMLDivElement = Util.getEl('div.nama') as HTMLDivElement;
namaEl.innerHTML = modulObj.nama;

const daftarCont: HTMLDivElement = Util.getEl('div.daftar-var-cont') as HTMLDivElement;

VariableObj.loadData();
VariableObj.getByParentId(parseInt(param)).forEach((item: VariableObj) => {
    VarView.tambah(daftarCont, item);
})

//todo path:

//variable:
let tambahVarTbl: HTMLButtonElement = Util.getEl('button.tambah-var') as HTMLButtonElement;
tambahVarTbl.onclick = () => {
    console.log('tambah klik');
    let nama: string = window.prompt('Nama var: ');
    VariableObj.tambah(new VariableObj(
        Id.id,
        nama,
        parseInt(param),
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

