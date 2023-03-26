import { Util } from "../comp/Util.js";
import { fungList, FungObj } from "../FungEnt.js";
import { ModulObj } from "../modulEnt.js";
import { VariableObj } from "../VarEnt.js";
import { stmt } from "./Stmt.js";
import { variable } from "./Variable.js";

ModulObj.loadData();
fungList.loadData();
VariableObj.loadData();

export const fungsiId: number = parseInt(Util.getParam('id'));
export const daftarVarCont: HTMLDivElement = Util.getEl('div.daftar-var-cont') as HTMLDivElement;
export const daftarStmtCont: HTMLDivElement = Util.getEl('div.daftar-stmt-cont') as HTMLDivElement;

const namaEl: HTMLDivElement = Util.getEl('div.nama') as HTMLDivElement;
let fungObj: FungObj = fungList.getById(fungsiId);

variable.init();
stmt.init();
namaEl.innerHTML = fungObj.nama;

