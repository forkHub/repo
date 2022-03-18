"use strict";
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class BaseComponent {
            _template = '';
            _elHtml = document.createElement('div');
            _parent;
            onRender() {
            }
            onAttach() {
            }
            onBuild() {
            }
            onDetach() {
            }
            mulai(...params) {
                params;
            }
            destroy() {
                this.detach();
                while (this._elHtml.firstChild) {
                    this._elHtml.removeChild(this._elHtml.firstChild);
                }
                this._elHtml = null;
            }
            attach(parent) {
                parent.appendChild(this._elHtml);
                this._parent = parent;
                this.onAttach();
            }
            detach() {
                // console.log('loading detach');
                // console.log(this._elHtml.parentElement);
                if (this._elHtml.parentElement) {
                    this._elHtml.parentElement.removeChild(this._elHtml);
                    this.onDetach();
                    return true;
                }
                this.onDetach();
                return false;
            }
            show(el) {
                if (!el) {
                    el = this._elHtml;
                }
                el.style.display = 'block';
            }
            hide(el) {
                if (!el) {
                    el = this._elHtml;
                }
                el.style.display = 'none';
            }
            getEl(query) {
                let el;
                el = this._elHtml.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(this._elHtml);
                    console.log(query);
                    throw new Error('query not found ');
                }
            }
            build() {
                let div = document.createElement('div');
                let el;
                div.innerHTML = this._template;
                el = div.firstElementChild;
                this._elHtml = el;
                if (!this._elHtml)
                    throw new Error('');
                this.onBuild();
            }
            getTemplate(query) {
                let template = document.body.querySelector('template').content;
                return template.querySelector(query).cloneNode(true);
            }
            getElFromDoc(query) {
                let el;
                el = document.querySelector(query);
                if (!el)
                    throw new Error();
                return el;
            }
            get elHtml() {
                return this._elHtml;
            }
        }
        comp.BaseComponent = BaseComponent;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
