import { Util } from "../comp/Util.js";
import { fungList } from "../FungEnt.js";
import { ModulObj } from "../modulEnt.js";
import { VariableObj } from "../VarEnt.js";
import { stmt } from "./Stmt.js";
import { variable } from "./Variable.js";
ModulObj.loadData();
fungList.loadData();
VariableObj.loadData();
export const fungsiId = parseInt(Util.getParam('id'));
export const daftarVarCont = Util.getEl('div.daftar-var-cont');
export const daftarStmtCont = Util.getEl('div.daftar-stmt-cont');
const namaEl = Util.getEl('div.nama');
let fungObj = fungList.getById(fungsiId);
variable.init();
stmt.init();
namaEl.innerHTML = fungObj.nama;
