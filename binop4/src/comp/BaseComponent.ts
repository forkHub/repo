namespace ha.comp {

	export function createComponent(template: string): BaseComponent {
		let comp: BaseComponent = new BaseComponent();
		comp.template = template;
		comp.build();

		return comp;
	}

	export class BaseComponent {
		protected _template: string = '';
		protected _elHtml: HTMLElement | null = document.createElement('div');
		protected _parent: HTMLElement;

		public get template(): string {
			return this._template;
		}
		public set template(value: string) {
			this._template = value;
		}

		async loadTemplate(f: string): Promise<string> {
			let http: XMLHttpRequest = await Util.Ajax('get', f, '');

			if (200 == http.status) {
				return http.responseText;
			}
			else {
				throw new Error(http.responseText);
			}
		}

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

			if (!this._elHtml) {
				console.log(div);
				console.log(this._template);
				throw new Error('');
			}

			this.onBuild();
		}

		getTemplate(query: string): HTMLElement {
			try {
				let template: DocumentFragment = document.body.querySelector('template').content;
				return template.querySelector(query).cloneNode(true) as HTMLElement;
			} catch (e) {
				console.log('template:' + query);
				throw Error(e);
			}
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
}
