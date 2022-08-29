class If {
    static buat(indukId: number): IIf {
        let hasil: IIf;

        hasil = {
            expId: 0,
            stmtAr: [],
            id: Id.id,
            indukId: indukId,
            ket: '',
            nama: '',
            type: TY_IF
        }

        hasil.expId = Exp.buatDef(hasil.id).id;

        return hasil;
    }
}