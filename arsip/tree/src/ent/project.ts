import { ent } from "./ent.js";
import { FolderObj, IFolder } from "./folder.js";

export interface IProject {
    nama: string;
    data: IFolder;
}

export class ProjectObj implements IProject {
    private _nama: string = '';
    public get nama(): string {
        return this._nama;
    }
    public set nama(value: string) {
        this._nama = value;
    }
    private _data: FolderObj = new FolderObj();
    public get data(): FolderObj {
        return this._data;
    }
    public set data(value: FolderObj) {
        this._data = value;
    }
}

class Data {
    private _aktif: ProjectObj;
    private _dipilih: ProjectObj;

    public get dipilih(): ProjectObj {
        return this._dipilih;
    }
    public set dipilih(value: ProjectObj) {
        this._dipilih = value;
    }

    public get aktif(): ProjectObj {
        return this._aktif;
    }
    public set aktif(value: ProjectObj) {
        this._aktif = value;
    }

}

export class Project {
    readonly list: ProjectObj[] = [];
    readonly data = new Data();


    simpan() {
        try {
            let str = JSON.stringify(this.p2Objs(this.list));
            window.localStorage.setItem('ha.folder', str);
        }
        catch (e) {
            console.warn(e);
        }
    }

    muat() {
        try {
            while (this.list.length > 0) {
                this.list.pop();
            }

            let str = window.localStorage.getItem('ha.folder');
            let obj: IProject[] = JSON.parse(str);

            obj.forEach((item) => {
                this.list.push(this.fromObj(item));
            })
        }
        catch (e) {
            console.warn(e);
        }
    }

    p2Objs(p: ProjectObj[]): IProject[] {
        let hasil: IProject[] = [];

        p.forEach((item) => {
            hasil.push(this.p2Obj(item));
        })

        return hasil;
    }

    fromObj(p: IProject): ProjectObj {
        let h = new ProjectObj();

        h.nama = p.nama;
        h.data = ent.folder.fromObj(p.data);

        return h;
    }

    p2Obj(p: ProjectObj): IProject {
        return {
            nama: p.nama,
            data: ent.folder.toObj(p.data)
        }
    }

    buka(p: ProjectObj) {
        this.data.aktif = p;
    }

    buat(nama: string): ProjectObj {
        let h = new ProjectObj();

        h.nama = nama;
        h.data.nama = 'root';

        this.list.push(h);

        return h;
    }
}

// export const project = new Project();