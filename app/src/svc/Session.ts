import { conf } from "../mdl/Conf.js";

export interface ISession {
    loginStatus: boolean;
}

class Session {
    private getSession(): ISession {
        try {
            let ses = window.sessionStorage.getItem("ha.app.session");
            let sesObj: ISession = JSON.parse(ses);
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
            }
        }
    }

    private saveSession(sesObj: ISession): void {
        window.sessionStorage.setItem("ha.app.session", JSON.stringify(sesObj))
    }

    login(stat: boolean): void {
        let sesObj = this.getSession();
        sesObj.loginStatus = stat;
        this.saveSession(sesObj);
    }

    //pengecekan di server dilakukan server side
    checkLogin(): boolean {
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