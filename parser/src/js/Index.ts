
namespace ha.parse.js {
	pushRumus(expToken);
	pushRumus(rumusKurung);
	pushRumus(rumusBinop);
	pushRumus(rumusArray);
	pushRumus(rumusLain);
	pushRumus(rumusStmt);

	pushCadangan(cadangan);
	pushCadangan(stmtOpr);

	binopOpr.forEach((item) => {
		parser.binopOpr.push(item);
	});

	export async function init(): Promise<void> {
		let cache: string = window.localStorage.getItem('parse');
		let file: string = await load('./data/test_js.vb');
		let reload: boolean = true;

		if (reload) {
			cache = '';
		}

		if (cache && cache != '') {

			let data: IToken[] = JSON.parse(cache);
			let terj: string = await Terjemah.terjemah(data[0]);
			console.log(terj);
		}
		else {

			await parser.pecah(file);
			console.log(renderToken(token));

			await Grammar.check();
			console.log(token);

			window.localStorage.setItem('parse', JSON.stringify(token));

			let terj: string = await Terjemah.terjemah(token[0]);
			console.log(terj);

		}

	}

	init().then(() => {
		console.log('selesai');
		console.log(Terjemah.kedalaman);
	}).catch((e) => {
		console.log(e);
	})
}

