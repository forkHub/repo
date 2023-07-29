import { BaseComponent } from "./BaseComponent.js";

export class MenuPopup {
	private view: View = new View();

	constructor() {

	}

	tampil(tombol: ITombol[]): void {
		while (this.view.box.firstChild) {
			this.view.box.removeChild(this.view.box.firstChild);
		}

		tombol.forEach((item: ITombol) => {
			this.buatTombol(item);
		});
		this.view.attach(document.body);
	}

	buatClass(label: string): string {
		let hasil: string;

		hasil = label.toLowerCase();
		while (hasil.indexOf(' ') > -1) {
			hasil = hasil.replace(' ', '-');
		}

		return hasil;
	}

	private buatTombol(t: ITombol): void {
		let button: HTMLButtonElement = document.createElement('button');
		button.classList.add("btn");
		button.classList.add("btn-primary");
		button.classList.add("fontello");
		// button.classList.add(this.buatClass(t.label));
		button.style.display = 'block';
		button.style.margin = 'auto';
		button.style.marginBottom = '8px';
		button.innerHTML = `<span class='fontello'>${t.label}</span>`;
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
	f: Function
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

// export var menuPopup: MenuPopup = new MenuPopup();