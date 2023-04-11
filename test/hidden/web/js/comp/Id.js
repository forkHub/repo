var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Id {
            static get id() {
                if (this._base <= 0) {
                    this._base = Date.now();
                }
                this._base++;
                return this._base;
            }
        }
        Id._base = 0;
        comp.Id = Id;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
