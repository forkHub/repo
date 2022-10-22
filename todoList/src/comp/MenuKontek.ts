namespace ha.comp {
	export class MenuKontek {
		readonly view: View = new View();

		constructor() {

		}

		buatTombol(t: ITombol): void {
			let button: HTMLButtonElement = document.createElement('button');
			button.classList.add("btn");
			button.classList.add("btn-primary");
			button.style.display = 'inline-block';
			button.style.margin = 'auto';
			button.style.marginBottom = '8px';
			button.textContent = t.label;
			button.onclick = (e: MouseEvent) => {
				e.stopPropagation();
				this.view.detach();
				t.f();
			}
			this.view.elHtml.appendChild(button);
		}
	}

	export interface ITombol {
		label: string,
		f: () => void
	}

	class View extends BaseComponent {
		constructor() {
			super();
			this._template = `
				<div class='menu-context'>
				</div>
			`;
			this.build();
			this._elHtml.style.wordBreak = 'no-wrap'
		}
	}

}