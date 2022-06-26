class Variable {
    static readonly daftar: IVar[] = [];

    static nama(id: number): string {
        let hasil: string = '';

        Variable.daftar.forEach((item: IVar) => {
            if (item.id == id) hasil = item.nama;
        });

        if (hasil == '') {
            throw Error('id: ' + id);
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
}