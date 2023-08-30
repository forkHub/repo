export class Data {
    private static loaded = false;
    private static readonly db = 'ha.blockly.data';
    static readonly template = `eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJHcmFmaXMiLCJpZCI6Iis3eTNEWW1gdzMkTX1icXRodzF8IiwieCI6LTY0NSwieSI6LTExNSwiaW5wdXRzIjp7IndpZHRoIjp7InNoYWRvdyI6eyJ0eXBlIjoibWF0aF9udW1iZXIiLCJpZCI6InBsTz1pbzFRbHE5TmI9ZHNIdiE7IiwiZmllbGRzIjp7Ik5VTSI6MzIwfX19LCJoZWlnaHQiOnsic2hhZG93Ijp7InR5cGUiOiJtYXRoX251bWJlciIsImlkIjoidWZTT2tUNGNbVixudiE4LihCRmsiLCJmaWVsZHMiOnsiTlVNIjoyNDB9fX19LCJuZXh0Ijp7ImJsb2NrIjp7InR5cGUiOiJ2YXJpYWJsZXNfc2V0IiwiaWQiOiJGW19wXXV9eHd4OVRkWiV0Li10VSIsImZpZWxkcyI6eyJWQVIiOnsiaWQiOiJWPUh8P0gsNiNEcmFlOSEoIThkXSJ9fSwiaW5wdXRzIjp7IlZBTFVFIjp7ImJsb2NrIjp7InR5cGUiOiJoYS5iYmpzLlNwcml0ZS5Mb2FkU3ByaXRlIiwiaWQiOiI5TjVtQV5qJVdTVFVXMngxay1YOiIsImlucHV0cyI6eyJ1cmwiOnsic2hhZG93Ijp7InR5cGUiOiJ0ZXh0IiwiaWQiOiJCfCFfNFFbZTYsSXpZckI/P21zbCIsImZpZWxkcyI6eyJURVhUIjoiLi9pbWdzL2JveC5wbmcifX19fX19fX19fSx7InR5cGUiOiJwcm9jZWR1cmVzX2RlZm5vcmV0dXJuIiwiaWQiOiIhaC5XRj9iRnxvZ1kwN0ZYXjN0SCIsIngiOi0yNDIsInkiOi0xMDUsImljb25zIjp7ImNvbW1lbnQiOnsidGV4dCI6IkRlc2NyaWJlIHRoaXMgZnVuY3Rpb24uLi4iLCJwaW5uZWQiOmZhbHNlLCJoZWlnaHQiOjgwLCJ3aWR0aCI6MTYwfX0sImZpZWxkcyI6eyJOQU1FIjoidXBkYXRlIn0sImlucHV0cyI6eyJTVEFDSyI6eyJibG9jayI6eyJ0eXBlIjoiaGEuYmUuTWFpbi5CZXJzaWgiLCJpZCI6IkpFXi91bXJnR15maEJpPWx2PVRFIiwibmV4dCI6eyJibG9jayI6eyJ0eXBlIjoiaGEuYmJqcy5TcHJpdGUuRHJhd1Nwcml0ZV92MiIsImlkIjoifiN1dH47ZWxiIWsqYG1TR0dtNWUiLCJmaWVsZHMiOnsiaW1nIjp7ImlkIjoiVj1IfD9ILDYjRHJhZTkhKCE4ZF0ifX19fX19fX1dfSwidmFyaWFibGVzIjpbeyJuYW1lIjoiaW1nIiwiaWQiOiJWPUh8P0gsNiNEcmFlOSEoIThkXSJ9XX0=`;

    private static _data: TData;

    public static get data(): TData {
        this.load();
        return Data._data;
    }

    static default(): TData {
        return {
            files: [],
            activeFileId: '',
            fileTemp: null,
            share: false,
            editMode: EEditMode.none
        };
    }

    static load() {
        if (Data.loaded) return;

        try {
            console.group('load: ');
            let str = window.localStorage.getItem(this.db);
            let obj = JSON.parse(str);

            if (obj) {
                Data._data = obj;
                Data.loaded = true;
                console.log("load:", str);
                console.log("obj ", obj);
            }
            else {
                Data._data = this.default();
            }

        }
        catch (e) {
            Data._data = this.default();
            console.log('load error');
            console.warn(e);
            console.log(Data.data.files);
            console.log(Data);
        }
        finally {
            console.groupEnd();
        }

    }

    static baru(item: TFile): void {
        this.load();
        this.data.files.push(item);
    }

    static semuaFile(): TFile[] {
        this.load();
        console.log("semua file", Data.data.files);
        return Data.data.files;
    }

    static simpan() {
        try {
            console.group("persist data:");
            window.localStorage.setItem(this.db, JSON.stringify(this.data));
            console.groupEnd();
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

    static getFileById(id: string): TFile {
        let hsl: TFile;

        this.load();

        this.data.files.forEach((item) => {
            if (item.id == id) {
                hsl = item;
            }
        })

        if (!hsl) {
            console.warn('file not found, id: ' + id);
        }

        return hsl;
    }

}

export type TFile = {
    id: string
    nama: string
    data: string
    data64: string
    diedit: boolean
}

export enum EEditMode {
    share = 'share',
    id = 'id',
    none = ''
}

export type TData = {
    files: TFile[]
    editMode: EEditMode
    activeFileId: string

    //depecrated
    share: boolean
    fileTemp: TFile
}