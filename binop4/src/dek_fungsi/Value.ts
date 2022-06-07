namespace fung.dek.editor.value {
    var viewAktif: View;

    const menuPopUp: ha.comp.MenuPopup = new ha.comp.MenuPopup();
    menuPopUp.buatTombol({
        label: 'update',
        f: () => {
            let nama: string = window.prompt('update value: ', viewAktif.value.value);

            if (nama && window.value.ent.validateNama(nama)) {
                viewAktif.value.value = nama;
                viewAktif.valueDiv.innerHTML = nama;
            }
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
                viewAktif = this;
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

    export async function buatValue(indukId: number, cont: HTMLDivElement): Promise<void> {
        await ha.comp.Util.delay(5);
        let valueObj: IValue = window.value.ent.buat(indukId);
        let valueView: value.View = new value.View(valueObj);
        valueView.attach(cont);
    }
}