export class PFCell {
    _dist = 0;
    _parent;
    _x = 0;
    _y = 0;
    _idx = -1;
    _open = true;
    PFCell() { }
    destroy() {
        this._parent = null;
    }
    toStringRef() {
        return "[" + this._x + "-" + this._y + "]";
    }
    get dist() {
        return this._dist;
    }
    set dist(value) {
        this._dist = value;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get idx() {
        return this._idx;
    }
    set idx(value) {
        this._idx = value;
    }
    get open() {
        return this._open;
    }
    set open(value) {
        this._open = value;
    }
    get parent() {
        return this._parent;
    }
    set parent(value) {
        this._parent = value;
    }
}
