import { formValue } from "./comp/Form.js";
import { Util } from "./comp/Util.js";
import { fungList } from "./FungEnt.js";
import { konsUrl } from "./KonsUrl.js";

const form: HTMLFormElement = document.body.querySelector('form');
const stmtId: number = parseInt(Util.getParam('stmtId'));
const fungsiId: number = parseInt(Util.getParam('fungsiId'));

fungList.loadData();

form.onsubmit = () => {
    try {
        let type: string = formValue.getValue('type', form);
        fungList.getById(fungsiId).stmtList.getById(stmtId).type = type;
        window.top.location.href = konsUrl.pilihFungsi + `?id=${fungsiId}`;
    }
    catch (e) {
        console.error(e);
    }
    return false;
}