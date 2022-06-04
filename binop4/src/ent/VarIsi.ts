namespace variable.isi.ent {
    const daftar: IVarIsi[] = [];

    export function buat(indukId: number): IVarIsi {
        let hasil: IVarIsi;

        hasil = {
            diedit: false,
            dipilih: false,
            id: ha.comp.Util.id(),
            indukId: indukId,
            nama: '',
            stmtType: data.STMT_VAR_ISI,
            type: data.TY_STMT
        }

        daftar.push(hasil);



        return hasil;
    }
}