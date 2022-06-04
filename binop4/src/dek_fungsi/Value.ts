namespace fung.dek.editor.value {
    const menuPopUp: ha.comp.MenuPopup = new ha.comp.MenuPopup();
    menuPopUp.buatTombol({
        label: 'update',
        f: () => {
            //TODO:
        }
    })

    export class View extends ha.comp.BaseComponent {
        private _value: IValue;
        public get value(): IValue {
            return this._value;
        }

        constructor(value: IValue) {
            super();
            this._template = `
                <div class='value-comp border row'>
                    <div class='value padding tengah-tengah'></div>
                    <div class='padding'>
                        <button class='menu'>|||</button>
                    </div>
                </div>
            `;
            this.build();
            this.valueDiv.innerHTML = value.value;

            this.menuTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                menuPopUp.view.attach(document.body);
            }

            this._value = value;
        }

        get valueDiv(): HTMLDivElement {
            return this.getEl('div.value') as HTMLDivElement;
        }

        get menuTbl(): HTMLButtonElement {
            return this.getEl('button.menu') as HTMLButtonElement;
        }
    }
}