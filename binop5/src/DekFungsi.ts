class DekFungsi {
    static readonly daftar: IDekFungsi[] = [];

    static buat(nama: string, indukId: number): IDekFungsi {
        let hasil: IDekFungsi;

        hasil = {
            id: Id.id,
            indukId: indukId,
            nama: nama,
            type: TY_DEK_FUNGSI,
            fungAr: [],
            varAr: []
        }

        this.daftar.push(hasil);
        dataObj.simpan();

        return hasil;
    }

    static get(id: number): IDekFungsi {
        for (let i: number = 0; i < this.daftar.length; i++) {
            let item: IDekFungsi = this.daftar[i];
            if (item.id == id) return item;
        }

        throw Error('');
    }
}