class Data {
    static simpan() {
        console.group('simpan');
        window.localStorage.setItem(this.nama, JSON.stringify(this.data));
        console.groupEnd();
    }
    static kosong() {
        while (this.data.length > 0) {
            this.data.pop();
        }
    }
    static load() {
        try {
            let dataStr = window.localStorage.getItem(this.nama);
            this.kosong();
            if (dataStr != null) {
                let obj = JSON.parse(dataStr);
                obj.forEach((item) => {
                    this.data.push(item);
                });
            }
        }
        catch (e) {
            console.error(e);
            ha.comp.dialog.tampil(e);
        }
    }
}
Data.nama = 'ha.binop';
Data.data = [];
