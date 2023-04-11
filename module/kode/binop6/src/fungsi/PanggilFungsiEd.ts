///<reference path="../ha/comp/BaseComponent.ts"/>

class PanggilFungsiEd extends ha.comp.BaseComponent {
    private panggilFungsi: IPanggilFungsi;

    constructor(f: IPanggilFungsi) {
        super();
        this._template = `
            <div class='panggil-fungsi display-table wspace-no-wrap padding user-select-none cursor-pointer'>
                <div class='nama disp-cell padding-kanan'></div>
                <div class='disp-cell padding-kanan'>(</div>
                <div class='arg wspace-nowrap disp-cell padding-kanan'></div>
                <div class='disp-cell'>)</div>
            </div>
        `;
        this.build();
        this.panggilFungsi = f;
        this.display();
        this.setEvent();
    }

    setEvent(): void {
        this.namaEl.onclick = (e: MouseEvent) => {
            e.stopPropagation();

            pilihFungsi.finish = () => {
                PanggilFungsi.ganti(this.panggilFungsi, pilihFungsi.idDipilih);
                this.display();
            }

            //TODO: get daftar dek fungsi
            // pilihFungsi.tampil(DekFungsi.daftar);
        }
    }

    buatComa(): HTMLElement {
        let el: HTMLElement;

        el = document.createElement('span');
        el.innerText = ' , '

        return el;
    }

    display(): void {
        this.namaEl.innerText = PanggilFungsi.nama(this.panggilFungsi);

        //param
        this.argCont.innerHTML = '';

        this.panggilFungsi.param.forEach((itemId: number, idx: number) => {
            let expEd: ExpEd2;
            let exp: IExp;

            exp = Exp.get(itemId)
            expEd = new ExpEd2(exp);
            expEd.attach(this.argCont);

            if (idx < this.panggilFungsi.param.length - 1) {
                this.argCont.appendChild(this.buatComa());
            }
        })
    }

    get namaEl(): HTMLElement {
        return this.getEl('div.nama');
    }

    get argCont(): HTMLElement {
        return this.getEl('div.arg');
    }

}