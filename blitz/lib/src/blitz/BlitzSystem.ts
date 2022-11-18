///<reference path="../ha/blitz/Main.ts"/>
///<reference path="../ha/blitz/Image.ts"/>

const Jeda = async (m: number = 0): Promise<void> => {
	return new Promise((resolve, _reject) => {
		setTimeout(() => {
			resolve();
		}, m);
	})
}

const FPS = (n: number) => {
	ha_blitz.Main.fps = Math.floor(1000 / n);
	if (n >= 60) {
		ha_blitz.Main.fps = 0;
	}
}

//TODO: dihapus
//TODO: kemungkinan diganti buat nyesuain sama blitz
const Dim = (...args: any[]): any[] => {

	if (0 == args.length) {
		return [];
	}

	else if (1 == args.length) {
		let hasil: any[] = [];
		for (let i: number = 0; i < args[0]; i++) {
			hasil[i] = {}
		}
		return hasil;
	}

	else if (2 == args.length) {
		if (typeof args[1] == 'number') {
			let hasil: any[] = [];
			for (let i: number = 0; i < args[0]; i++) {
				hasil[i] = [];
				for (let j: number = 0; j < args[1]; j++) {
					hasil[i][j] = {}
				}
			}

			return hasil;
		}
		else if (typeof args[1] == 'function') {
			let hasil: any[] = [];
			for (let i: number = 0; i < args[0]; i++) {
				hasil[i] = {}
				args[1](hasil[i]);
			}
			return hasil;
		}
		else if (typeof args[1] == 'object') {
			let hasil: any[] = [];
			for (let i: number = 0; i < args[0]; i++) {
				try {
					hasil[i] = JSON.parse(JSON.stringify(args[1]));
				}
				catch (e) {
					console.error(e);
					hasil[i] = {}
				}
			}
			return hasil;
		}
		else {
			throw new Error('second argument is invalid, expected number or function or object');
		}
	}

	else if (3 == args.length) {

		if (typeof args[2] == 'function') {

			let hasil: any[] = [];
			for (let i: number = 0; i < args[0]; i++) {
				hasil[i] = [];
				for (let j: number = 0; j < args[1]; j++) {
					hasil[i][j] = {}
					args[2](hasil[i][j])
				}
			}

			return hasil;
		}
		else if (typeof args[2] == 'object') {

			let hasil: any[] = [];
			for (let i: number = 0; i < args[0]; i++) {
				hasil[i] = [];
				for (let j: number = 0; j < args[1]; j++) {
					hasil[i][j] = JSON.parse(JSON.stringify(args[2]));
				}
			}

			return hasil;
		}
		else {
			throw Error('expecting third argument is a function or object');
		}

	}
	else {
		throw Error('arguments invalid, expected max arguments: 3');
	}
}

const Millisecs = (): number => {
	return Date.now();
}
