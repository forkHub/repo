export class Id {
    static _id = Date.now();
    static get id() {
        this._id++;
        return this._id;
    }
}
