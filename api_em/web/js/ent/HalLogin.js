import { Util } from "../comp/Util.js";
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
    static evtLogin(token, status) {
        setTimeout(() => {
            this._onLogin(status, token);
        }, 0);
    }
    static async init() {
        let template = await Util.Ajax2("get", "./template/login.html", "");
        this._view = Util.createEl(template);
        HalLogin.view.onsubmit = () => {
            try {
                HalLogin.login().then((token) => {
                    HalLogin.tutup();
                    this.evtLogin(token, 200);
                }).catch((e) => {
                    console.error(e);
                    throw Error(e.message);
                });
            }
            catch (e) {
                console.error(e);
                throw Error(e.message);
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
            throw Error(e.message);
        }
    }
}
