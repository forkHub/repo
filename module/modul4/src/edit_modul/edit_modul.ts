import { Id } from "../comp/Id.js";
import { Util } from "../comp/Util.js";
import { fungList, FungObj } from "../FungEnt.js";
import { ModulObj } from "../modulEnt.js";
import { VariableObj } from "../VarEnt.js";
import { FungView } from "./FungView.js";
import { VarView } from "./VarView.js";

const param: string = Util.getParam('id');
ModulObj.loadData();
const modulObj: ModulObj = ModulObj.getById(parseInt(param));

const namaEl: HTMLDivElement = Util.getEl('div.nama') as HTMLDivElement;
namaEl.innerHTML = modulObj.nama;

const daftarCont: HTMLDivElement = Util.getEl('div.daftar-var-cont') as HTMLDivElement;
const daftarFungCont: HTMLDivElement = Util.getEl('div.daftar-fungsi-cont') as HTMLDivElement;

VariableObj.loadData();
VariableObj.getByParentId(parseInt(param)).forEach((item: VariableObj) => {
    VarView.tambah(daftarCont, item);
});


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

fungList.loadData();
fungList.getByParentId(parseInt(param)).forEach((item: FungObj) => {
    FungView.tambah(daftarFungCont, item);
});
let tambahFungTbl: HTMLButtonElement = Util.getEl('button.tambah-fung') as HTMLButtonElement;
console.log(tambahFungTbl);
tambahFungTbl.onclick = () => {
    console.log('tambah fungsi');
    let nama: string = window.prompt('nama:');
    fungList.tambah(new FungObj(Id.id, nama, parseInt(param)));
}
fungList.ditambah = () => {
    window.top.location.reload();
}
fungList.diedit = () => {
    window.top.location.reload();
}
fungList.dihapus = () => {
    window.top.location.reload();
}
