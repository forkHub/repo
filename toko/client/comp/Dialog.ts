import { BaseComponent } from "./BaseComponent.js";

class Dialog extends BaseComponent {
	constructor() {
		super();
		this._template = `
			<div class='comp dialog'>
				<div class='box'>
					<p class='deskripsi'>Contoh dialog </p>
					<button class="btn btn-primary ok">OK</button>
				</div>
			</div>
			`;
		this.build();
	}

	init(): void {
		this.detach();
	}

	tampil(pesan: string = '', def: boolean = true): void {
		this.p.innerHTML = pesan;

		if (def) {
			this.okTbl.onclick = () => {
				this.detach();
			}
		}

		this.attach(document.body);
		this.okTbl.focus();
		this._elHtml.style.display = 'block';

	}

	get okTbl(): HTMLButtonElement {
		return this.getEl('button.ok') as HTMLButtonElement;
	}

	get p(): HTMLParagraphElement {
		return this.getEl('p') as HTMLParagraphElement;
	}
}

export var dialog: Dialog = new Dialog();