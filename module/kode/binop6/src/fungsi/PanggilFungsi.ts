class PanggilFungsi {

    static nama(f: IPanggilFungsi): string {
        return DekFungsi.get(f.refId).nama;
    }

    // static paramNama(f: IPanggilFungsi, idx: number): string {
    //     let hasil: string;

    //     f.param.forEach((itemId: number, paramIdx: number) => {
    //         if (idx == paramIdx) {
    //             let expObj: IExp;

    //             expObj = Exp.get(itemId);
    //             hasil = Exp.getNama(expObj);
    //         }
    //     })

    //     return hasil;
    // }

    static ganti(f: IPanggilFungsi, refId: number): void {
        f.refId = refId;
        this.buildRef(f)
    }

    private static buildRef(f: IPanggilFungsi): void {
        let dekFung: IDekFungsi

        dekFung = DekFungsi.get(f.refId);

        f.param = [];
        dekFung.paramAr.forEach((item: IParam) => {
            let exp: IExp;

            item;

            exp = Exp.buatDef(0);
            f.param.push(exp.id);

            Exp.get(exp.id);
        });
    }

    static get(id: number): IPanggilFungsi {
        let hasil: IPanggilFungsi;

        hasil = dataObj.getById(id) as IPanggilFungsi;

        // dataObj.dataAr.forEach((item: IData) => {
        //     if (item.id == id) {
        //         hasil = item as IPanggilFungsi;
        //     }
        // })

        if (!hasil) {
            console.error('panggi fungsi tidak ketemu, id: ' + id);
        }

        if (hasil.type != TY_STMT) {
            console.log(hasil);
            throw Error('fungsi invalid, ty: ' + hasil.type);
        }

        if (hasil.stmtType != STMT_PANGGIL_FUNGSI) {
            console.log(hasil);
            throw Error('fungsi stmt type invalid,');
        }

        return hasil;
    }

    static buat(indukId: number, fung: IDekFungsi): IPanggilFungsi {
        let hasil: IPanggilFungsi;

        hasil = {
            id: Id.id,
            indukId: indukId,
            ket: '',
            nama: '',
            param: [],
            refId: fung.id,
            stmtType: STMT_PANGGIL_FUNGSI,
            type: TY_STMT,
        }

        this.buildRef(hasil);
        dataObj.push(hasil);

        //validasi
        PanggilFungsi.get(hasil.id);

        return hasil;
    }
}

// const panggilFungsi: PanggilFungsi = new PanggilFungsi();