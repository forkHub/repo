///<reference path="./ha/comp/BaseComponent.ts"/>

class HalDepan extends ha.comp.BaseComponent {
    private static instObj: HalDepan;
    private _listCont: HTMLElement;
    private cariEl: HTMLInputElement;
    private tambahTbl: TambahTbl;
    private kosong: Kosong;

    public get listCont(): HTMLElement {
        return this._listCont;
    }

    constructor() {
        super();
        this._template = `
            <div class='hal-depan padding'>
                <h1>Catatan:</h1>
                <div class='padding'></div>
                <div class='cari-catatan'>
                    <input type='text' class='width-12 cari-note padding border-radius-16' placeholder='cari catatan'>
                </div>
                <div class='padding'></div>
                <div class='list-cont'>
                </div>
            </div>
        `;
        this.build();

        this._listCont = this.getEl('div.list-cont');
        this.cariEl = this.getEl('input.cari-note') as HTMLInputElement;

        this.listCont.style.paddingBottom = '72px';

        this.tambahTbl = new TambahTbl(() => {
            this.tambahKlik();
        });

        this.tambahTbl.attach(this._elHtml);
        this.kosong = new Kosong();
        this.kosong.attach(this.listCont);

        this.cariEl.oninput = () => {
            if (this.cariEl.value.length > 0) {
                NoteItem.filter(this.cariEl.value);
            }
            else {
                NoteItem.filterHapus();
            }
            this.updateKosong();
        }
    }

    tambahKlik(): void {
        console.log('tambah note');
        let note: INote;

        note = Note.buat(Date.now(), '', '');

        HalDepan.inst.detach();

        HalEdit.Inst.edit(note,
            () => {
                Note.push(note);
                simpan();

                NoteItem.buat(note).attach(this.listCont);

                HalDepan.inst.attach(document.body);
                HalDepan.inst.updateKosong();
            }, () => {
                HalDepan.inst.attach(document.body);
                HalDepan.inst.updateKosong();
            })
    }

    itemKlik(item: NoteItem): void {
        HalDepan.inst.detach();

        let copy: INote = Note.clone(item.item);

        HalEdit.Inst.edit(copy, () => {
            item.item.isi = copy.isi;
            item.item.judul = copy.judul;
            item.refresh();

            HalDepan.inst.attach(document.body);
            simpan();
        }, () => {
            HalDepan.inst.attach(document.body);
        });

    }

    updateKosong(): void {
        this.kosong.update();
    }

    static get inst(): HalDepan {
        if (this.instObj) return this.instObj;

        this.instObj = new HalDepan();
        return this.instObj;
    }
}