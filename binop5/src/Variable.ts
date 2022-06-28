class Variable {
    static readonly daftar: IVar[] = [];

    //TODO: ganti
    static nama(id: number): string {
        for (let i: number = 0; i < this.daftar.length; i++) {
            if (this.daftar[i].id == id) {
                return this.daftar[i].nama;
            }
        }

        throw Error('id: ' + id);
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

    static getVar(id: number): IVar {
        for (let i: number = 0; i < this.daftar.length; i++) {
            if (this.daftar[i].id == id) {
                return this.daftar[i];
            }
        }

        throw Error('id: ' + id);
    }

    static buatVarObj(nama: string, indukId: number): IVar {
        let hasil: IVar;

        hasil = {
            id: Id.id,
            nama: nama,
            indukId: indukId,
            type: TY_VARIABLE,
            nilai: '',
            ket: ''
        }

        this.daftar.push(hasil);
        dataObj.simpan();

        return hasil;
    }

    static terj(obj: IVar): string {
        return "let " + obj.nama + "= ''";
    }

}