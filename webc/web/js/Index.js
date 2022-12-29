class TpsUpload extends HTMLElement {
    constructor() {
        super();
        ha.comp.File.load('template/form-upload.html', true).then((html) => {
            this.innerHTML = html;
        }).catch((e) => {
            ha.comp.Util.error(e);
        });
    }
    connectedCallback() {
        console.log('connected callback');
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    static get observedAttributes() {
        return [ /* array of attribute names to monitor for changes */];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        name;
        oldValue;
        newValue;
        // called when one of attributes listed above is modified
    }
    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
}
customElements.define('tps-upload', TpsUpload);
