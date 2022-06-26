function init(): void {
	dataObj.load();

	dataObj.initHalaman();
	dataObj.halModul.attach(document.body);

	//render 
	Variable.daftar.forEach((item: IVar) => {
		if (item.indukId == 0) {
			dataObj.halModul.renderVar(item);
		}
	});

	dataObj.modulAr.forEach((item: IModul) => {
		dataObj.halModul.renderModul(item);
	});

	dataObj.dekFungsiAr.forEach((item: IDekFungsi) => {
		dataObj.halModul.renderDekFungsi(item);
	})
}

function test(): void {
	dataObj.load();
	arg.formArg.attach(document.body);
}

window.onload = () => {
	// test();
	init();

}