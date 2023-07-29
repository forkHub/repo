import { dataObj } from "../data.js";
import { EType } from "../skema.js";
import { EntityObj } from "./Entity.js";
import { variable } from "./Var.js";
export class ProjekObj extends EntityObj {
}
class Projek {
    transpile() {
        let s = '';
        dataObj.entList.forEach((e) => {
            if (e.type == EType.var) {
                s += variable.transpile(e);
            }
        });
        console.log(s);
    }
}
export const projek = new Projek();
