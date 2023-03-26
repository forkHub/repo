export class Data {
    private static _token: string = '';
    private static _conversationId: string = '';
    public static get conversationId(): string {
        return Data._conversationId;
    }
    public static set conversationId(value: string) {
        Data._conversationId = value;
    }

    public static get token(): string {
        return Data._token;
    }
    public static set token(value: string) {
        Data._token = value;
    }
}