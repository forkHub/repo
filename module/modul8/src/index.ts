//operation
function tambah() {
    let str = window.prompt("nama:", "");

    if (str) {
        let obj = ModulService.tambah(str, Modul.dipilih);
        if (Modul.dipilih <= 0) {
            Modul.dipilih = obj.id;
            pilih(obj.id);
        }
        ModulView.tambah(obj);
        ModulService.simpan();
    }
    else {
        Dialog.open('nama invalid');
    }
}

function edit() {
    if (Modul.dipilih <= 0) {
        Dialog.open('tidak ada modul dipilih');
        return;
    }

    let str = window.prompt('nama:');

    if (str) {
        ModulService.baca(Modul.dipilih).then((m) => {
            m.nama = str;
            ModulView.update(m);
        }).catch((e) => {
            Dialog.open(e.message);
        });
    }
}

function hapus() {
    console.group('hapus');
    console.log('modul dipilih', Modul.dipilih);
    console.groupEnd();

    if (Modul.dipilih <= 0) {
        Dialog.open("tidak ada modul dipilih");
        return;
    }

    let c = window.confirm('Hapus?');
    if (c) {

        ModulService.hapus(Modul.dipilih);
        ModulView.hapus(Modul.dipilih);
        Modul.dipilih = -1;
        ModulService.simpan();
    }
}

function pilih(id: number) {
    if (Modul.dipilih > 0) {
        ModulView.baca(Modul.dipilih).classList.remove('dipilih');
    }
    Modul.dipilih = id
    ModulView.baca(Modul.dipilih).classList.add('dipilih');
}

function buka() {
    if (Modul.dipilih <= 0) {
        Dialog.open('tidak ada modul dipilih');
        return;
    }

    window.location.href = `./index.html?id=${Modul.dipilih}`;
}

ModulService.init();
ModulView.init();

let id = getQuery("id") || "";
if (getQuery("id") != "") {
    ModulView.refresh(ModulService.getByIndukId(0));
}
else {
    ModulView.refresh(ModulService.getByIndukId(parseInt(id)));
}