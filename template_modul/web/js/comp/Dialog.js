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
    init() {
        this.detach();
    }
    tampil(pesan = '', def = true) {
        // ha.comp.Util.stackTrace();
        this.p.innerHTML = pesan;
        if (def) {
            this.okTbl.onclick = () => {
                this.detach();
            };
        }
        this.attach(document.body);
        this._elHtml.style.display = 'block';
    }
    get okTbl() {
        return this.getEl('button.ok');
    }
    get p() {
        return this.getEl('p');
    }
}
export var dialog = new Dialog();
