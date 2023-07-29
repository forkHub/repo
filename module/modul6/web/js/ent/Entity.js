export class EntityObj {
    _id = 0;
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    _type;
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    _indukId;
    get indukId() {
        return this._indukId;
    }
    set indukId(value) {
        this._indukId = value;
    }
    _nama;
    get nama() {
        return this._nama;
    }
    set nama(value) {
        this._nama = value;
    }
}
class Entity {
}
export const entity = new Entity();
