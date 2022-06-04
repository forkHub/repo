namespace fung.dek.editor.stmt {
    const daftar: ha.comp.BaseComponent[] = [];

    async function buatExp(id: number, cont: HTMLDivElement): Promise<void> {
        let exp1: IExp;
        let expView: exp.View;

        await ha.comp.Util.delay(5);
        exp1 = window.exp.ent.buat(id);
        expView = new exp.View(exp1);
        expView.attach(cont);

        //buat value 
        await ha.comp.Util.delay(5);
        let valueObj: IValue = window.value.ent.buat(exp1.id);
        let valueView: value.View = new value.View(valueObj);
        valueView.attach(expView.cont);
    }

    async function buatVarIsiKlik(): Promise<void> {
        let id: number = fung.dek.diedit().id
        let varIsiObj: IVarIsi;
        let varIsiView: variable.isi.item.View;
        // let exp1: IExp;
        // let exp2: IExp;
        // let expView: exp.View;

        varIsiObj = variable.isi.ent.buat(id);
        varIsiView = new variable.isi.item.View(varIsiObj);
        varIsiView.attach(view.daftar);
        daftar.push(varIsiView);

        // await ha.comp.Util.delay(5);
        // exp1 = window.exp.ent.buat(varIsiObj.id);
        // expView = new exp.View(exp1);
        // expView.attach(varIsiView.exp1)
        buatExp(varIsiObj.id, varIsiView.exp1);

        // await ha.comp.Util.delay(5);
        // exp2 = window.exp.ent.buat(varIsiObj.id);
        // expView = new exp.View(exp2);
        // expView.attach(varIsiView.exp2);
        buatExp(varIsiObj.id, varIsiView.exp2);
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
                <div class='stmt-comp padding border'>
                    <div class='padding'>
                        stmts:
                    </div>
                    <div class='daftar padding border'>
                    </div>
                    <div class='padding'>
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