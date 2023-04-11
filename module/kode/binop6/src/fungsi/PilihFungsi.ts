///<reference path="../ha/comp/BaseComponent.ts"/>

class PilihFungsiView extends ha.comp.BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='pilih fungsi padding pos-abs top-0 left-0 back-color-white user-select-none'>
				<div class="padding border">
					<div class="padding border">
						<div class='judul'>Pilih Fungsi</div>
					</div>
					<div class='padding-4'></div>
					<div class="padding border">
						<div class='daftar'>

						</div>
					</div>
					<div class='padding'>
						<button class='batal'>batal</button>
					</div>
				</div>
			</div>
		`;
        this.build();

        this.batalTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            this.detach();
        }

    }

    get daftar(): HTMLDivElement {
        return this.getEl('div.daftar') as HTMLDivElement;
    }

    get batalTbl(): HTMLButtonElement {
        return this.getEl('button.batal') as HTMLButtonElement;
    }

    get judul(): HTMLDivElement {
        return this.getEl('div.judul') as HTMLDivElement;
    }


}

class PilihFungsiItem extends ha.comp.BaseComponent {
    private _finish: () => void;
    public get finish(): () => void {
        return this._finish;
    }
    public set finish(value: () => void) {
        this._finish = value;
    }

    constructor(fungsi: IDekFungsi) {
        super();
        this._template = `
			<div class='item-var padding-4 user-select-none cursor-pointer'>
				<div class='border padding'>
					<span class='nama disp-inline-block'></span>
				</div>
			</div>
		`;
        this.build();

        this.nama.innerText = fungsi.nama;

        this._elHtml.onclick = (e: MouseEvent) => {
            e.stopPropagation();

            this.destroy();
            this._finish();
        }
    }

    get nama(): HTMLSpanElement {
        return this.getEl('span.nama') as HTMLSpanElement;
    }
}

//TODO: bisa dibuat static
class PilihFungsi {
    readonly view: PilihFungsiView = new PilihFungsiView();
    private _finish: () => void;
    private _idDipilih: number;

    public get idDipilih(): number {
        return this._idDipilih;
    }
    public set idDipilih(value: number) {
        this._idDipilih = value;
    }

    public get finish(): () => void {
        return this._finish;
    }
    public set finish(value: () => void) {
        this._finish = value;
    }

    tampil(daftar: IDekFungsi[]): void {

        while (this.view.daftar.firstChild) {
            this.view.daftar.removeChild(this.view.daftar.firstChild);
        }

        daftar.forEach((item: IDekFungsi) => {
            let view: PilihFungsiItem;
            view = new PilihFungsiItem(item);
            view.finish = () => {
                console.log('fungsi dipilih ' + item.id);
                this._idDipilih = item.id;
                this.view.detach();
                this._finish();
            }

            view.attach(this.view.daftar);
        });

        this.view.attach(document.body);
        this.view.batalTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            this.view.detach();
        }

    }
}

const pilihFungsi: PilihFungsi = new PilihFungsi();
