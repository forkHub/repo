"use strict";
var ha;
(function (ha) {
    var contact;
    (function (contact) {
        class WrapUp extends ha.comp.BaseComponent {
            constructor() {
                super();
                this._elHtml = this.getTemplate("ha-wrapup");
            }
            init() {
            }
            get action() {
                return this.getEl('ha-contact-action');
            }
            get outcome() {
                return this.getEl('ha-contact-outcome');
            }
            get note() {
                return this.getEl('ha-contact-note');
            }
        }
        contact.wrapUp = new WrapUp();
    })(contact = ha.contact || (ha.contact = {}));
})(ha || (ha = {}));
