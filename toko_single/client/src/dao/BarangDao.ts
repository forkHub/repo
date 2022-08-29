class BarangDao {
    static readonly table: string = "ha.toko_single.barang";

    private daftar: IBarang[] = [];
    private _onPush: (id: number) => void;

    public get onPush(): (id: number) => void {
        return this._onPush;
    }
    public set onPush(value: (id: number) => void) {
        this._onPush = value;
    }

    async push(barang: IBarang): Promise<void> {
        this.daftar.push(barang);

        await this.simpan();

        setTimeout(() => {
            this.onPush(barang.id);
        }, 0);
    }

    async reset(): Promise<void> {
        this.daftar = [];
        await this.simpan();
    }

    async load(): Promise<void> {
        let str: string;
        let barangAr: IBarang[];

        try {
            str = window.localStorage.getItem(BarangDao.table);
            // console.log(str);

            barangAr = JSON.parse(str);
            // console.log(barangAr);

            barangAr.forEach((item: IBarang) => {
                this.daftar.push(item);
                this._onPush(item.id);
            });
        }
        catch (e) {
            console.error(e);
        }

    }

    getById(id: number): IBarang {
        let hasil: IBarang;

        this.daftar.forEach((item: IBarang) => {
            if (item.id == id) {
                hasil = item;
            }
        })

        if (!hasil) {
            throw Error('tidak ketemu');
        }

        return hasil;
    }

    private toDbo(barang: IBarang): IBarang {
        return {
            id: barang.id,
            deskripsi: barang.deskripsi,
            harga: barang.harga,
            nama: barang.nama,
        }
    }

    private async simpan(): Promise<void> {
        let data: IBarang[] = [];

        this.daftar.forEach((barang: IBarang) => {
            data.push(this.toDbo(barang));
        });

        window.localStorage.setItem(BarangDao.table, JSON.stringify(data));
    }
}
export var barangDao: BarangDao = new BarangDao();