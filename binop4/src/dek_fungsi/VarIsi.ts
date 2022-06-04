namespace variable.isi.item {

    const menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();
    menu.buatTombol({
        label: 'delete',
        f: () => {

        }
    })

    export class View extends ha.comp.BaseComponent {
        private _item: IVarIsi;
        public get item(): IVarIsi {
            return this._item;
        }

        constructor(item: IVarIsi) {
            super();
            this._template = `
                <div class='var-isi-item row'>
                    <div class='var1 row'>
                        <div class='exp-cont'></div>
                        <div class='padding'>
                            <button>|||</button>
                        </div>
                    </div>
                   <span class='opr'>=</span>
                    <div class='var2 row'>
                        <div class='exp-cont'></div>
                        <div class='padding'>
                            <button>|||</button>
                        </div>
                    </div>
                </div>
            `;

            this.build();
            this._item = item;
            this.render();



            this.var1Tbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('referensi variable');
                //TODO:
            }

            this.var2Tbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('referensi variable atau value');
                //TODO:
            }
        }

        render(): void {
            console.log('render');
            //TODO:
        }

        override destroy(): void {
            super.destroy();
            this._item = null;
        }

        get var1Tbl(): HTMLDivElement {
            return this.getEl('div.var1 exp-cont') as HTMLDivElement;
        }

        get var2Tbl(): HTMLButtonElement {
            return this.getEl('div.var2 exp-cont') as HTMLButtonElement;
        }
    }

}