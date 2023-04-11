class Variable {
    static readonly daftar: IVar[] = [];

    static nama(id: number): string {
        let obj: IVar;

        obj = this.get(id);

        return obj.nama;
    }

    static getByIndukId(id: number): IVar[] {
        let hasil: IVar[] = [];

        for (let i: number = 0; i < this.daftar.length; i++) {
            if (this.daftar[i].indukId == id) {
                hasil.push(this.daftar[i]);
            }
        }

        return hasil;
    }

    static get(id: number): IVar {

        for (let i: number = 0; i < this.daftar.length; i++) {
            if (this.daftar[i].id == id) {
                return this.daftar[i];
            }
        }

        throw Error('id tidak ketemu: ' + id);
    }

    static buatVarObj(nama: string, indukId: number): IVar {
        let hasil: IVar;

        hasil = {
            id: Id.id,
            nama: nama,
            indukId: indukId,
            type: TY_VARIABLE,
            value: '',
            ket: ''
        }

        this.daftar.push(hasil);
        dataObj.simpan();

        //validasi
        this.get(hasil.id);
        this.nama(hasil.id);

        return hasil;
    }

    static terj(obj: IVar): string {
        return "let " + obj.nama + "= ''";
    }



}