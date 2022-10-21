namespace ha.parse {

	export function pushCadangan(kata: string[]) {
		kata.forEach((item: string) => {
			ha.parse.parser.kataCadangan.push(item);
		})
	}

	export async function load(file: string): Promise<string> {
		return await ha.comp.Util.Ajax2('get', file, '');
	}

	let debugStatus: boolean;

	export function debugOn() {
		debugStatus = true;
	}

	export function debugOff() {
		debugStatus = false;
	}

	export function debugLog(msg: any, status: boolean = false) {
		if (debugStatus || status) {
			console.log(msg);
		}
	}

	export function debugGroupCollapsed(msg: string, status: boolean = false) {
		if (debugStatus || status) {
			console.groupCollapsed(msg);
		}
	}

	export function debugGroup(msg: string, status: boolean = false) {
		if (debugStatus || status) {
			console.group(msg);
		}
	}


	export function debugGroupEnd(status: boolean = false) {
		if (debugStatus || status) {
			console.groupEnd();
		}
	}

	export function renderToken(token: IToken[]): string {
		let hasil: string = '';

		token.forEach((item: IToken) => {
			hasil += item.nama;
			hasil += ' ';
		})

		return hasil;
	}

	export function pushRumus(rumusAr: IRumus[]) {
		console.log('rumusAr ' + rumusAr);

		rumusAr.forEach((item: IRumus) => {
			grammarAr.push(item);
		})
	}
}
