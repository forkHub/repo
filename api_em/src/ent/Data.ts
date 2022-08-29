export class Data {
    private static _token: string = '';

    public static get token(): string {
        return Data._token;
    }
    public static set token(value: string) {
        Data._token = value;
    }
}