class ValueEd extends ha.comp.BaseComponent {
    private menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();
    private value: IValue;

    constructor(value: IValue) {
        super();
        this._template = `
            <div class='value user-select-none cursor-pointer back-white disp-table'>
                <div class='disp-cell value cont padding'>
                </div>
            </div>
        `;
        this.build();
        this.value = value;
        this.cont.innerText = value.value;
        this.setupMenu();

        this._elHtml.style.width = '100%';
        this._elHtml.style.height = '100%';
        this._elHtml.style.minHeight = '36px';
        this._elHtml.style.borderColor = 'white';
        this._elHtml.style.verticalAlign = 'middle';
        // this._elHtml.style.borderStyle = 'solid';

        this._elHtml.onclick = (e: MouseEvent) => {
            e.stopPropagation();

            this.menu.view.attach(document.body);
        }

    }

    get cont(): HTMLElement {
        return this.getEl('div.value div.value.cont')
    }

    setupMenu(): void {
        this.menu.buatTombol({
            label: 'hapus',
            f: () => {
                Value.hapus(this.value.id);
                this.detach();
                this.destroy();
            }
        });

        this.menu.buatTombol({
            label: 'edit',
            f: () => {
                let nilai2: string = window.prompt("value:", this.value.value);
                if (nilai2) {
                    this.value.value = nilai2;
                    this.cont.innerText = nilai2;
                }
            }
        })
    }
}