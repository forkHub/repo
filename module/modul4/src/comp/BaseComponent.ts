export class BaseComponent {
	protected _template: string = '';
	protected _elHtml: HTMLElement | null = document.createElement('div');
	protected _parent: HTMLElement;

	public destroy(): void {
		this.detach();
		while (this._elHtml.firstChild) {
			this._elHtml.removeChild(this._elHtml.firstChild);
		}
		this._elHtml = null;
	}

	attach(parent: HTMLElement): void {
		parent.appendChild(this._elHtml);
		this._parent = parent;
	}

	detach(): boolean {
		// console.log('loading detach');
		// console.log(this._elHtml.parentElement);
		if (this._elHtml.parentElement) {
			this._elHtml.parentElement.removeChild(this._elHtml);
			return true;
		}

		return false;
	}

	protected getEl(query: string): HTMLElement {
		let el: HTMLElement | null;

		el = this._elHtml.querySelector(query);

		if (el) {
			return el
		} else {
			console.log(this._elHtml);
			console.log(query);
			throw new Error('query not found ');
		}
	}

	protected build(temp: string = ''): void {
		let div: HTMLElement = document.createElement('div');
		let el: HTMLElement;

		if (temp && temp != '') {
			this._template = temp;
		}

		div.innerHTML = this._template;

		el = div.firstElementChild as HTMLElement;

		this._elHtml = el;

		if (!this._elHtml) {
			console.log(div);
			console.log(this._template);
			throw new Error('');
		}

	}

	protected getTemplate(query: string): HTMLElement {
		try {
			let template: DocumentFragment = document.body.querySelector('template').content;
			return template.querySelector(query).cloneNode(true) as HTMLElement;
		} catch (e) {
			console.log('template:' + query);
			throw Error(e);
		}
	}

	public get elHtml(): HTMLElement {
		return this._elHtml;
	}


}
