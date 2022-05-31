namespace modul {
    export async function tampil() {
        const el: HTMLDivElement = ha.comp.Util.getTemplate('div.modul-cont div.hal-modul') as HTMLDivElement
        let modulObj: IModul;

        document.body.appendChild(el);

        //buat modul
        modulObj = modul.buat('mulai', 0);
        modulObj.dipilih = true;
        modulObj.view.attach(modul.hal.halaman());
        modulObj.view.elHtml.classList.add('dipilih');

        console.log(Date.now());
        await ha.comp.Util.delay(10);
        console.log(Date.now());

        modulObj = modul.buat('loop', 0);
        modulObj.view.attach(modul.hal.halaman());

        // menu.utama.mulai();
        // menu.tambah.mulai();
        // menu.sistem.mulai();
        // menu.param.mulai();

        // modul.menu.tambah.paramTbl().style.display = 'none';
        // modul.menu.tambah.stmtTbl().style.display = 'none';
    }
}

async function init(): Promise<void> {
    await modul.tampil();
    menu.mulai();
}

window.onload = () => {
    init();
}