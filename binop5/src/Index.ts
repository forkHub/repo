function init(): void {
	data.load();

	data.buatHalaman();
	data.halModul.attach(document.body);

	//render 
	data.variableAr.forEach((item: IVar) => {
		if (item.indukId == 0) {
			data.halModul.renderVar(item);
		}
	});

	data.modulAr.forEach((item: IModul) => {
		data.halModul.renderModul(item);
	});

	data.dekFungsiAr.forEach((item: IDekFungsi) => {
		data.halModul.renderDekFungsi(item);
	})
}

function test(): void {
	data.load();
	arg.formArg.attach(document.body);
}

window.onload = () => {
	// test();
	init();

}