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

    export function validateNama(nama: string): boolean {
        nama; //TODO:
        return true;
    }

    export function simpan(): IValue[] {
        let ar: IValue[] = [];

        daftar.forEach((item: IValue) => {
            let obj: IValue = {
                dipilih: false,
                diedit: false,
                id: item.id,
                indukId: item.indukId,
                nama: item.nama,
                type: item.type,
                valueType: item.valueType,
                value: item.value
            }
            ar.push(obj);
        });

        return ar;
    }

    export function muat(obj: IValue[]): void {
        while (daftar.length > 0) {
            daftar.pop();
        }

        obj.forEach((item: IValue) => {
            daftar.push(item);
        });
    }
}