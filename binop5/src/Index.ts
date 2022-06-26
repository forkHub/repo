function init(): void {
	dataObj.load();

	let modul: IModul;
	modul = Modul.awal();

	if (!modul) {
		modul = Modul.buatModulObj('awal', 0);
	}

	dataObj.initHalaman();
	dataObj.halModul.attach(document.body);
	dataObj.halModul.tampil(modul);

	dataObj.simpan();
}

function test(): void {
	dataObj.load();
	arg.formArg.attach(document.body);
}

window.onload = () => {
	init();
}