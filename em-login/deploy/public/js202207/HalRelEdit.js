import { BaseComponent } from "./comp/BaseComponent.js";
import { Util } from "./comp/Util.js";
export class HalRelEdit {
    cariAnggota = new CariAnggota();
    urlCari;
    urlGanti;
    constructor() {
        console.debug('constructor');
        this.urlCari = document.body.getAttribute('data-url-cari');
        this.pilihSuamiTbl().onclick = () => {
            console.debug('pilih suami click');
            this.cariAnggota.selesai = (obj) => {
                this.inputNama().value = obj.nama;
                Util.Ajax2('post', this.urlGanti, obj.id + '').catch((e) => {
                    Util.error(e);
                });
            };
            this.cariAnggota.tampil('pilih suami:', Util.getUrl(this.urlCari, ['l'])).catch((e) => {
                Util.error(e);
            });
        };
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
        };
    }
    pilihSuamiTbl() {
        return Util.getEl('form button.suami');
    }
    form() {
        return Util.getEl('form');
    }
    inputNama() {
        return Util.getEl('form input[name=suami]');
    }
}
class CariAnggota extends BaseComponent {
    _selesai;
    set selesai(value) {
        this._selesai = value;
    }
    constructor() {
        super();
        this._elHtml = Util.getEl('div.cari-anggota');
        this.tutupTbl.onclick = () => {
            this.tutup();
        };
    }
    tutup() {
        this._elHtml.classList.remove('tengah-tengah');
        this._elHtml.classList.add('disp-none');
    }
    async tampil(judul, url) {
        let data;
        let objAr;
        this.judul.innerHTML = judul;
        this.daftarCont.innerHTML = '';
        data = await Util.Ajax2('post', url, '');
        objAr = JSON.parse(data);
        for (let i = 0; i < objAr.length; i++) {
            let obj = objAr[i];
            let view = new Item();
            view.nama.innerHTML = obj.nama;
            view.attach(this.daftarCont);
            view.elHtml.onclick = () => {
                this.tutup();
                this._selesai(obj);
            };
        }
        this._elHtml.classList.remove('disp-none');
        this._elHtml.classList.add('tengah-tengah');
    }
    get judul() {
        return this.getEl('p.judul');
    }
    get daftarCont() {
        return this.getEl('div.daftar');
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
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
    get nama() {
        return this.getEl('p.nama');
    }
}
new HalRelEdit();
