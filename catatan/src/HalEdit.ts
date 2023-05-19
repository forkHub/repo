class HalEdit extends ha.comp.BaseComponent {
    private static instObj: HalEdit;
    private judulEl: HTMLInputElement;
    private isiEl: HTMLTextAreaElement;
    private backTbl: HTMLElement;
    private selesai: () => void;
    private batal: () => void;
    private note: INote;
    private simpanTbl: HTMLButtonElement;
    private batalTbl: HTMLButtonElement;

    constructor() {
        super();
        this._template = `
            <div class='disp-flex flex-dir-col min-height-12 padding'>
                <div class='edit-note disp-table'>
                    <button type='button' class='disp-cell white-space-no-wrap kembali'>&larr;</button>
                    <div class='disp-cell width-12 padding-kiri'>Edit Note</div>
                </div>
                <div class='padding'></div>
                <div class='disp-flex flex-dir-col flex-grow-1'>
                    <label for='judul'>Judul:</label>
                    <input type='text' name='judul' class='judul padding'/>
                    <div class='padding'></div>
                    <label for='judul'>Isi:</label>
                    <textarea class='flex-grow-1 isi padding' name='isi' rows='20' cols='80'/></textarea>
                    <div class='disp-table padding'>
                        <div class='disp-cell text-align-center'>
                            <button class='simpan'>simpan</button>
                        </div>
                        <div class='disp-cell text-align-center'>
                            <button class='batal'>batal</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.build();
        this.judulEl = this.getEl('input.judul') as HTMLInputElement;
        this.isiEl = this.getEl('textarea.isi') as HTMLTextAreaElement;
        this.backTbl = this.getEl('button.kembali') as HTMLButtonElement;
        this.simpanTbl = this.getEl('button.simpan') as HTMLButtonElement;
        this.batalTbl = this.getEl('button.batal') as HTMLButtonElement;

        this.judulEl.onchange = () => {
            this.note.judul = this.judulEl.value;
        }

        this.isiEl.onchange = () => {
            this.note.isi = this.isiEl.value;
        }

        this.backTbl.onclick = () => {
            this.klikBack();
        }

        this.batalTbl.onclick = () => {
            this.klikBack();
        }

        this.simpanTbl.onclick = () => {
            this.detach();
            this.selesai();
        }
    }

    klikBack(): void {
        this.detach();
        this.batal();
    }

    static get Inst(): HalEdit {
        if (this.instObj) return this.instObj;

        this.instObj = new HalEdit();
        return this.instObj;
    }

    updateView(): void {
        this.judulEl.value = this.note.judul;
        this.isiEl.value = this.note.isi;
    }

    edit(note: INote, ok: () => void, batal: () => void): void {
        this.note = note;
        this.updateView();
        this.selesai = ok;
        this.batal = batal;
        this.attach(document.body);
    }
}