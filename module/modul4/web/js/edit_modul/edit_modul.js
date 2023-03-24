import { Id } from "../comp/Id.js";
import { Util } from "../comp/Util.js";
import { ModulObj } from "../modulEnt.js";
import { VariableObj } from "../VarEnt.js";
import { VarView } from "./VarView.js";
const param = Util.getParam('id');
ModulObj.loadData();
const modulObj = ModulObj.getById(parseInt(param));
const namaEl = Util.getEl('div.nama');
namaEl.innerHTML = modulObj.nama;
const daftarCont = Util.getEl('div.daftar-var-cont');
VariableObj.loadData();
VariableObj.getByParentId(parseInt(param)).forEach((item) => {
    VarView.tambah(daftarCont, item);
});
//todo path:
//variable:
let tambahVarTbl = Util.getEl('button.tambah-var');
tambahVarTbl.onclick = () => {
    console.log('tambah klik');
    let nama = window.prompt('Nama var: ');
    VariableObj.tambah(new VariableObj(Id.id, nama, parseInt(param), 'modul'));
};
VariableObj.dihapus = () => {
    window.top.location.reload();
};
VariableObj.ditambah = () => {
    window.top.location.reload();
};
VariableObj.diedit = () => {
    window.top.location.reload();
};
