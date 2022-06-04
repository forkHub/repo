namespace modul.editor.modul.update {

    export namespace fung.dek {
        let _el: HTMLDivElement;
        const balikQuery: string = 'button.balik';
        const namaQuery: string = 'button.nama';
        const paramQuery: string = 'button.param';
        const stmtQuery: string = 'button.stmt';

        let popUp: ha.comp.MenuPopup = new ha.comp.MenuPopup();
        popUp.buatTombol({
            f: () => { },
            label: 'var isi'
        });

        export function el(): HTMLDivElement {
            if (!_el) {
                _el = ha.comp.Util.getTemplate('div.menu-fungsi-deklarasi-update') as HTMLDivElement;
            }
            return _el;
        }

        export function modulTbl(): HTMLButtonElement {
            return ha.comp.Util.getEl('button.modul', el()) as HTMLButtonElement;
        }

        export function mulai(): void {
            menu.klik(balikQuery, el(), () => {
                window.modul.editor.menu.ganti(window.modul.editor.menu.utama.view.elHtml);
            });

            menu.klik(namaQuery, el(), () => {
                // window.fung.dek.daftar.updateNama.exec();
            })

            menu.klik(paramQuery, el(), () => {
                console.log('param klik')
                window.param.update.exec();
            })

            menu.klik(stmtQuery, el(), () => {
                console.log('stmt klik');
                popUp.view.attach(document.body);
            });
        }

    }

}