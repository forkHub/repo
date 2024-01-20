import { conf } from "./mdl/Conf.js";
import { dlg } from "./mdl/Dialog.js";
import { loginService } from "./svc/login.js";
class Login {
}
export const login = new Login();
window.onload = () => {
    let form = document.forms.namedItem('form');
    form.onsubmit = () => {
        try {
            let userName = form.elements.namedItem("userName").value;
            let pass = form.elements.namedItem("password").value;
            loginService.login(userName, pass).then((res) => {
                if (res) {
                    window.top.location.href = conf.urlBeranda;
                }
                else {
                    dlg.show('login failed');
                }
            }).catch((e) => {
                console.warn(e);
                return false;
            });
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return false;
    };
};
