function pushCadangan(kata: string[]) {
	kata.forEach((item: string) => {
		parser.kataCadangan.push(item);
	})
}

async function load(): Promise<string> {
	return await ha.comp.Util.Ajax2('get', './data/test.js', '');
}

let debugStatus: boolean;

function debugOn() {
	debugStatus = true;
}

function debugOff() {
	debugStatus = false;
}

function debugLog(msg: any, status: boolean = false) {
	if (debugStatus || status) {
		console.log(msg);
	}
}

function debugGroupCollapsed(msg: string, status: boolean = false) {
	if (debugStatus || status) {
		console.groupCollapsed(msg);
	}
}

function debugGroup(msg: string, status: boolean = false) {
	if (debugStatus || status) {
		console.group(msg);
	}
}


function debugGroupEnd(status: boolean = false) {
	if (debugStatus || status) {
		console.groupEnd();
	}
}

function renderToken(token: IToken[]): string {
	let hasil: string = '';

	token.forEach((item: IToken) => {
		hasil += item.nama;
		hasil += ' ';
	})

	return hasil;
}

function pushRumus(rumusAr: IRumus[]) {
	rumusAr.forEach((item: IRumus) => {
		grammarAr.push(item);
	})
}