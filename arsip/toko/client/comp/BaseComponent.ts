export class BaseComponent {
	protected _template: string = '';
	protected _elHtml: HTMLElement | null = document.createElement('div');
	protected _parent: HTMLElement;

	onRender(): void {

	}

	onAttach(): void {

	}

	onBuild(): void {

	}

	onDetach(): void {

	}

	mulai(...params: any[]): void {
		params;
	}

	destroy(): void {
		this.detach();
		while (this._elHtml.firstChild) {
			this._elHtml.removeChild(this._elHtml.firstChild);
		}
		this._elHtml = null;
	}

	attach(parent: HTMLElement): void {
		parent.appendChild(this._elHtml);
		this._parent = parent;
		this.onAttach();
	}

	detach(): boolean {
		// console.log('loading detach');
		// console.log(this._elHtml.parentElement);
		if (this._elHtml.parentElement) {
			this._elHtml.parentElement.removeChild(this._elHtml);
			this.onDetach();
			return true;
		}

		this.onDetach();
		return false;
	}

	show(el?: HTMLElement): void {
		if (!el) {
			el = this._elHtml;
		}

		el.style.display = 'block';
	}

	hide(el?: HTMLElement): void {
		if (!el) {
			el = this._elHtml;
		}

		el.style.display = 'none';
	}

	getEl(query: string): HTMLElement {
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

	build(): void {
		let div: HTMLElement = document.createElement('div');
		let el: HTMLElement;

		div.innerHTML = this._template;

		el = div.firstElementChild as HTMLElement;

		this._elHtml = el;

		if (!this._elHtml) throw new Error('');

		this.onBuild();
	}

	getTemplate(query: string): HTMLElement {
		let template: DocumentFragment = document.body.querySelector('template').content;
		return template.querySelector(query).cloneNode(true) as HTMLElement;
	}

	getElFromDoc(query: string): HTMLElement {
		let el: HTMLElement;
		el = document.querySelector(query);
		if (!el) throw new Error();
		return el;
	}

	public get elHtml(): HTMLElement {
		return this._elHtml;
	}


}