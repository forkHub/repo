export class Id {
    static _base = 0;
    static get id() {
        if (this._base <= 0) {
            this._base = Date.now();
        }
        this._base++;
        return this._base;
    }
}
