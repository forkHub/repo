import { Util } from "../comp/Util.js";

export class HalLogin {
    private static _view: HTMLFormElement;
    private static _onLoad: () => void;
    private static _onLogin: (status: number, msg: string) => void;

    public static set onLogin(value: (status: number, msg: string) => void) {
        HalLogin._onLogin = value;
    }

    public static get onLoad(): () => void {
        return this._onLoad;
    }
    public static set onLoad(value: () => void) {
        this._onLoad = value;
    }
    public static get view(): HTMLElement {
        return this._view;
    }

    static tutup(): void {
        if (this._view.parentElement) {
            this._view.parentElement.removeChild(this._view);
        }
    }

    private static evtLogin(token: string, status: number): void {
        setTimeout(() => {
            this._onLogin(status, token);
        }, 0);
    }

    static async init(): Promise<void> {
        let template: string = await Util.Ajax2("get", "./template/login.html", "");
        this._view = Util.createEl(template) as HTMLFormElement;

        HalLogin.view.onsubmit = () => {
            try {
                HalLogin.login().then((token: string) => {
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

    static async login(): Promise<string> {

        let username: string = '';
        let password: string = ''
        let url: string = ''

        username = 'apiclient';
        password = 'apiclient';
        url = `/oidc-token-service/default/token?grant_type=password&password=${password}&username=${username}&client_id=default&scope=tags openid tags content_entitlements em_api_access`;

        console.log('submit login');

        try {
            let x: XMLHttpRequest = await Util.Ajax('post', url, '');

            if (200 == x.status) {
                let obj: any = JSON.parse(x.responseText);
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