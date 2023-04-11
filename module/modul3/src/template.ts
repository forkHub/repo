class template extends HTMLElement {

    constructor() {
        super();
        console.log('connected callback');
        this.innerHTML = ha.comp.File.fromCache('template/modul-item.html');
    }

    connectedCallback() {

    }


    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }

    static get observedAttributes(): any[] {
        return ['id'];
    }

    attributeChangedCallback(_name: any, _oldValue: any, _newValue: any) {
    }

    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }

    // there can be other element methods and properties
}

customElements.define('template', template);