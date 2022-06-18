namespace halModul {

    class View extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._elHtml = this.getTemplate('div.modul-cont div.hal-modul');
        }

        get halaman(): HTMLDivElement {
            return this.getEl('halaman') as HTMLDivElement;
        }

        get variable(): HTMLDivElement {
            return this.getEl('div.var') as HTMLDivElement;
        }

        get deklarasiFungsi(): HTMLDivElement {
            return this.getEl('div.dek-fung') as HTMLDivElement;
        }

        get menu(): HTMLDivElement {
            return this.getEl('div.menu') as HTMLDivElement;
        }
    }
    export const view: View = new View();

    export async function exec() {
        view.attach(document.body);

        //buat modul
        let modulObj: IModul;
        modulObj = window.md.buat('mulai', 0);
        modulObj.dipilih = true;
        modulObj.view.attach(view.halaman);
        modulObj.view.elHtml.classList.add('dipilih');

        console.log(Date.now());
        await ha.comp.Util.delay(10);
        console.log(Date.now());

        modulObj = window.md.buat('loop', 0);
        modulObj.view.attach(view.halaman);

        //debug
        // menu.utama.view
        // system.menu.
        system.menu.muatKlik();
    }
}

// async function init(): Promise<void> {
//     await halModul.exec();
//     md.editor.menu.tambah.exec();
//     md.editor.menu.utama.view.attach(halModul.view.menu);
//     system.menu.exec();
// }

// window.onload = () => {
//     init();
// }