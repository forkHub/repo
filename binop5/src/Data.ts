class Data {
    readonly variableAr: IVar[] = [];
    readonly modulAr: IModul[] = [];
    readonly dekFungsiAr: IDekFungsi[] = [];

    private _halModul: HalModule;
    public get halModul(): HalModule {
        return this._halModul;
    }

    private _halFungsi: df.HalDeklarasiFungsi;
    public get halFungsi(): df.HalDeklarasiFungsi {
        return this._halFungsi;
    }

    buatHalaman(): void {
        this._halFungsi = new df.HalDeklarasiFungsi();
        this._halModul = new HalModule();
    }

    simpan(): void {
        let str: string = '';
        let simpan: ISimpan;

        simpan = {
            var: this.variableAr,
            dekFung: this.dekFungsiAr,
            exp: [],
            modul: this.modulAr,
            param: [],
            ref: [],
            stmt: [],
            value: []
        };

        str = JSON.stringify(simpan);

        window.localStorage.setItem('ha.binop', str);
    }

    load(): void {
        try {
            let str: string;
            str = window.localStorage.getItem('ha.binop');

            if (str) {
                let muatObj: ISimpan;
                muatObj = JSON.parse(str);

                //hapus data
                while (this.variableAr.length > 0) {
                    this.variableAr.pop();
                }

                while (this.modulAr.length > 0) {
                    this.modulAr.pop();
                }

                while (this.dekFungsiAr.length > 0) {
                    this.dekFungsiAr.pop();
                }

                //TODO: 

                //isi data
                muatObj.var.forEach((item: IVar) => {
                    this.variableAr.push({
                        id: item.id,
                        indukId: item.indukId,
                        nama: item.nama,
                        type: item.type
                    })
                })

                muatObj.modul.forEach((item: IModul) => {
                    this.modulAr.push({
                        id: item.id,
                        indukId: item.indukId,
                        nama: item.nama,
                        type: item.type
                    })
                })

                muatObj.dekFung.forEach((item: IDekFungsi) => {
                    this.dekFungsiAr.push({
                        id: item.id,
                        indukId: item.indukId,
                        nama: item.nama,
                        type: item.type
                    })
                })



            }
            else {

            }
        }
        catch (e) {
            ha.comp.dialog.tampil(e);
        }
    }
}
let data: Data = new Data();