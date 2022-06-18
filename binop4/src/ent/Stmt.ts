namespace stmt.ent {
    export const daftar: IStmt[] = [];

    export function byIndukId(indukId: number): IStmt[] {
        let hasil: IStmt[] = [];
        for (let i: number = 0; i < daftar.length; i++) {
            if (daftar[i].indukId == indukId) {
                hasil.push(daftar[i]);
            }
        }
        return hasil;
    }

    export function simpan(): IStmt[] {
        let ar: IStmt[] = [];

        daftar.forEach((item: IStmt) => {
            let obj: IStmt = {
                dipilih: false,
                diedit: false,
                id: item.id,
                indukId: item.indukId,
                nama: item.nama,
                type: item.type,
                stmtType: item.stmtType
                // valueType: item.valueType,
                // value: item.value
            }
            ar.push(obj);
        });

        return ar;
    }

    export function muat(obj: IStmt[]): void {
        while (daftar.length > 0) {
            daftar.pop();
        }

        obj.forEach((item: IStmt) => {
            daftar.push(item);
        });
    }
}