"use strict";
var arg;
(function (arg) {
    class FormArg extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._elHtml = this.getTemplate('edit-arg');
            this.form.onsubmit = (e) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                    let tipe = this.tipe.value;
                    let value = this.literal.value;
                    this._item.tipeArg = tipe;
                    this._item.value = value;
                    this.detach();
                }
                catch (e) {
                    console.error(e);
                }
                return false;
            };
        }
        get refId() {
            return this._refId;
        }
        set refId(value) {
            this._refId = value;
        }
        get item() {
            return this._item;
        }
        set item(value) {
            this._item = value;
        }
        tampil() {
            while (this.daftar.firstChild) {
                this.daftar.removeChild(this.daftar.firstChild);
            }
            data.variableAr.forEach((item) => {
                let view = new ItemVar(item);
                view.attach(this.daftar);
            });
        }
        get form() {
            return this.getEl('form');
        }
        get tipe() {
            return this.getEl('input[nama=tipe_arg]');
        }
        get literal() {
            return this.getEl('input[nama=literal]');
        }
        get daftar() {
            return this.getEl('div.daftar');
        }
        get itemDiv() {
            return this.getEl('item-var-ref');
        }
    }
    arg.formArg = new FormArg();
    class ItemVar extends ha.comp.BaseComponent {
        constructor(item) {
            super();
            this._template = `
				<div class="item-var-ref padding">
					<div class="nama"></div>
					<div class="alamat"></div>
				</div>
			`;
            this.build();
            this.item = item;
            this.nama.innerText = this.item.nama;
            this.alamat.innerText = '-';
        }
        get nama() {
            return this.getEl('div.nama');
        }
        get alamat() {
            return this.getEl('div.alamat');
        }
    }
})(arg || (arg = {}));
