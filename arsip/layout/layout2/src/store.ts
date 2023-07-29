import { LayoutObj } from "./LayoutObj";

export interface ILayout {
    id: number,
    nama: string,
    anak: ILayout[]
}

export interface IStore {

}

export let store: IStore = {}

class LayoutList {
    private list: LayoutObj[] = [];
    private loaded: boolean = false;

    simpan(): void {
        //TODO:
    }

    load(): void {
        //TODO:
        this.loaded;
    }

    tambah(l: LayoutObj): void {
        this.list.push(l);
    }

    get(): LayoutObj[] {
        return this.list.slice();
    }

    getById(id: number): LayoutObj {
        return this.list.find((item) => {
            return item.id == id;
        })
    }

    edit(l: LayoutObj): void {
        //todo: nothing
    }

    hapus(l: LayoutObj) {
        this.list = this.list.filter((item: LayoutObj) => {
            return item.id != l.id
        })
    }
}
export const layoutList: LayoutList = new LayoutList();
layoutList.tambah(new LayoutObj(0, 'root'))

