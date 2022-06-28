class Modul {
    private static readonly _daftar: IModul[] = [];

    static get daftar(): IModul[] {
        return this._daftar.slice();
    }

    static buatModulObj(nama: string, indukId: number): IModul {
        let modul: IModul;

        modul = {
            id: Id.id,
            indukId: indukId,
            nama: nama,
            type: TY_MODUL,
            fungAr: [],
            modulAr: [],
            varAr: [],
            ket: ''
        }

        this._daftar.push(modul);
        dataObj.simpan();
        return modul;
    }

    static getModul(id: number): IModul {
        for (let i: number = 0; i < this._daftar.length; i++) {
            let item: IModul = this._daftar[i];
            if (item.id == id) return item;
        }

        throw Error('id ' + id);
    }

    static getAwal(): IModul {
        for (let i: number = 0; i < this._daftar.length; i++) {
            let item: IModul = this._daftar[i];
            if (item.indukId == 0) return item;
        }

        return null;
    }

    static terj(modul: IModul): string {
        let hasil: string = '';

        //modul
        modul.modulAr.forEach((id: number) => {
            hasil += Modul.terj(Modul.getModul(id));
        })

        //var
        modul.varAr.forEach((id: number) => {
            let item: IVar = Variable.getVar(id);
            hasil += Variable.terj(item);
            hasil += "\n";
        });

        //fung dek
        modul.fungAr.forEach((id: number) => {
            let item: IDekFungsi = DekFungsi.get(id);
            hasil += DekFungsi.terj(item);
            hasil += "\n";
        })

        return hasil;
    }

    static hapus(id: number): void {
        for (let i: number = 0; i < Modul._daftar.length; i++) {
            if (Modul._daftar[i].id == id) {
                Modul._daftar.splice(i, 1);
                dataObj.simpan();
                break;
            }
        }

        throw Error('id: ' + id);
    }

    static muat(muatObj: ISimpan): void {
        while (Modul._daftar.length > 0) {
            Modul._daftar.pop();
        }

        muatObj.modul.forEach((item: IModul) => {
            Modul._daftar.push({
                id: item.id,
                indukId: item.indukId,
                nama: item.nama,
                type: item.type,
                fungAr: item.fungAr,
                modulAr: item.modulAr,
                varAr: item.varAr,
                ket: item.ket
            })
        })
    }
}