import { conf } from "../mdl/Conf.js";
class Session {
    getSession() {
        try {
            let ses = window.sessionStorage.getItem("ha.app.session");
            let sesObj = JSON.parse(ses);
            if (!sesObj) {
                throw Error('sesObj is null');
            }
            //normalize
            if (sesObj.loginStatus == undefined) {
                sesObj.loginStatus = false;
            }
            return sesObj;
        }
        catch (e) {
            console.error(e);
            return {
                loginStatus: false
            };
        }
    }
    saveSession(sesObj) {
        window.sessionStorage.setItem("ha.app.session", JSON.stringify(sesObj));
    }
    login(stat) {
        let sesObj = this.getSession();
        sesObj.loginStatus = stat;
        this.saveSession(sesObj);
    }
    //pengecekan di server dilakukan server side
    checkLogin() {
        if (!conf.dev) {
            return true;
        }
        try {
            return this.getSession().loginStatus;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
}
export const ses = new Session();
