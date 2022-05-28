namespace hal {
    export function halaman(): HTMLDivElement {
        return ha.comp.Util.getEl('halaman') as HTMLDivElement;
    }

    export function variable(): HTMLDivElement {
        return ha.comp.Util.getEl('div.var') as HTMLDivElement;
    }

    //fungdek //TODO:

    export function menu(): HTMLDivElement {
        return ha.comp.Util.getEl('menu') as HTMLDivElement;
    }
}

async function init() {
    let modulObj: IModul;

    //buat modul
    modulObj = modul.buat('mulai', 0);
    modulObj.dipilih = true;
    modulObj.view.attach(hal.halaman());
    modulObj.view.elHtml.classList.add('dipilih');

    console.log(Date.now());
    await ha.comp.Util.delay(10);
    console.log(Date.now());

    modulObj = modul.buat('loop', 0);
    modulObj.view.attach(hal.halaman());

    menu.modul.mulai();
    menu.tambah.mulai();
}

window.onload = () => {
    init();
}