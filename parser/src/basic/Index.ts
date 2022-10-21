
namespace ha.parse.basic {

	export async function init(): Promise<void> {
		let file: string = await load('./data/test_js.vb');
		let barisAr: string[] = file.split('\n');

		for (let i: number = 0; i < barisAr.length; i++) {
			console.group('parse ' + barisAr[i]);

			while (token.length > 0) {
				token.pop();
			}

			await parser.pecah(barisAr[i]);

			await Grammar.check();
			console.log(token);

			console.groupEnd();

			if (token.length > 1) {
				throw Error('');
			}


		}



		window.localStorage.setItem('parse', JSON.stringify(token));

	}

	pushRumus(expToken);
	pushRumus(rumusKurung);
	pushRumus(rumusBinop);
	pushRumus(rumusArray);
	pushRumus(rumusLain);
	pushRumus(rumusStmt);

	pushCadangan(cadangan);

	binopOpr.forEach((item) => {
		parser.binopOpr.push(item);
	});

	init().then(() => {
		console.log('selesai');
		console.log(Terjemah.kedalaman);
	}).catch((e) => {
		console.log(e);
	})

}

