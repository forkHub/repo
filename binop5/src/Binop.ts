class Binop {
    private static readonly daftar: IBinop[] = [];

    static baru(id: number, indukId: number): IBinop {
        let obj: IBinop = {
            exp1: '',
            exp1Tipe: '',
            exp2: '',
            exp2Tipe: '',
            id: id,
            indukId: indukId,
            ket: '',
            nama: '',
            type: TY_STMT,
        }

        this.daftar.push(obj);
        return obj;
    }

    //todo hapus, read, update
}