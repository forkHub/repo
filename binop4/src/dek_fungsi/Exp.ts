namespace fung.dek.editor.exp {
    var aktifView: View;

    const menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();
    menu.buatTombol({
        label: 'value',
        f: () => {
            ha.comp.Util.bersihDiv(aktifView.cont);
            let valueObj: IValue = window.value.ent.buat(aktifView.exp.id);
            let valueView: value.View = new value.View(valueObj);
            valueView.attach(aktifView.cont);
        }
    });

    //TODO: func-call, ref

    export class View extends ha.comp.BaseComponent {
        private _exp: IExp;
        public get exp(): IExp {
            return this._exp;
        }

        constructor(exp: IExp) {
            super();
            this._template = `
                <div class='exp-comp padding border row'>
                    <div class='cont padding'></div>
                    <div class='padding'>
                        <div class='padding'>
                            <button class='menu'>|||</button>
                        </div>
                    </div>
                </div>
            `;
            this.build();

            this.menuTbl.onclick = () => {
                aktifView = this;
                menu.view.attach(document.body);
            }

            this._exp = exp;
        }

        get cont(): HTMLDivElement {
            return this.getEl('div.cont') as HTMLDivElement;
        }

        get menuTbl(): HTMLButtonElement {
            return this.getEl('button.menu') as HTMLButtonElement;
        }

    }
}