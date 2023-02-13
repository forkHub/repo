interface Error {
    cause?: unknown;
}

interface ILoginResp {
    access_token?: string,
    expires_in?: string,
    id_token?: string,
    token_type?: string
}

class LoginService {
    static async login(username: string, password: string): Promise<XMLHttpRequest> {
        console.log('login:');
        // try {

        // if (tempSession.token) {
        //     return {
        //         access_token: tempSession.token,
        //         expires_in: '',
        //         id_token: '',
        //         token_type: ''
        //     }
        // }

        let protokol: string = 'http';
        let host: string = 'localhost';
        let port: string = '8280';
        let param: string = `grant_type=password&password=${password}&username=${username}&client_id=default&scope=tags openid tags content_entitlements em_api_access`;
        let url: string = `${protokol}://${host}:${port}/oidc-token-service/default/token?${param}`;

        console.log('submit login');

        return await ha.comp.Util.Ajax('post', url, '');

        // if (200 == x.status) {
        //     let obj: ILoginResp = JSON.parse(x.responseText);
        //     tempSession.token = obj.access_token;
        //     simpanSession();
        //     console.log(obj);
        //     return obj;
        // }
        // else {
        //     return x;
        // }
        // }
        // catch (e) {
        // console.error(e); 
        // let t: Error = new Error(e.message);
        // t.cause = e;
        // throw t;
        // }
    }
}


