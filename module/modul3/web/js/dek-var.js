class dekVar extends HTMLElement {
    nama;
    tipe;
    value;
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = ha.comp.File.fromCache('template/dek-var.html');
        this.nama = ha.comp.Util.getEl('div.nama', this);
        this.tipe = ha.comp.Util.getEl('div.type', this);
        this.value = ha.comp.Util.getEl('div.value', this);
        this.classList.add('disp-flex');
    }
    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    static get observedAttributes() {
        return ['id'];
    }
    attributeChangedCallback(_name, _oldValue, _newValue) {
        if (_name == 'id') {
            let item = datam.getById(data, _newValue);
            this.nama.innerText = item.nama;
            this.tipe.innerText = item.tipeVar;
            this.value.innerText = item.value;
        }
    }
    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
}
customElements.define('dek-var', dekVar);
