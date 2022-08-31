class Param {
    // readonly daftar: IParam[] = [];

    buat(indukId: number, nama: string): IParam {
        let hasil: IParam;

        hasil = {
            id: Id.id,
            indukId: indukId,
            ket: '',
            nama: nama,
            type: TY_PARAM
        }

        dataObj.push(hasil);

        return hasil;
    }

}
const param: Param = new Param();