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

    export function simpan(): IExp[] {
        let ar: IExp[] = [];

        daftar.forEach((item: IExp) => {
            let obj: IExp = {
                dipilih: false,
                diedit: false,
                id: item.id,
                indukId: item.indukId,
                nama: item.nama,
                type: item.type,
                // valueType: item.valueType,
                // value: item.value
            }
            ar.push(obj);
        });

        return ar;
    }

    export function muat(obj: IExp[]): void {
        while (daftar.length > 0) {
            daftar.pop();
        }

        obj.forEach((item: IExp) => {
            daftar.push(item);
        });
    }
}