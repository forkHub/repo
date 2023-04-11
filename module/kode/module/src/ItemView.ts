namespace ha.modul {
    export class ItemView extends ha.comp.BaseComponent {

        constructor() {
            super();
            this._elHtml = this.getTemplate('item');
        }

        dipilih(): void {
            this._elHtml.classList.add('dipilih');
        }

        tidakDipilih(): void {
            this._elHtml.classList.remove('dipilih');
        }


        get judul(): HTMLDivElement {
            return this.getEl('judul') as HTMLDivElement;
        }

    }
}