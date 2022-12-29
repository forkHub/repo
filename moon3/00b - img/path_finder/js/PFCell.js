var fg;
(function (fg) {
    class PFCell {
        constructor() {
            this._dist = 0;
            this._x = 0;
            this._y = 0;
            this._idx = -1;
            this._open = true;
        }
        PFCell() {
        }
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
    fg.PFCell = PFCell;
})(fg || (fg = {}));
