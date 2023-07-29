import { BaseComponent2 } from "./BaseComponent2.js";
export class Dialog extends BaseComponent2 {
    constructor() {
        super();
        this._contentEl = null;
        this._okBtn = null;
        this._batalBtn = null;
        this._footerEl = null;
        this._hasil = 0;
        this._onClick = null;
        this._template = `
			<div class='ha-dialog'>
				<div class='box'>
					<div class='content'>
					</div>
					<div class='footer'>
						<button class='ok'>Ya</button>
						<button class='batal'>Tidak</button>
					</div>
				</div>
			</div>
		`;
        this.build();
        this._contentEl = this.getEl('div.content');
        this._okBtn = this.getEl('button.ok');
        this._batalBtn = this.getEl('button.batal');
        this._footerEl = this.getEl('div.footer');
        this._el.onclick = (e) => {
            e.stopPropagation();
            this.hide();
            console.log('dialog click');
            this._hasil = 1;
            if (this._onClick) {
                this._onClick();
                this._onClick = () => { };
            }
        };
        this._batalBtn.onclick = (e) => {
            e.stopPropagation();
            this.hide();
            this._hasil = 0;
            if (this._onClick) {
                this._onClick();
                this._onClick = () => { };
            }
        };
    }
    footerClear() {
        while (this._footerEl.childElementCount > 0) {
            this._footerEl.removeChild(this._footerEl.firstChild);
        }
    }
    setAsOK() {
        this.footerClear();
        this._footerEl.appendChild(this._okBtn);
        this._okBtn.innerText = 'OK';
    }
    setAsYN() {
        this.footerClear();
        this._footerEl.appendChild(this._okBtn);
        this._footerEl.appendChild(this._batalBtn);
        this._okBtn.innerText = 'Ya';
        this._batalBtn.innerText = 'Tidak';
    }
    get contentEl() {
        return this._contentEl;
    }
    get batalBtn() {
        return this._batalBtn;
    }
    get okBtn() {
        return this._okBtn;
    }
    get hasil() {
        return this._hasil;
    }
    get onClick() {
        return this._onClick;
    }
    set onClick(value) {
        this._onClick = value;
    }
    get teks() {
        return this._contentEl.innerHTML;
    }
    set teks(value) {
        this._contentEl.innerHTML = value;
    }
}
