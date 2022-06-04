namespace fung.dek.editor.stmt {
    const daftar: ViewItem[] = [];

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
                </stmt>
            `;
            this.build();

        }

        get daftar(): HTMLDivElement {
            return this.getEl('div.daftar') as HTMLDivElement;
        }
    }
    export const view: View = new View();

    class ViewItem extends ha.comp.BaseComponent {
        private _stmt: IStmt;
        public get stmt(): IStmt {
            return this._stmt;
        }

        constructor(item: IStmt) {
            super();
            this._template = `
                <div class='stmt-item'>
                </div>
            `;
            this._stmt = item;
        }
    }

    export function render(): void {
        let fungDekObj: IFungDek = window.fung.dek.diedit();
        let stmtObj: IStmt[] = window.stmt.byIndukId(fungDekObj.id);

        daftar.forEach((item: ViewItem) => {
            item.destroy();
        })

        stmtObj.forEach((item: IStmt) => {
            let viewItem: ViewItem = new ViewItem(item);
            viewItem.attach(view.daftar);
            daftar.push(viewItem);
        })
    }
}