namespace value.ent {
    const daftar: IValue[] = [];

    export function buat(indukId: number): IValue {
        let hasil: IValue = {
            indukId: indukId,
            diedit: false,
            dipilih: false,
            id: ha.comp.Util.id(),
            nama: '',
            type: data.TY_VALUE,
            value: '0',
            valueType: 'angka',
        }

        daftar.push(hasil);

        return hasil;
    }
}