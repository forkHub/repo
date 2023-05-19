///<reference path="./ha/comp/BaseComponent.ts"/>

class NoteItem extends ha.comp.BaseComponent {
    private _item: INote;
    public get item(): INote {
        return this._item;
    }

    private tglEl: HTMLElement;
    private judulEl: HTMLElement;
    private hapusTbl: HTMLButtonElement;
    private static daftar: NoteItem[] = [];
    private timer: number;
    private downTime: number;

    constructor(item: INote) {
        super();
        this._template = `
            <div class='note-item padding user-select-none'>
                <div class='tgl text-align-right'></div>
                <div class='disp-flex'>
                    <div class='judul flex-grow-1 disp-flex align-items-center'></div>
                    <div class='tbl'>
                        <button class='hapus'>🗑</edit>
                    </div>
                </div>
            </div>
        `;
        this.build();
        this.tglEl = this.getEl('div.tgl');
        this.judulEl = this.getEl('div.judul');
        this.hapusTbl = this.getEl('button.hapus') as HTMLButtonElement;

        this.tglEl.style.fontSize = 'smaller';

        this._item = item;
        this.refresh();

        this._elHtml.onpointerdown = (e: PointerEvent) => {
            e.stopPropagation();
            this.timer = setTimeout(() => {
                console.log('on hold event');
                this._elHtml.setAttribute('fase', 'idle');
            }, 1000);

            this.downTime = Date.now();
            console.log('down');
            this._elHtml.setAttribute('fase', 'pencet');
        }

        this._elHtml.onpointerup = (e: PointerEvent) => {
            e.stopPropagation();
            clearTimeout(this.timer);

            if ((Date.now() - this.downTime) > 500) {
                console.log('click cancel');
                this._elHtml.setAttribute('fase', 'idle');
            }
            else {
                this._elHtml.setAttribute('fase', 'click');
                this.klik();
            }
        }

        this._elHtml.onclick = () => {
            console.log('on click');
        }

        this.hapusTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            let ok: boolean = window.confirm('Hapus?');

            if (ok) {
                Note.hapus(this.item.id);
                NoteItem.hapus(this.item);
                this._item = null;
                this.destroy();
                simpan();
                HalDepan.inst.updateKosong();
            }
        }
    }

    private klik(): void {
        HalDepan.inst.detach();

        let copy: INote = Note.clone(this.item);

        HalEdit.Inst.edit(copy, () => {
            this.item.isi = copy.isi;
            this.item.judul = copy.judul;
            this.refresh();

            HalDepan.inst.attach(document.body);
            simpan();
        }, () => {
            HalDepan.inst.attach(document.body);
        });
    }

    static checkKosong(): boolean {
        if (this.daftar.length == 0) return true;

        for (let i: number = 0; i < this.daftar.length; i++) {
            if (this.daftar[i].elHtml.style.display != 'none') {
                return false;
            }
        }

        return true;
    }

    refresh(): void {
        this.tglEl.innerText = this.renderTanggal(this.item.tgl);
        this.judulEl.innerText = this.item.judul;
    }

    private renderTanggal(n: number): string {
        let date: Date = new Date(n);

        return (date.getDate() + 1) + '/' + date.getMonth() + '/' + date.getFullYear();
    }

    static hapus(item: INote): void {
        this.daftar.forEach((view: NoteItem, idx: number) => {
            if (view.item == item) {
                this.daftar.splice(idx, 1);
            }
        })
    }

    static buat(item: INote): NoteItem {
        let hasil: NoteItem;

        hasil = new NoteItem(item);
        this.daftar.push(hasil);
        return hasil;
    }

    static filter(teks: string): void {
        this.daftar.forEach((view: NoteItem) => {
            if (!Note.filter(view.item, teks)) {
                view.elHtml.style.display = 'none';
            }
            else {
                view.elHtml.style.display = 'block';
            }
        })
    }

    static filterHapus(): void {
        this.daftar.forEach((view: NoteItem) => {
            view.elHtml.style.display = 'block';
        })
    }

    static hapusSemua(): void {
        while (this.daftar.length > 0) {
            let item: NoteItem = this.daftar.pop();
            item._item = null;
            item.destroy();
        }
    }


}