export class Util {

	static readonly sUserId: string = 'user_id';
	static readonly sLevel: string = 'level';
	static readonly sFilter: string = 'filter';
	static readonly storageId: string = 'xyz.hagarden.tugas';

	static html(str: string): HTMLElement {
		let div = document.createElement('div');
		div.innerHTML = str;
		let hasil = div.firstElementChild as HTMLElement;

		return hasil
	}

	static dialog(pesan: string): void {
		let str: string = `
            <dialog>
                <p>${pesan}</p>
                <form method="dialog">
                    <button class="ok">OK</button>
                </form>
            </dialog>
        `;
		let el = this.html(str) as HTMLDialogElement;
		document.body.appendChild(el);
		(el as any).showModal();
	}

	static getTemplate(query: string): HTMLElement {
		try {
			let template: DocumentFragment = document.body.querySelector('template').content;
			return template.querySelector(query).cloneNode(true) as HTMLElement;
		} catch (e) {
			console.log('template:' + query);
			throw Error(e);
		}
	}

	static getEl(query: string, parent: HTMLElement = null, err: boolean = true): HTMLElement {
		let el: HTMLElement;
		if (!parent) parent = document.body;

		el = parent.querySelector(query);

		if (el) {
			return el
		} else {
			console.log(parent);
			console.log(query);
			if (err) {
				throw new Error('query not found ');
			}
			else {
				return null;
			}
		}
	}

	static id(): number {
		return Date.now();
	}

	static async delay(m: number = 10): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve()
			}, m);
		})
	}

	static stackTrace(): void {
		try {
			throw Error('');
		}
		catch (e) {
			console.error(e);
		}
	}

	static bersihDiv(div: HTMLElement): void {
		while (div.firstChild) {
			div.removeChild(div.firstChild);
		}
	}

	//shared
	static kirimWa(teks: string): string {
		return "whatsapp://send?text=" + teks;
	}

	static getUrl(url: string, params: any[]): string {
		let urlHasil: string = url;

		console.group('get url');
		console.log('url: ' + url);
		console.log('params: ' + JSON.stringify(params));

		params.forEach((item: string) => {
			console.log('reg: ' + urlHasil.search(/\:[a-zA-Z_0-9]+/));
			urlHasil = urlHasil.replace(/\:[a-zA-Z_0-9]+/, item + '');
			console.log('item: ' + item);
			console.log('url: ' + urlHasil);
		});

		console.log('url hasil: ' + urlHasil);
		console.groupEnd();

		return urlHasil;
	}

	static build(temp: string): HTMLElement {
		let div: HTMLElement = document.createElement('div');
		let el: HTMLElement;

		div.innerHTML = temp;

		el = div.firstElementChild as HTMLElement;

		// this._elHtml = el;

		if (!el) {
			console.log(div);
			console.log(temp);
			throw new Error('');
		}

		return el;

	}

}

