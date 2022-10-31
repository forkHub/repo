namespace pecahan02 {
	export function mulai(): void {
		document.body.querySelector('div.progress-cont').appendChild(pg.el);

		for (let i: number = 0; i < jmlSoal; i++) {
			soals.push(buatSoal(false, true));
		}

		renderSoal(soals[0]);
		pg.progress(0);
	}

}

pecahan02.mulai();