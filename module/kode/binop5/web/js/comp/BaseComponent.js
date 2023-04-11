"use strict";
var ha;
(function (ha) {
    var comp;
    (function (comp_1) {
        function createComponent(template) {
            let comp = new BaseComponent();
            comp.template = template;
            comp.build();
            return comp;
        }
        comp_1.createComponent = createComponent;
        class BaseComponent {
            constructor() {
                this._template = '';
                this._elHtml = document.createElement('div');
            }
            get template() {
                return this._template;
            }
            set template(value) {
                this._template = value;
            }
            async loadTemplate(f) {
                let http = await comp_1.Util.Ajax('get', f, '');
                if (200 == http.status) {
                    return http.responseText;
                }
                else {
                    throw new Error(http.responseText);
                }
            }
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
                if (!this._elHtml) {
                    console.log(div);
                    console.log(this._template);
                    throw new Error('');
                }
                this.onBuild();
            }
            getTemplate(query) {
                try {
                    let template = document.body.querySelector('template').content;
                    return template.querySelector(query).cloneNode(true);
                }
                catch (e) {
                    console.log('template:' + query);
                    throw Error(e);
                }
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
        comp_1.BaseComponent = BaseComponent;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
