class dekVar extends HTMLElement {

    private nama: HTMLElement;
    private tipe: HTMLElement;
    private value: HTMLElement;

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

    static get observedAttributes(): any[] {
        return ['id'];
    }

    attributeChangedCallback(_name: any, _oldValue: any, _newValue: any) {
        if (_name == 'id') {
            let item: IVariable = datam.getById(data, _newValue) as IVariable;

            this.nama.innerText = item.nama;
            this.tipe.innerText = item.tipeVar;
            this.value.innerText = item.value;
        }
    }

    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }

    // there can be other element methods and properties
}

customElements.define('dek-var', dekVar);