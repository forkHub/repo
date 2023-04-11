"use strict";
class ViewWadah extends ha.comp.BaseComponent {
    constructor() {
        super();
        this.terima = [];
        this.menu = new ha.comp.MenuPopup();
        this._template = `
			<div class='wadah wspace-nowrap border'>
				<div class='menu disp-inline-block'>
					<button>|||</button>
				</div>
				<div class='wadah2 disp-inline-block'>

				</div>
			</div>
		`;
        this.build();
        this._elHtml.style.display = 'iniline-block';
        this.menuTbl.onclick = (e) => {
            e.stopPropagation();
            console.log('menu klik');
            arg.formArg.attach(document.body);
            arg.formArg.item = this._item;
            arg.formArg.setTerima(this.terima);
            this.detach();
        };
    }
    get item() {
        return this._item;
    }
    set item(value) {
        this._item = value;
    }
    setupMenu() {
        this.menu.buatTombol({
            label: 'update',
            f: () => {
            }
        });
        this.menu.buatTombol({
            label: 'value',
            f: () => {
            }
        });
        this.menu.buatTombol({
            label: 'ref',
            f: () => {
            }
        });
    }
    get menuTbl() {
        return this.getEl('div.menu button');
    }
    get wadahDiv() {
        return this.getEl('div.wadah2');
    }
}
