function init(): void {
	Path.view.attach(document.body);
	dataObj.load();

	let modul: IModul;
	modul = Modul.getAwal();

	if (!modul) {
		modul = Modul.buatModulObj('awal', 0);
		dataObj.simpan();
	}

	dataObj.initHalaman();
	dataObj.halModul.attach(document.body);
	dataObj.halModul.tampil(modul);
}

function test(): void {
	// dataObj.load();
	window.localStorage.clear();
	let expForm: ExpForm = new ExpForm();
	let expObj: IExp;

	expObj = exp.buat(0, true);
	expForm.tampil(() => {
		console.log('exp form selesai');
	}, document.body, [
		ARG_VALUE,
		ARG_BINOP,
		ARG_REF_VAR,
		ARG_REF_FUNGSI
	], expObj);
	// expForm.attach(document.body);
}

window.onload = () => {
	// init();
	test();
}