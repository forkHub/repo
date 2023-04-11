class VarRef {
    static hapus(id: number): void {
        dataObj.hapusId(id);
    }

    static buat(indukId: number): IVarRef {
        let hasil: IVarRef;

        hasil = {
            id: Id.id,
            indukId: indukId,
            ket: '',
            nama: '',
            refId: 0,
            type: TY_VAR_REF
        }

        dataObj.push(hasil);

        return hasil;
    }

    static get(id: number): IVarRef {
        let hasil: IVarRef;

        hasil = dataObj.getById(id) as IVarRef;

        if (hasil.type != TY_VAR_REF) throw Error('');

        return hasil;
    }
}