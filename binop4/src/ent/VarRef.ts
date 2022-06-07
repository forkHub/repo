namespace variable.ref.ent {
    const daftar: IRef[] = [];

    //TODO:
    export function buat(indukId: number): IRef {
        let hasil: IRef;

        hasil = {
            diedit: false,
            dipilih: false,
            id: ha.comp.Util.id(),
            indukId: indukId,
            nama: '',
            type: data.TY_STMT,
            refId: 0
        }

        daftar.push(hasil);

        return hasil;
    }

    export function simpan(): IRef[] {
        let ar: IRef[] = [];

        daftar.forEach((item: IRef) => {
            let obj: IRef = {
                dipilih: false,
                diedit: false,
                id: item.id,
                indukId: item.indukId,
                nama: item.nama,
                type: item.type,
                refId: 0
            }
            ar.push(obj);
        });

        return ar;
    }

    export function muat(obj: IRef[]): void {
        while (daftar.length > 0) {
            daftar.pop();
        }

        obj.forEach((item: IRef) => {
            daftar.push(item);
        });
    }

}