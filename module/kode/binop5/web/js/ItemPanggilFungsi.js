"use strict";
class PanggilFungsi extends ha.comp.BaseComponent {
    constructor() {
        super();
        this.paramAR = [];
        this._template = `
			<div class='panggil-fungsi'>
				<div class='nama'></div>
				<div class='arg'></div>
			</div>
		`;
        this.build();
        this.populateParam();
    }
    get item() {
        return this._item;
    }
    set item(value) {
        this._item = value;
    }
    get fungsi() {
        return this._fungsi;
    }
    set fungsi(value) {
        this._fungsi = value;
    }
    renderParam() {
        this.paramAR.forEach(() => {
        });
    }
    populateParam() {
        while (this.paramAR.length > 0) {
            this.paramAR.pop();
        }
        data.paramAr.forEach((item) => {
            if (item.indukId == this._item.id) {
                this.paramAR.push(item);
            }
        });
    }
}
