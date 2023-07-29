import { ProjectObj } from "../ent/project.js";
import { menu } from "../menu/menu.js";

class Explorer {

    private _listEl: HTMLDivElement;
    public get listEl(): HTMLDivElement {
        return this._listEl;
    }

    private _pathEl: HTMLDivElement;
    public get pathEl(): HTMLDivElement {
        return this._pathEl;
    }

    render(cont: HTMLDivElement) {
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

    buka(p: ProjectObj): void {
        p; //TODO:
    }

}

export const expl = new Explorer();
