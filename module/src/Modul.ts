namespace ha.modul.modul {
    export function tambah(): void {
        let judul: string = window.prompt("judul:");

        //tambah item
        daftarModul.push({
            nama: judul,
            tipe: "modul",
            modul: "",
            // indukId: ""
        });

        //render ulang itemnya
        halModul.render();
    }

    export function hapus(): void {
        if (daftarModul.length <= 0) {
            console.log('item kosong');
            return;
        }

        let konfirm: boolean = window.confirm('hapus');

        if (konfirm) {

            //hapus data
            for (let i: number = 0; i < daftarModul.length; i++) {
                if (daftarModul[i] == sessionObj.modulDipilih) {
                    daftarModul.splice(i, 1);
                }
            }

            if (daftarModul.length > 0) {
                daftarModul[0].view.dipilih();
                sessionObj.modulDipilih = daftarModul[0];
            }
            else {
                sessionObj.modulDipilih = null;
            }

            //render ulang
            halModul.render();
        }
    }

    export function update(): void {
        if (!sessionObj.modulDipilih) return;

        let judul: string = window.prompt("judul:");

        (sessionObj.modulDipilih as IModul).view.judul.innerHTML = judul;
    }
}