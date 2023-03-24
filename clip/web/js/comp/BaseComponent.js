var ha;
(function (ha) {
    var comp;
    (function (comp) {
        // export function createComponent(template: string): BaseComponent {
        // 	let comp: BaseComponent = new BaseComponent();
        // 	comp.template = template;
        // 	comp.build();
        // 	return comp;
        // }
        class BaseComponent {
            _template = '';
            _elHtml = document.createElement('div');
            _parent;
            // protected get template(): string {
            // 	return this._template;
            // }
            // protected set template(value: string) {
            // 	this._template = value;
            // }
            static buat(temp) {
                let view = new BaseComponent();
                view.build(temp);
                return view;
            }
            async loadTemplate(f) {
                let http = await comp.Util.Ajax('get', f, '');
                if (200 == http.status) {
                    return http.responseText;
                }
                else {
                    throw new Error(http.responseText);
                }
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
            }
            detach() {
                // console.log('loading detach');
                // console.log(this._elHtml.parentElement);
                if (this._elHtml.parentElement) {
                    this._elHtml.parentElement.removeChild(this._elHtml);
                    return true;
                }
                return false;
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
            build(temp = '') {
                let div = document.createElement('div');
                let el;
                if (temp && temp != '') {
                    this._template = temp;
                }
                div.innerHTML = this._template;
                el = div.firstElementChild;
                this._elHtml = el;
                if (!this._elHtml) {
                    console.log(div);
                    console.log(this._template);
                    throw new Error('');
                }
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
            // getElFromDoc(query: string): HTMLElement {
            // 	let el: HTMLElement;
            // 	el = document.querySelector(query);
            // 	if (!el) throw new Error();
            // 	return el;
            // }
            get elHtml() {
                return this._elHtml;
            }
        }
        comp.BaseComponent = BaseComponent;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
