async function init() {
    await md.halModul.init();
    md.Modul.tambahEvt.push(md.halModul);
    md.halModul.tombolWdh.appendChild(menuWdh);
}
let halWdh = ha.comp.Util.getEl('div.cont div.hal-cont');
let menuWdh = ha.comp.Util.getEl('div.cont div.menu-cont');
init().catch((e) => {
    ha.comp.dialog.tampil(e);
    console.error(e);
});
