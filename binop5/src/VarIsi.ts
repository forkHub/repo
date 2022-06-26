class VarIsi {
    // readonly daftar: IVarIsi[] = [];

    static varRef(obj: IVarIsi, value: number) {
        ha.comp.Util.stackTrace();
        obj.varId = value;
    }

    static buatVarIsi(indukId: number): IVarIsi {
        let obj: IVarIsi;

        //buat obj
        obj = {
            id: Id.id,
            indukId: indukId,
            nama: '',
            prevIdx: 0,
            varId: -1,
            expId: -1,
            stmtType: STMT_VAR_ISI,
            type: TY_STMT,
            expTipe: ARG_VALUE,
            expValue: '0'
        }

        dataObj.stmtAr.push(obj);
        dataObj.simpan();

        return obj;
    }

    static terj(obj: IVarIsi): string {
        let hasil: string = Variable.nama(obj.varId) + " = ";

        if (obj.expTipe == ARG_REF) {
            hasil += Variable.nama(obj.expId);
        }
        else if (obj.expTipe == ARG_VALUE) {
            hasil += obj.expValue;
        }
        else {
            throw Error('');
        }

        return hasil;
    }

}