export class Data {
    static _token = '';
    static _conversationId = '';
    static get conversationId() {
        return Data._conversationId;
    }
    static set conversationId(value) {
        Data._conversationId = value;
    }
    static get token() {
        return Data._token;
    }
    static set token(value) {
        Data._token = value;
    }
}
