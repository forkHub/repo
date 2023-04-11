///<reference path="../ha/comp/BaseComponent.ts"/>

class ForNextEd extends ha.comp.BaseComponent {
    private forObj: IFor;
    private menu: ha.comp.MenuPopup;
    private daftarStmt: HTMLElement;
    private daftarVar: HTMLElement;
    private expCont: HTMLElement;
    private varCont: HTMLElement;

    //for [var-isi] to [exp] next [content]
    constructor(forObj: IFor) {
        super();
        this._template = `
            <div class='for-next disp-table'>
                <div class='disp-cell'>

                    <div class='disp-table padding'>
                        <div class='disp-cell padding-kanan user-select-none'>For </div>

                        <div class='for-next var-isi-cont disp-cell padding-kanan'></div>

                        <div class='disp-cell padding-kanan user-select-none'> To </div>

                        <div class='for-next exp-cont disp-cell'></div>
                    </div>

                    <div class='disp-table'>
                        <div class='disp-cell padding padding-kiri padding kanan jeda-kiri1'></div>
                        <div class='disp-cell'>
                            <div class='for-next daftar-var disp-table'></div>
                        </div>
                    </div>

                    <div class='disp-table'>
                        <div class='disp-cell padding padding-kiri padding kanan jeda-kiri2'></div>
                        <div class='disp-cell'>
                            <div class='for-next stmt-cont disp-table'></div>
                        </div>
                    </div>

                    <div class='disp-table padding user-select-none'>Next</div>
                </div>
            </div>
        `;

        this.build();
        this.daftarStmt = this.getEl('div.stmt-cont');
        this.daftarVar = this.getEl('div.daftar-var');
        this.expCont = this.getEl('div.exp-cont.for-next');
        this.varCont = this.getEl('div.for-next.var-isi-cont');

        this.getEl('div.jeda-kiri1').style.paddingRight = '32px';
        this.getEl('div.jeda-kiri2').style.paddingRight = '32px';

        this.forObj = forObj;
        // this.daftarVar.style.paddingLeft = '32px';

        this.setup();
        this.setupMenu();
    }

    setup(): void {
        let varIsiEd: VarIsiEd;
        let expEd: ExpEd2;

        varIsiEd = new VarIsiEd(VarIsi.get(this.forObj.varRef), false);
        varIsiEd.attach(this.varCont);

        expEd = new ExpEd2(Exp.get(this.forObj.toRef));
        expEd.attach(this.expCont);
    }

    setupMenu(): void {
        this.menu = new ha.comp.MenuPopup();

        this.menu.buatTombol({
            label: 'hapus',
            f: () => {
                ForNext.hapus(this.forObj.id);
                this.detach();
                this.destroy();
            }
        });

        this.menu.buatTombol({
            label: '+ variable',
            f: () => {
                let nama: string = '';
                let varObj: IVar;
                let varView: VariableItem;

                nama = window.prompt('nama: ');

                if (nama) {
                    varObj = Variable.buatVarObj(nama, this.forObj.id);
                    varView = new VariableItem(varObj);
                    varView.attach(this.daftarVar);
                }
            }
        })

        this.menu.buatTombol({
            label: '+ var isi',
            f: () => {
                let varIsi: IVarIsi = VarIsi.buatDef(this.forObj.id);
                let ed: VarIsiEd = new VarIsiEd(varIsi, true);
                ed.attach(this.daftarStmt);
            }
        })

        this._elHtml.onclick = () => {
            this.menu.view.attach(document.body);
        }

    }

}