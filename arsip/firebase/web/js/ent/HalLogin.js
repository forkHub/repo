import { Util } from "../comp/Util.js";
// declare function stampit(f1?: stampit.Stamp | Options, options?: Options): stampit.Stamp;
export class HalLogin {
    static _view;
    static _onLoad;
    static _onLogin;
    static set onLogin(value) {
        HalLogin._onLogin = value;
    }
    static get onLoad() {
        return this._onLoad;
    }
    static set onLoad(value) {
        this._onLoad = value;
    }
    static get view() {
        return this._view;
    }
    static tutup() {
        if (this._view.parentElement) {
            this._view.parentElement.removeChild(this._view);
        }
    }
    static async init() {
        let template = await Util.Ajax2("get", "./template/login.html", "");
        this._view = Util.createEl(template);
        HalLogin.view.onsubmit = () => {
            try {
                HalLogin.login().then((token) => {
                    HalLogin.tutup();
                    setTimeout(() => {
                        this._onLogin(token);
                    }, 0);
                }).catch((e) => {
                    console.error(e);
                    // @ts-ignore
                    throw new Error("login error", e);
                    // setTimeout(() => {
                    //     this._onError(new Error("login error", e));
                    // }, 0);
                });
            }
            catch (e) {
                console.error(e);
                // @ts-ignore
                throw new Error("submit error", e); // @ts-ignore
            }
            return false;
        };
    }
    static async login() {
        let username = '';
        let password = '';
        let url = '';
        username = 'apiclient';
        password = 'apiclient';
        url = `/oidc-token-service/default/token?grant_type=password&password=${password}&username=${username}&client_id=default&scope=tags openid tags content_entitlements em_api_access`;
        console.log('submit login');
        try {
            let x = await Util.Ajax('post', url, '');
            if (200 == x.status) {
                let obj = JSON.parse(x.responseText);
                console.log(obj);
                return obj.access_token;
            }
            else {
                throw Error(x.responseText);
            }
        }
        catch (e) {
            console.error(e);
            // @ts-ignore
            throw Error("server error", e);
        }
    }
}
