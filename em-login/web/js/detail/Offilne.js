"use strict";
var ha;
(function (ha) {
    var contact;
    (function (contact) {
        class Offline extends ha.comp.BaseComponent {
            constructor() {
                super();
                this._elHtml = this.getTemplate("ha-offline");
            }
            init() {
            }
            render() {
            }
        }
        contact.offline = new Offline();
    })(contact = ha.contact || (ha.contact = {}));
})(ha || (ha = {}));
