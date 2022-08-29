namespace ha.contact {
    class Cari extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._elHtml = this.getTemplate('ha-search');
        }

        init(): void {
            ha.contact.beranda.cariTbl.onclick = () => {
                console.log('cari click');
                this.attach(document.body);
            }

            this.tutupTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                this.detach();
            }

            this.cariTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('cari click');
                ha.contact.contact.postRefresh();
            }
        }

        get tutupTbl(): HTMLButtonElement {
            return this.getEl('button.tutup') as HTMLButtonElement;
        }

        get cariTbl(): HTMLButtonElement {
            return this.getEl('button.cari') as HTMLButtonElement;
        }
    }

    export var cari: Cari = new Cari();
}