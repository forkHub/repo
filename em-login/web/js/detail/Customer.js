"use strict";
var ha;
(function (ha) {
    var contact;
    (function (contact) {
        class Customer extends ha.comp.BaseComponent {
            constructor() {
                super();
                this._elHtml = this.getTemplate("ha-customer");
            }
            init() {
            }
            render() {
            }
        }
        contact.customer = new Customer();
    })(contact = ha.contact || (ha.contact = {}));
})(ha || (ha = {}));
