class LoginService {
    static async login(username, password) {
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
        let protokol = 'http';
        let host = 'localhost';
        let port = '8280';
        let param = `grant_type=password&password=${password}&username=${username}&client_id=default&scope=tags openid tags content_entitlements em_api_access`;
        let url = `${protokol}://${host}:${port}/oidc-token-service/default/token?${param}`;
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
