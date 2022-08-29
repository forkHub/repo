import { BaseComponent } from "./comp/BaseComponent.js";
import { Util } from "./comp/Util.js";
import { ISlAnggota } from "./share/Type.js";

export class HalRelEdit {
    private cariAnggota: CariAnggota = new CariAnggota();
    private urlCari: string;
    private urlGanti: string;

    constructor() {
        console.debug('constructor');
        this.urlCari = document.body.getAttribute('data-url-cari');


        this.pilihSuamiTbl().onclick = () => {
            console.debug('pilih suami click');
            this.cariAnggota.selesai = (obj: ISlAnggota) => {
                this.inputNama().value = obj.nama;
                Util.Ajax2('post', this.urlGanti, obj.id + '').catch((e) => {
                    Util.error(e);
                });
            }

            this.cariAnggota.tampil('pilih suami:', Util.getUrl(this.urlCari, ['l'])).catch((e) => {
                Util.error(e);
            });
        }

        this.form().onsubmit = () => {
            try {
                // console.debug('submit form');

                // //TODO:
                // Util.Ajax('post', this.form().action, '')
                //     .then((x: XMLHttpRequest) => {
                //         if (x.status == 200) {
                //             dialog.tampil('Data telah disimpan');
                //         }
                //         else {
                //             throw Error(x.responseText);
                //         }
                //     })
                //     .catch((e) => {
                //         Util.error(e);
                //     });
            }
            catch (e) {
                Util.error(e);
            }

            return false;
        }
    }

    pilihSuamiTbl(): HTMLButtonElement {
        return Util.getEl('form button.suami') as HTMLButtonElement;
    }

    form(): HTMLFormElement {
        return Util.getEl('form') as HTMLFormElement;
    }

    inputNama(): HTMLInputElement {
        return Util.getEl('form input[name=suami]') as HTMLInputElement;
    }
}

class CariAnggota extends BaseComponent {
    private _selesai: (obj: ISlAnggota) => void;
    public set selesai(value: (obj: ISlAnggota) => void) {
        this._selesai = value;
    }

    constructor() {
        super();
        this._elHtml = Util.getEl('div.cari-anggota');
        this.tutupTbl.onclick = () => {
            this.tutup();
        }
    }

    private tutup(): void {
        this._elHtml.classList.remove('tengah-tengah');
        this._elHtml.classList.add('disp-none');
    }

    async tampil(judul: string, url: string): Promise<void> {
        let data: string;
        let objAr: ISlAnggota[];

        this.judul.innerHTML = judul;
        this.daftarCont.innerHTML = '';
        data = await Util.Ajax2('post', url, '');
        objAr = JSON.parse(data);

        for (let i: number = 0; i < objAr.length; i++) {
            let obj: ISlAnggota = objAr[i];
            let view: Item = new Item();

            view.nama.innerHTML = obj.nama;
            view.attach(this.daftarCont);

            view.elHtml.onclick = () => {
                this.tutup();
                this._selesai(obj);
            }

        }

        this._elHtml.classList.remove('disp-none');
        this._elHtml.classList.add('tengah-tengah');
    }

    get judul(): HTMLParagraphElement {
        return this.getEl('p.judul') as HTMLParagraphElement;
    }

    get daftarCont(): HTMLDivElement {
        return this.getEl('div.daftar') as HTMLDivElement;
    }

    get tutupTbl(): HTMLButtonElement {
        return this.getEl('button.tutup') as HTMLButtonElement;
    }
}

class Item extends BaseComponent {
    constructor() {
        super();
        this._template = `
            <div class='item list-group'>
				<a class="list-group-item list-group-item-action">
					<p class='nama'></p>
				</a>
			</div>`;
        this.build();
    }

    get nama(): HTMLParagraphElement {
        return this.getEl('p.nama') as HTMLParagraphElement;
    }


}


new HalRelEdit();