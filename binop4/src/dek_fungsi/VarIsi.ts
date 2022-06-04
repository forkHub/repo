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
                <div class='var-isi-comp row padding'>
                    <div class='var1 row'>
                        <div class='exp-cont'></div>
                    </div>
                    <div class='tengah-tengah padding'>
                        <span class='opr'>=</span>
                    </div>
                    <div class='var2 row'>
                        <div class='exp-cont'></div>
                    </div>
                </div>
            `;

            this.build();
            this._item = item;
            this.render();
        }

        render(): void {
            console.log('render');
            //TODO:
        }

        override destroy(): void {
            super.destroy();
            this._item = null;
        }

        get exp1(): HTMLDivElement {
            return this.getEl('div.var1 div.exp-cont') as HTMLDivElement;
        }

        get exp2(): HTMLDivElement {
            return this.getEl('div.var2 div.exp-cont') as HTMLDivElement;
        }
    }

}