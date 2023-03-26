"use strict";
class PilihVariableItem extends ha.comp.BaseComponent {
    constructor(arg, variable) {
        super();
        this._template = `
			<div class='item-var'>
				<span class='nama'></span>
			</div>
		`;
        this.build();
        this.nama.innerText = variable.nama;
        this._elHtml.onclick = (e) => {
            e.stopPropagation();
            console.log('pilih variable: ');
            console.log(variable);
            arg.value = variable.id + '';
            this._finish();
        };
    }
    get finish() {
        return this._finish;
    }
    set finish(value) {
        this._finish = value;
    }
    get nama() {
        return this.getEl('span.nama');
    }
}
class PilihVariableView extends ha.comp.BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='pilih variable'>
				<div class='judul'>Pilih Variable</div>
				<div class='daftar'>
				</div>
				<div>
					<button class='batal'>batal</button>
				</div>
			</div>
		`;
        this.build();
    }
    get daftar() {
        return this.getEl('div.daftar');
    }
    get batalTbl() {
        return this.getEl('button.batal');
    }
    get judul() {
        return this.getEl('div.judul');
    }
}
class PilihVariable {
    constructor() {
        this.view = new PilihVariableView();
    }
    get finish() {
        return this._finish;
    }
    set finish(value) {
        this._finish = value;
    }
    tampil(arg) {
        data.variableAr.forEach((item) => {
            let view;
            view = new PilihVariableItem(arg, item);
            view.finish = () => {
                this._finish();
            };
            view.attach(this.view.daftar);
            this.view.attach(document.body);
        });
    }
}
const pilihVariable = new PilihVariable();
