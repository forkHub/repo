namespace exp.ent {
    const daftar: IExp[] = [];

    export function buat(indukId: number): IExp {
        let hasil: IExp;

        hasil = {
            diedit: false,
            dipilih: false,
            id: ha.comp.Util.id(),
            indukId: indukId,
            nama: '',
            type: data.TY_EXP
        }

        daftar.push(hasil);
        return hasil;
    }
}