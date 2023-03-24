import { BaseComponent } from "../comp/BaseComponent.js";
import { VariableObj } from "../VarEnt.js";

export class VarView extends BaseComponent {
    private static list: VarView[] = [];
    private static dipilih: VarView = null;

    private _item: VariableObj;
    private namaEl: HTMLElement;
    private hapusTbl: HTMLButtonElement;
    private editTbl: HTMLButtonElement;

    public get item(): VariableObj {
        return this._item;
    }

    constructor(item: VariableObj) {
        super();
        this._elHtml = this.getTemplate('div.entry');
        this._item = item;

        this.namaEl = this.getEl('div.nama');
        this.hapusTbl = this.getEl('button.hapus') as HTMLButtonElement;
        this.editTbl = this.getEl('button.edit') as HTMLButtonElement;

        this.namaEl.innerText = this._item.nama;

        this.editTbl.onclick = () => {
            // console.log('edit');
            this.editKlik();
        }

        this.hapusTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            this.hapusDiKlik();
        }

        this._elHtml.onclick = (e: MouseEvent) => {
            e.stopPropagation();

            if (VarView.dipilih) {
                VarView.dipilih.dipilih(false);
            }

            VarView.dipilih = this;
            this.dipilih(true);
        }
    }

    private hapusDiKlik(): void {

        let b: boolean = confirm('dihapus?');

        if (b) {
            VariableObj.hapus(this.item);

            // this._item = null;
            // this.destroy();

            // VarView.dipilih = null;

            // if (!VarView.getById(store.dipilih)) {
            //     store.dipilih = 0
            // };
        }
    }

    private editKlik(): void {
        let nama: string = prompt('nama: ' + this.item.nama);
        if (nama) {
            this.item.nama = nama;
            VariableObj.edit();
        }
    }

    dipilih(dipilih: boolean) {
        //TODO:
        dipilih;
    }

    static tambah(cont: HTMLDivElement, item: VariableObj): void {
        let view: VarView = new VarView(item);
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

    static getById(id: number): VarView {
        return this.list.find((item: VarView) => {
            return item.item.id == id;
        })
    }
}