export class StmtObj {
    constructor(id, parentId) {
        this._id = id;
        this._parentId = parentId;
    }
    static toObjAr(src) {
        let ar = [];
        src.forEach((item) => {
            ar.push(StmtObj.toObj(item));
        });
        return ar;
    }
    static toObj(m) {
        return {
            id: m.id,
            type: m.type,
            parentId: m.parentId,
            varIsi: m.varIsi //TODO:
            // draft: m.draft
            // type:m.
            // parentType: m.parentType
        };
    }
    _id = 0;
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    _parentId = 0;
    get parentId() {
        return this._parentId;
    }
    set parentId(value) {
        this._parentId = value;
    }
    _nama = '';
    get nama() {
        return this._nama;
    }
    set nama(value) {
        this._nama = value;
    }
    _type = 'var_isi';
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    _draft = false;
    get draft() {
        return this._draft;
    }
    set draft(value) {
        this._draft = value;
    }
    _varIsi;
    get varIsi() {
        return this._varIsi;
    }
    set varIsi(value) {
        this._varIsi = value;
    }
}
export class VarIsi {
    _varId;
    get varId() {
        return this._varId;
    }
    set varId(value) {
        this._varId = value;
    }
    _expId;
    get expId() {
        return this._expId;
    }
    set expId(value) {
        this._expId = value;
    }
    toObj() {
        return {
            varId: this.varId,
            expId: this.expId
        };
    }
    fromObj(item) {
        this.expId = item.expId;
        this.varId = item.varId;
    }
}
