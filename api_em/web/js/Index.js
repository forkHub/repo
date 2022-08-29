import { Data } from "./ent/Data.js";
import { HalLogin } from "./ent/HalLogin.js";
console.log('index.js');
async function init() {
    console.log('init');
    await HalLogin.init();
    document.body.appendChild(HalLogin.view);
    HalLogin.onLogin = (status, msg) => {
        if (status == 200) {
            Data.token = msg;
        }
        else {
        }
    };
}
init();
