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

window.onload = () => {
	// testVariIsi();
	// testVarIsiBinop();
	// testVarIsiFungsi();

	// testPanggilFungsi();
	// testExpEd();
	// testExpEd2();
	// testExpForm();
	// testBinop();
	// testPilihFungsi();

	// testObj();
	testFor();
}