async function init(): Promise<void> {
	await md.init();

	await load();
}

async function load(): Promise<void> {
	console.group('load data');
	Data.load();
	await md.load(Data.data);
	console.groupEnd();
}

function simpan(): void {
	try {
		Data.kosong();
		md.Modul.toDao(Data.data);
		Data.simpan();
	}
	catch (e) {
		ha.comp.dialog.tampil(e.stack);
	}
}

let halWdh: HTMLElement = ha.comp.Util.getEl('div.cont div.hal-cont');
let menuWdh: HTMLElement = ha.comp.Util.getEl('div.cont div.menu-cont');

init().catch((e) => {
	ha.comp.dialog.tampil(e.stack);
	console.error(e.stack);
})
