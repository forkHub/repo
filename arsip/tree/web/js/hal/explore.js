import { menu } from "../menu/menu.js";
class Explorer {
    _listEl;
    get listEl() {
        return this._listEl;
    }
    _pathEl;
    get pathEl() {
        return this._pathEl;
    }
    render(cont) {
        cont.innerHTML = `
            <div class="hal flex-grow-1 padding">
                <div class="path">
                </div>

                <div class="list">
                </div>
            </div>
            <div class="padding-hor">
                <hr />
            </div>
            <div class="menu padding">
                <div class="atas pd-btm-8">
                    <button class="balik">..</button>
                    <span class="detail"></span>
                </div>
                <div class="tombol">
                    <button class="beranda">beranda</button>
                </div>
            </div>
        `;
        this._listEl = cont.querySelector('div.list');
        this._pathEl = cont.querySelector('.path');
        menu(cont);
    }
    buka(p) {
        p; //TODO:
    }
}
export const expl = new Explorer();
