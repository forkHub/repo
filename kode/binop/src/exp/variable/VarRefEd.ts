class VarRefEd extends ha.comp.BaseComponent {
    private varRef: IVarRef;
    private menu: ha.comp.MenuPopup;
    private bisaDihapus: boolean = false;

    constructor(varRef: IVarRef, bisaDihapus: boolean) {
        super();

        this._template = `
            <div class='var-ref disp-table user-select-none cursor-pointer' style='min-width:39px'>
                <div class='var-ref disp-cell cont back-white padding'></div>
            </div>
        `;

        this.build();
        this.bisaDihapus = bisaDihapus;
        this.setupMenu();
        this.varRef = varRef;
        this.display();
        this.varCont.style.backgroundColor = 'white';
        this._elHtml.style.minHeight = '36px';

        this._elHtml.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        }
    }

    setupMenu(): void {
        this.menu = new ha.comp.MenuPopup();

        if (this.bisaDihapus) {
            this.menu.buatTombol({
                label: 'hapus',
                f: () => {
                    VarRef.hapus(this.varRef.id);
                    this.detach();
                }
            });
        }

        this.menu.buatTombol({
            label: 'update',
            f: () => {
                dlgPilihVariable.view.attach(document.body);
                dlgPilihVariable.tampil();
                dlgPilihVariable.finish = () => {
                    this.varRef.refId = dlgPilihVariable.varId;
                    this.display();
                }
            }
        })
    }

    get varCont(): HTMLElement {
        return this.getEl('div.var-ref.cont');
    }

    display(): void {
        console.log('display');

        if (this.varRef.refId > 0) {
            this.varCont.innerText = Variable.get(this.varRef.refId).nama;
        }
        else {
            this.varCont.innerText = '---';
        }

    }
}