export class Template {
    constructor() {
        this.template = document.body.querySelector('template').content;
    }
    getEl(query) {
        return this.template.querySelector(query).cloneNode(true);
    }
    get daftar() {
        return this.template.querySelector('div.item-transaksi').cloneNode(true);
    }
    get form() {
        return this.template.querySelector('div.form').cloneNode(true);
    }
    get formEdit() {
        return this.getEl('div.form-edit');
    }
    get lapSemua() {
        return this.getEl('div.lap-semua');
    }
    get menuItem() {
        return this.getEl('div.menu-item');
    }
}
