class Modul {

    static get daftar(): IModul[] {
        let hasil: IModul[];

        hasil = dataObj.getByType(TY_MODUL) as IModul[];

        return hasil;
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

        dataObj.push(modul);
        dataObj.simpan();
        return modul;
    }

    static getModul(id: number): IModul {
        let hasil: IModul;

        hasil = dataObj.getById(id) as IModul;

        if (hasil.type != TY_MODUL) {
            console.log(hasil);
            throw Error('invalid modul, id: ' + id);
        }

        return hasil;

    }

    static getAwal(): IModul {
        let hasil: IModul;

        hasil = dataObj.getByIndukId(0) as IModul;

        if (hasil.type != TY_MODUL) {
            console.log(hasil);
            throw Error('get awal bukan modul');
        }

        return hasil;
    }

    static terj(modul: IModul): string {
        let hasil: string = '';

        //modul
        modul.modulAr.forEach((id: number) => {
            hasil += Modul.terj(Modul.getModul(id));
        })

        //var
        modul.varAr.forEach((id: number) => {
            let item: IVar = Variable.get(id);
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
        dataObj.hapusId(id);
    }

    static muat(muatObj: ISimpan): void {
        muatObj;
        //TODO: belum selesai
    }
}