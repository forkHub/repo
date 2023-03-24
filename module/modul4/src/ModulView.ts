import { BaseComponent } from "./comp/BaseComponent.js";
import { store } from "./hal_module.js";
import { ModulObj } from "./modulEnt.js";

export class ModulView extends BaseComponent {
    private static list: ModulView[] = [];

    private _item: ModulObj;
    private namaEl: HTMLElement;
    private anakEl: HTMLDivElement;
    private expandTbl: HTMLButtonElement;
    private lihatTbl: HTMLButtonElement;
    private hapusTbl: HTMLButtonElement;
    private editTbl: HTMLButtonElement;
    private elCont: HTMLDivElement;

    public get item(): ModulObj {
        return this._item;
    }

    constructor(item: ModulObj) {
        super();
        this._elHtml = this.getTemplate('div.modul-item');
        this._item = item;

        this.namaEl = this.getEl('div.nama');
        this.expandTbl = this.getEl('button.expand') as HTMLButtonElement;
        this.anakEl = this.getEl('div.anak') as HTMLDivElement;
        this.lihatTbl = this.getEl('button.lihat') as HTMLButtonElement;
        this.hapusTbl = this.getEl('button.hapus') as HTMLButtonElement;
        this.editTbl = this.getEl('button.edit') as HTMLButtonElement;
        this.elCont = this.getEl('div.el-cont') as HTMLDivElement;

        this.namaEl.innerText = this._item.nama;

        this.editTbl.onclick = () => {
            // console.log('edit');
            this.editKlik();
        }

        this.hapusTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            this.hapusKlik();
        }

        this.lihatTbl.onclick = () => {
            console.debug('lihat klik');
            this.lihatKlik();
        }

        this.expandTbl.onclick = () => {
            console.debug('expand click');
        }

        this._elHtml.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            if (store.dipilih) {
                ModulView.getById(store.dipilih)?.dipilih(false);
            }

            store.dipilih = this.item.id;
            this.dipilih(true);
        }

        //load anak
        ModulObj.getByParentId(this.item.id).forEach((item: ModulObj) => {
            ModulView.tambah(this.anakEl, item);
        });
    }

    private lihatKlik(): void {
        window.top.location.href = "edit_modul.html?id=" + this._item.id;
    }

    private hapusKlik(): void {

        let b: boolean = confirm('dihapus');

        if (b) {
            ModulObj.hapus(this.item);
            this._item = null;
            this.destroy();

            if (!ModulView.getById(store.dipilih)) {
                store.dipilih = 0
            };
        }
    }

    private editKlik(): void {
        let nama: string = prompt('nama: ' + this.item.nama);
        if (nama) {
            this.item.nama = nama;
            ModulObj.edit();
        }
    }

    dipilih(dipilih: boolean) {
        if (dipilih) {
            this.elCont.classList.add('dipilih');
        }
        else {
            this.elCont.classList.remove('dipilih');
        }
    }

    static tambah(cont: HTMLDivElement, item: ModulObj): void {
        let view: ModulView = new ModulView(item);
        view.attach(cont);
        this.list.push(view);
    }

    static destroy(): void {

    }

    static reload(): void {
        // ModulView.dipilih = null;
        // while (this.list.length > 0) {
        //     let item: ModulView = this.list.pop();
        //     item.destroy();
        // }

        //reselect
    }

    static getById(id: number): ModulView {
        return this.list.find((item: ModulView) => {
            return item.item.id == id;
        })
    }
}