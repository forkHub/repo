namespace fung.dek.editor.variable.daftar {
    export const daftarItemView: item.View[] = [];

    class View extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._template = `
                <div class='daftar-var-comp min-height-100 disp-flex flex-dir-col'>
                    <div class='daftar'>
                    </div>
                </div>
            `;
            this.build();

        }

        get daftar(): HTMLDivElement {
            return this.getEl('div.daftar') as HTMLDivElement;
        }
    }
    export const view: View = new View();

    export function tampil(targetRefView: fung.dek.editor.variable.ref.item.View): void {
        while (daftarItemView.length > 0) {
            (daftarItemView.pop()).destroy();
        }

        let daftar: IVar[];
        daftar = window.variable.ent.daftarVar();

        daftar.forEach((varObj: IVar) => {
            let itemView: item.View = new item.View(varObj, targetRefView);
            itemView.attach(dek.editor.variable.daftar.view.daftar);
            itemView.pilihTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
            }
        })

        view.attach(document.body);
    }
}

namespace fung.dek.editor.variable.daftar.item {

    export class View extends ha.comp.BaseComponent {
        private _varObj: IVar;
        public get varObj(): IVar {
            return this._varObj;
        }

        constructor(varObj: IVar, view: dek.editor.variable.ref.item.View) {
            super();
            this._template = `
                <div class='var-item comp'>
                    <div class='nama disp-inline-block'>
                    </div>
                    <div>
                        <button class='pilih'>pilih</button>
                    </div>
                </div>
            `;
            this.build();

            this.pilihTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                view.item.refId = varObj.id;
                view.valueDiv.innerHTML = varObj.nama;
                this.detach();
            }

            this._varObj = varObj;
        }

        get pilihTbl(): HTMLButtonElement {
            return this.getEl('button.pilih') as HTMLButtonElement;
        }
    }

}