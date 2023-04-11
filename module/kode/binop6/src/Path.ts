class Path {
    static readonly temp: string = `
        <div class='path padding-4'>
            <div class='padding border wspace-nowrap'>
                <button class='kembali'>◀</button>
                <div class='disp-inline-block padding'></div>
            </div>
        </div>
    `;
    private static _view: ha.comp.BaseComponent;

    static get view(): ha.comp.BaseComponent {
        if (!this._view) {
            this._view = ha.comp.BaseComponent.buat(this.temp);
            ha.comp.Util.getEl('button.kembali', this._view.elHtml).onclick = (e: MouseEvent) => {
                e.stopPropagation();
                this._back();
            }
        }

        return this._view;
    }

    private static _back: () => void
    static set back(f: () => void) {
        this._back = f;
    }

}