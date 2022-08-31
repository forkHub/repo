"use strict";
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class MenuPopup {
            view = new View();
            constructor() {
            }
            tampil(tombol) {
                while (this.view.box.firstChild) {
                    this.view.box.removeChild(this.view.box.firstChild);
                }
                tombol.forEach((item) => {
                    this.buatTombol(item);
                });
                this.view.attach(document.body);
            }
            buatClass(label) {
                let hasil;
                hasil = label.toLowerCase();
                while (hasil.indexOf(' ') > -1) {
                    hasil = hasil.replace(' ', '-');
                }
                return hasil;
            }
            buatTombol(t) {
                let button = document.createElement('button');
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.classList.add(this.buatClass(t.label));
                button.style.display = 'block';
                button.style.margin = 'auto';
                button.style.marginBottom = '8px';
                button.textContent = t.label;
                button.onclick = (e) => {
                    e.stopPropagation();
                    this.view.detach();
                    t.f();
                };
                this.view.box.appendChild(button);
            }
        }
        comp.MenuPopup = MenuPopup;
        class View extends comp.BaseComponent {
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
                };
            }
            get box() {
                return this.getEl('div.box.cont');
            }
        }
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
