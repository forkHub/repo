import { Util } from "./Util.js";
export class BaseComponent2 {
    constructor() {
        this._template = '';
    }
    build() {
        let div = document.createElement('div');
        let el;
        div.innerHTML = this._template;
        el = div.firstElementChild;
        this._el = el;
    }
    getEl(query) {
        return Util.getEl(this._el, query);
    }
    detach() {
        if (this._el.parentElement) {
            this._el.parentElement.removeChild(this._el);
        }
    }
    destroy() {
        this.detach();
        while (this._el.childElementCount > 0) {
            this._el.removeChild(this._el.firstElementChild);
        }
    }
    attach(cont) {
        cont.appendChild(this.el);
    }
    show() {
        this._el.style.display = 'block';
    }
    hide() {
        this._el.style.display = 'none';
    }
    update() {
    }
    get el() {
        return this._el;
    }
    set el(value) {
        this._el = value;
    }
}
