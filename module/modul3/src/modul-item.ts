class modulItem extends HTMLElement {
    private panahEl: HTMLDivElement;
    private namaEl: HTMLDivElement;
    private anakContEl: HTMLDivElement;

    constructor() {
        super();
    }

    connectedCallback() {
        console.log('connected callback');
        this.innerHTML = ha.comp.File.fromCache('template/modul-item.html');

        this.panahEl = this.querySelector('div.panah');
        this.panahEl.onclick = () => {
            if (this.anakContEl.style.display == 'none') {
                this.anakContEl.style.display = 'block';
                this.panahEl.innerHTML = '&#9660';
            }
            else {
                this.anakContEl.style.display = 'none';
                this.panahEl.innerHTML = '&#9654';
            }
        }

        this.namaEl = this.querySelector('div.nama');

        this.anakContEl = this.querySelector('div.anak-cont');
        this.anakContEl.style.display = 'none';

        this.update();
    }

    update(): void {
        if (this.namaEl) this.namaEl.innerText = this.getAttribute('nama');
    }

    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }

    static get observedAttributes(): any[] {
        return ['nama', 'id'];
    }

    attributeChangedCallback(_name: any, _oldValue: any, _newValue: any) {
        this.update();
    }

    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }

    // there can be other element methods and properties
}

customElements.define('modul-item', modulItem);