
namespace ha.parse.basic {

	export async function init(): Promise<void> {
		let file: string = await load('./data/test_js.vb');
		let barisAr: string[] = file.split('\n');

		for (let i: number = 0; i < barisAr.length; i++) {

			console.group('parse ' + barisAr[i] + '|');

			if (barisAr[i].length > 0) {

				while (token.length > 0) {
					token.pop();
				}

				await parser.pecah(barisAr[i]);
				console.log(renderToken(token));

				if (token.length > 0) {
					tokenDataCtr = 0;
					await Grammar.check();

					console.log(renderToken(token));

					if (token.length > 1) {
						throw Error('');
					}

				}

			}

			console.groupEnd();

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

