namespace md {
    class HalModul extends ha.comp.BaseComponent {
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
    export var halModul: HalModul = new HalModul();

}
