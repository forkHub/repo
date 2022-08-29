export class Data {
    static _token = '';
    static get token() {
        return Data._token;
    }
    static set token(value) {
        Data._token = value;
    }
}
