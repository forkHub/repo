export class Data {
    private static loaded = false;
    private static readonly db = 'ha.blockly.data';

    private static readonly data: TData = {
        files: []
    };

    private static load() {
        if (Data.loaded) return;
        try {
            let str = window.localStorage.getItem(this.db);
            let obj = JSON.parse(str);
            Data.data.files = obj;
            Data.loaded = true;
            console.log("load:", str);
            console.log("obj ", obj);
        }
        catch (e) {
            Data.data.files = [];
            console.log('load error');
            console.warn(e);
            console.log(Data.data.files);
            console.log(Data);
        }
    }

    static baru(item: TFile): void {
        this.load();
        this.data.files.push(item);
    }

    static semua(): TFile[] {
        console.log("semua", Data.data);
        this.load();
        console.log("semua", Data.data);
        return Data.data.files;
    }

    static simpan() {
        try {
            window.localStorage.setItem(this.db, JSON.stringify(this.data.files));
        }
        catch (e) {
            console.warn(e);
        }
    }

    static hapus(id: string): void {
        for (let i = 0; i < this.data.files.length; i++) {
            let item = this.data.files[i];
            if (item.id == id) {
                console.log('item deleted:", item.id ' + id, "item:", item);
                this.data.files.slice(i, 1);
            }
        }
    }

}

export type TFile = {
    id: string
    nama: string
    data: string
}

export type TData = {
    files: TFile[]
}