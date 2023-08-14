import { dataObj } from "../data.js";
import { EType } from "../skema.js";
import { df } from "./DF.js";
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
            else if (e.type == EType.df) {
                s += df.transpile(e);
            }
            else if (e.type == EType.modul) { }
            else {
                console.error('type error: ' + e.type);
            }
        });

        console.log(s);
    }
}
export const projek = new Projek();