namespace variable.isi {

    class DisplayView extends ha.comp.BaseComponent {
        private _item: IVarIsi;
        public get item(): IVarIsi {
            return this._item;
        }

        constructor(item: IVarIsi) {
            super();
            this._template = `
                <div class='var-isi-item'>
                   <button class='var1'>-</button>
                   <span>=</span>
                   <button class='var2'>-</button> 
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

        get var1Tbl(): HTMLButtonElement {
            return this.getEl('button.var1') as HTMLButtonElement;
        }

        get var2Tbl(): HTMLButtonElement {
            return this.getEl('button.var2') as HTMLButtonElement;
        }
    }

    export function render(item: IVarIsi, cont: HTMLDivElement): void {
        let view: DisplayView = new DisplayView(item);
        view.attach(cont);
    }

    export namespace edit {
        //TODO: edit
    }
}