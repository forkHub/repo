class DekFungsi {
    // static readonly daftar: IDekFungsi[] = [];

    static buatParam(nama: string, indukId: number, param: IParam[]): IDekFungsi {
        let hasil: IDekFungsi;

        hasil = this.buat(nama, indukId);

        param.forEach((item: IParam) => {
            hasil.paramAr.push(item);
        })

        return hasil;
    }

    static buat(nama: string, indukId: number): IDekFungsi {
        let hasil: IDekFungsi;

        hasil = {
            id: Id.id,
            indukId: indukId,
            nama: nama,
            paramAr: [],
            type: TY_DEK_FUNGSI,
            stmtAr: [],
            varAr: [],
            ket: ''
        }

        // this.daftar.push(hasil);
        dataObj.push(hasil);
        dataObj.simpan();

        this.validasi(hasil);

        return hasil;
    }

    static get(id: number): IDekFungsi {
        let hasil: IDekFungsi;

        hasil = dataObj.getById(id) as IDekFungsi;

        //TODO: validate type
        if (hasil.type != TY_DEK_FUNGSI) {
            console.log(hasil);
            throw Error('invalid type');
        }


        return hasil;

    }

    static terj(item: IDekFungsi): string {
        let hasil: string = '';

        //dek
        hasil += 'function ' + item.nama;
        hasil += "(";

        //param
        //TODO:

        hasil += ") ";
        hasil += "{\n";

        //var
        item.varAr.forEach((id: number) => {
            hasil += Variable.terj(Variable.get(id)) + "\n";
        })

        //stmt
        // item.
        item.stmtAr.forEach((id: number) => {
            let stmt: IStmt;

            stmt = Stmt.get(id);

            if (stmt.stmtType == STMT_VAR_ISI) {
                hasil += VarIsi.terj(stmt as IVarIsi);
                hasil += "\n"
            }
            else {
                throw Error();
            }
        })


        hasil += "}\n";

        return hasil;
    }

    static validasi(item: IDekFungsi): void {
        //validasi variable
        let varAr: IVar[] = Variable.getByIndukId(item.id);

        //check jumlah sama
        if (varAr.length != item.varAr.length) {
            console.log(varAr);
            console.log(item.varAr);
            throw new Error('array tidak sama');
        }

        this.get(item.id);
    }

    static daftar(): IDekFungsi[] {
        let hasil: IDekFungsi[] = [];

        hasil = dataObj.getByType(TY_DEK_FUNGSI) as IDekFungsi[];

        //validate
        hasil.forEach((item: IDekFungsi) => {
            if (item.type != TY_DEK_FUNGSI) {
                console.log(item);
                throw Error('hasil invalid');
                // console.error('item')
            }
        })

        return hasil;
    }

}