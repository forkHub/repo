import { Umum } from "../comp/Umum.js";
import { Util } from "../comp/Util.js";
import { RouterKOns } from "./RouterKons.js";
class AnggotaBaru {
    umum = new Umum();
    constructor() {
        this.form.onsubmit = () => {
            try {
                this.submit().then((hasil) => {
                    let confirm = window.confirm('Data sudah disimpan. Tekan OK untuk melanjutkan edit, tekan Cancel untuk kembali ke beranda.');
                    if (confirm) {
                        window.location.href = Util.getUrl(RouterKOns.g_anggota_id_edit_beranda, [hasil]);
                    }
                    else {
                        window.location.href = Util.getUrl(RouterKOns.g_anggota_daftar, []);
                    }
                }).catch((e) => {
                    console.error(e);
                    Util.error(e);
                });
            }
            catch (e) {
                Util.error(e);
            }
            return false;
        };
    }
    async submit() {
        let data = this.umum.formPopulate(this.form);
        let hasil = await Util.Ajax2('post', RouterKOns.gp_anggota_baru, JSON.stringify(data));
        return hasil;
        // console.log(hasil);
    }
    get form() {
        return document.body.querySelector('form');
    }
}
new AnggotaBaru();
