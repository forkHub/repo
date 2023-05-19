class Kosong extends ha.comp.BaseComponent {
    constructor() {
        super();
        this._template = `
            <div class='kosong padding'>
                Tidak Ada Data
            </div>
        `;
        this.build();
    }

    update(): void {
        if (NoteItem.checkKosong()) {
            this.elHtml.style.display = 'block';
        }
        else {
            this.elHtml.style.display = 'none';
        }
    }

} 