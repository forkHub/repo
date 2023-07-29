///<reference path="./ha/comp/BaseComponent.ts"/>

class TambahTbl extends ha.comp.BaseComponent {
    // private klik: () => void;

    constructor(klik: () => void) {
        super();
        this._template = `
            <div class='tambah-user-tbl user-select-none cursor-pointer'>+</div>
        `;
        this.build();

        this._elHtml.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            klik();
        }
    }

}