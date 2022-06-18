///<reference path="../var_isi/VarIsi.ts"/>

namespace fungsi.stmt {
    export const daftarStmtView: ha.comp.BaseComponent[] = [];

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
                popup.menu.view.attach(document.body);
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
        let fungDekObj: IFungDek = window.fung.dek.ent.diedit();
        let stmtAr: IStmt[] = window.stmt.ent.byIndukId(fungDekObj.id);

        daftarStmtView.forEach((item: ha.comp.BaseComponent) => {
            item.destroy();
        })

        stmtAr.forEach((item: IStmt) => {
            if (item.stmtType == data.STMT_VAR_ISI) {
                popup.buatVarIsiKlik();
            }
            else {
                throw Error('stmt type belum ada: ' + item.stmtType);
            }
        })
    }

}

namespace fungsi.stmt.popup {
    export async function buatVarIsiKlik(): Promise<void> {
        let id: number = fung.dek.ent.diedit().id
        // let var2:Window.
        let varIsiObj: IVarIsi;
        let varIsiView: globalThis.variable.isi.editor.View

        varIsiObj = window.variable.isi.ent.buat(id);
        varIsiView = new window.variable.isi.editor.View(varIsiObj);
        varIsiView.attach(view.daftar);
        daftarStmtView.push(varIsiView);

        await ha.comp.Util.delay(5);
        let ref: IRef = window.variable.ref.ent.buat(varIsiObj.id);
        ref;
        //TODO: buat view dan pasang ke var isi

        // await exp.buatExp(varIsiObj.id, varIsiView.exp1);
        await exp.buatExp(varIsiObj.id, varIsiView.exp2);
    }

    export const menuTambah: ha.comp.MenuPopup = new ha.comp.MenuPopup();
    menuTambah.buatTombol({
        label: 'var isi',
        f: () => { buatVarIsiKlik(); }
    });

    export const menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();
    menu.buatTombol({
        label: 'tambah',
        f: () => {
            menuTambah.view.attach(document.body);
        }
    });

}