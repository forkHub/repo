namespace stmt {
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

}