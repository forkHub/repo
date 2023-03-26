async function init() {
    await md.init();
    await load();
}
async function load() {
    console.group('load data');
    Data.load();
    await md.load(Data.data);
    console.groupEnd();
}
function simpan() {
    try {
        Data.kosong();
        md.Modul.toDao(Data.data);
        Data.simpan();
    }
    catch (e) {
        ha.comp.dialog.tampil(e.stack);
    }
}
let halWdh = ha.comp.Util.getEl('div.cont div.hal-cont');
let menuWdh = ha.comp.Util.getEl('div.cont div.menu-cont');
init().catch((e) => {
    ha.comp.dialog.tampil(e.stack);
    console.error(e.stack);
});
