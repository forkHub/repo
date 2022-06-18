namespace pilihVariable {
    export const items: Item[] = [];

    export function tampil(targetRefView: fungsi.variable.ref.item.View): void {

        //hapus item yang sudah ada
        while (items.length > 0) {
            (items.pop()).destroy();
        }

        let daftar: IVar[];
        daftar = window.variable.ent.daftarVar();

        daftar.forEach((varObj: IVar) => {
            let itemView: Item = new Item(varObj, targetRefView);
            itemView.attach(pilihVariable.hal.daftar);
            itemView.pilihTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
            }
        })

        hal.attach(document.body);
    }

    class Hal extends ha.comp.BaseComponent {
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
    export const hal: Hal = new Hal();


    export class Item extends ha.comp.BaseComponent {
        private _varObj: IVar;
        public get varObj(): IVar {
            return this._varObj;
        }

        constructor(varObj: IVar, view: fungsi.variable.ref.item.View) {
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