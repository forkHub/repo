class TpsUpload extends HTMLElement {
    constructor() {
        super();
        ha.comp.File.load('template/form-upload.html', true).then((html: string) => {
            this.innerHTML = html;
        }).catch((e) => {
            ha.comp.Util.error(e);
        })
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

    static get observedAttributes(): any[] {
        return [/* array of attribute names to monitor for changes */];
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        name;
        oldValue;
        newValue;
        // called when one of attributes listed above is modified
    }

    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }

    // there can be other element methods and properties
}

customElements.define('tps-upload', TpsUpload);