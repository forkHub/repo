///<reference path="./comp/MenuPopUp.ts"/>

class Project {
    static readonly template: string = `
        <div class='project'>
            <div class='header'>
                <button class='disp-inline-block'>|||</button>
                <span class='judul disp-inline-block'>
                </span>
            </div>
            <div class='content'>
            </div>
        </div>
    `;
    private static _view: HTMLElement;
    static readonly menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();

    public static get view(): HTMLElement {
        if (!this._view) {
            this._view = ha.comp.Util.build(Project.template);
        }
        return this._view;
    }

    public static get contentHtml(): HTMLElement {
        return ha.comp.Util.getEl('div.content', this.view);
    }

    public static terj(): string {
        let modul: IModul = Modul.getAwal();
        let hasilStr: string = '';

        if (modul) {
            hasilStr = Modul.terj(modul);
        }
        else {
            throw Error('');
        }

        console.log(hasilStr);
        return hasilStr;
    }

    constructor() {
        Project.setupMenu();
    }

    static setupMenu(): void {
        this.menu.buatTombol({
            label: 'translate',
            f: () => {
                let modul: IModul = Modul.getAwal();
                let hasilStr: string = '';

                if (modul) {

                    hasilStr = Modul.terj(modul);

                }

                return hasilStr;
            }
        })
    }
}