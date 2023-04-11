"use strict";
var arg;
(function (arg) {
    class FormArg extends ha.comp.BaseComponent {
        constructor() {
            super();
            this.terima = [];
            this._elHtml = this.getTemplate('div.edit-arg');
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
            this.browse.onclick = (e) => {
                e.stopPropagation();
                console.log('browse click');
                this.detach();
                pilihVariable.finish = () => {
                    this.attach(document.body);
                };
                pilihVariable.tampil(this.item);
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
        setTerima(terima) {
            terima;
        }
        tampil() {
        }
        get form() {
            return this.getEl('form');
        }
        get tipe() {
            return this.getEl('input[name=tipe_arg]');
        }
        get literal() {
            return this.getEl('input[name=literal]');
        }
        get browse() {
            return this.getEl('button.browse');
        }
        get itemDiv() {
            return this.getEl('item-var-ref');
        }
    }
    arg.formArg = new FormArg();
})(arg || (arg = {}));
