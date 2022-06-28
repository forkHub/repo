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
            varAr: [],
            ket: ''
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

    static getAwal(): IModul {
        for (let i: number = 0; i < this.daftar.length; i++) {
            let item: IModul = this.daftar[i];
            if (item.indukId == 0) return item;
        }

        return null;
    }

    static terj(modul: IModul): string {
        let hasil: string = '';

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
}