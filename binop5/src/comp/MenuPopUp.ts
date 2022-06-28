namespace ha.comp {
	export class MenuPopup {
		readonly view: View = new View();

		constructor() {

		}

		destroy(): void {
			this.view.destroy();
		}

		buatTombol2(t: ITombol[]): void {
			t.forEach((item: ITombol) => {
				this.buatTombol(item);
			})
		}

		buatTombol(t: ITombol): void {
			let button: HTMLButtonElement = document.createElement('button');
			button.classList.add("btn");
			button.classList.add("btn-primary");
			button.style.display = 'block';
			button.style.margin = 'auto';
			button.style.marginBottom = '8px';
			button.textContent = t.label;
			button.onclick = (e: MouseEvent) => {
				e.stopPropagation();
				this.view.detach();
				t.f();
			}
			this.view.box.appendChild(button);
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
				<div class='menu-popup' style="position:fixed; top:0px; left:0px; right:0px; bottom:0px; z-index:1000; background-color: rgba(0,0,0,.3)">
					<div class='box cont' style="position:fixed; bottom:0px; left:0px; right:0px">
					</div>
				</div>
			`;
			this.build();
			this.box.style.backgroundColor = 'white';
			this.box.style.padding = '8px';
			this.box.style.textAlign = 'center';

			this._elHtml.onclick = () => {
				this.detach();
			}
		}

		get box(): HTMLDivElement {
			return this.getEl('div.box.cont') as HTMLDivElement;
		}
	}

}