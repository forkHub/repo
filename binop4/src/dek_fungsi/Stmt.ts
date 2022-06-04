namespace fung.dek.editor.stmt {
    const daftar: ha.comp.BaseComponent[] = [];

    async function buatVarIsiKlik(): Promise<void> {
        let id: number = fung.dek.diedit().id
        let varIsiObj: IVarIsi;
        let varIsiView: variable.isi.item.View;
        let exp1: IExp;
        let exp2: IExp;
        let expView: ExpView;

        varIsiObj = variable.isi.ent.buat(id);
        varIsiView = new variable.isi.item.View(varIsiObj);
        varIsiView.attach(view.daftar);
        daftar.push(varIsiView);

        await ha.comp.Util.delay(5);
        exp1 = exp.ent.buat(varIsiObj.id);
        expView = new ExpView(exp1);
        expView.attach(varIsiView.var1Tbl)

        await ha.comp.Util.delay(5);
        exp2 = exp.ent.buat(varIsiObj.id);
        expView = new ExpView(exp2);
        expView.attach(varIsiView.var2Tbl);
    }

    const menuTambah: ha.comp.MenuPopup = new ha.comp.MenuPopup();
    menuTambah.buatTombol({
        label: 'var isi',
        f: () => { buatVarIsiKlik(); }
    });

    const menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();
    menu.buatTombol({
        label: 'tambah',
        f: () => {
            menuTambah.view.attach(document.body);
        }
    });

    class View extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._template = `
                <div class='stmt padding border'>
                    <div class='padding'>
                        stmts:
                    </div>
                    <div class='daftar padding border'>
                    </div>
                    <div>
                        <button class='menu'>|||</button>
                    </div>
                </stmt>
            `;
            this.build();

            this.menu.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                menu.view.attach(document.body);
            }

        }

        get daftar(): HTMLDivElement {
            return this.getEl('div.daftar') as HTMLDivElement;
        }

        get menu(): HTMLButtonElement {
            return this.getEl('button.menu') as HTMLButtonElement;
        }
    }
    export const view: View = new View();

    class ExpView extends ha.comp.BaseComponent {
        private _exp: IExp;
        public get exp(): IExp {
            return this._exp;
        }

        constructor(exp: IExp) {
            super();

            this._exp = exp;
        }
    }

    export function render(): void {
        let fungDekObj: IFungDek = window.fung.dek.diedit();
        let stmtObj: IStmt[] = window.stmt.byIndukId(fungDekObj.id);

        daftar.forEach((item: ha.comp.BaseComponent) => {
            item.destroy();
        })

        stmtObj.forEach((item: IStmt) => {
            if (item.stmtType == data.STMT_VAR_ISI) {
                buatVarIsiKlik();
            }
            else {
                throw Error('stmt type belum ada: ' + item.stmtType);
            }
        })
    }
}