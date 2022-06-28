class Stmt {
    static readonly daftar: IStmt[] = [];

    static get(id: number): IStmt {

        for (let i: number = 0; i < this.daftar.length; i++) {
            let item: IStmt = this.daftar[i];
            if (item.id == id) return item;
        }

        throw Error('');
    }

    static muat(muatObj: ISimpan): void {
        while (this.daftar.length > 0) {
            this.daftar.pop();
        }

        VarIsi.muat(muatObj);
    }
}