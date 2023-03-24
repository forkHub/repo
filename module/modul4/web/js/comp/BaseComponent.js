export class BaseComponent {
    _template = '';
    _elHtml = document.createElement('div');
    _parent;
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
    get elHtml() {
        return this._elHtml;
    }
}
