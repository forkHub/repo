class Modul {
    static readonly daftar: IModul[] = [];

    static buatModulObj(nama: string, indukId: number): IModul {
        let modul: IModul;

        modul = {
            id: Id.id,
            indukId: indukId,
            nama: nama,
            type: TY_MODUL,
            fungAr: [],
            modulAr: [],
            varAr: []
        }

        this.daftar.push(modul);
        dataObj.simpan();
        return modul;
    }

    static getModul(id: number): IModul {
        for (let i: number = 0; i < this.daftar.length; i++) {
            let item: IModul = this.daftar[i];
            if (item.id == id) return item;
        }

        throw Error('id ' + id);
    }

    static awal(): IModul {
        for (let i: number = 0; i < this.daftar.length; i++) {
            let item: IModul = this.daftar[i];
            if (item.indukId == 0) return item;
        }

        return null;
    }
}