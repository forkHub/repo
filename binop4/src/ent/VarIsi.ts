namespace variable.isi.ent {

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

        stmt.ent.daftar.push(hasil);

        return hasil;
    }

    /**
     * simpan dan muat ikut ke stmt
     */


}