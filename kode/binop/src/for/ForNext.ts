class ForNext {

    static buat(indukId: number): IFor {
        let forObj: IFor;

        forObj = {
            id: Id.id,
            indukId: indukId,
            ket: '',
            nama: '',
            toRef: 0,
            type: TY_STMT,
            stmtType: STMT_FOR,
            varRef: 0
        }

        let varIsi: IVarIsi = VarIsi.buatDef(forObj.id)
        forObj.varRef = varIsi.id;

        let exp: IExp = Exp.buatDef(forObj.id);
        forObj.toRef = exp.id;

        Stmt.daftar.push(forObj);

        this.validate;

        return forObj;
    }

    static validate(obj: IFor): void {
        if (VarIsi.get(obj.varRef).indukId != obj.id) {
            throw Error('');
        };


        if (Exp.get(obj.toRef).indukId != obj.id) {
            throw Error('');
        };
    }

    static hapus(id: number): void {
        dataObj.hapusId(id);
    }

}