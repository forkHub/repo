import { BaseComponent } from "../comp/BaseComponent.js";
import { dialog } from "../comp/Dialog.js";
import { loading } from "../comp/Loading.js";
import { Util } from "../comp/Util.js";
export class PhotoUploadPage {
    _selesai = null;
    _view = new View();
    _statusUpload = false;
    _uploadData = {};
    get uploadData() {
        return this._uploadData;
    }
    set uploadData(value) {
        this._uploadData = value;
    }
    toggle() {
        this._view.elHtml.classList.toggle('disp-none');
        this._view.elHtml.classList.toggle('disp-block');
    }
    buatNama(prefix, pjg = 12) {
        let hasil = prefix;
        let karakter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let date = new Date();
        for (let i = 0; i < pjg; i++) {
            hasil += karakter.charAt(Math.floor(Math.random() * karakter.length));
        }
        hasil += date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '_' + date.getMilliseconds();
        hasil += '.png';
        console.log('nama: ' + hasil);
        return hasil;
    }
    init() {
        console.debug('foto init');
        this._view.uploadTbl.style.display = 'none';
        this._view.form.onsubmit = () => {
            try {
                this._statusUpload = true;
                Util.Ajax("post", this._view.form.action, JSON.stringify(this._uploadData), (p) => {
                    console.debug(p.loaded + "/" + p.total);
                }).then((x) => {
                    if (x.status == 200) {
                        dialog.tampil('ok');
                        this._statusUpload = true;
                        this._selesai();
                    }
                    else {
                        this._statusUpload = false;
                        throw Error(x.statusText);
                    }
                }).catch((e) => {
                    this._statusUpload = false;
                    Util.error(e);
                });
            }
            catch (e) {
                this._statusUpload = false;
                Util.error(e);
            }
            return false;
        };
        this._view.fileInput.onchange = () => {
            console.debug('foto on change');
            this._view.fotoCont.innerHTML = '';
            this._view.thumbCont.innerHTML = '';
            this._view.uploadTbl.style.display = 'none';
            this.loadImage(this._view.fileInput).then(() => {
                loading.detach();
                this._statusUpload = true;
                this._view.uploadTbl.style.display = 'initial';
                let nama = this.buatNama("", 8);
                this._uploadData.gbr_baru = this._view.canvasBesar.toDataURL().slice(22);
                this._uploadData.thumb_baru = ''; //this._view.canvasThumb.toDataURL().slice(22);
                this._uploadData.nama_thumb = "thumb_" + nama;
                this._uploadData.nama_gbr = 'gbr_' + nama;
                console.debug(this._uploadData.gbr_baru.slice(0, 50));
                console.debug(this._view.canvasBesar.toDataURL().slice(0, 50));
                this._view.img.src = this._view.canvasThumb.toDataURL();
            }).catch((e) => {
                console.log(e);
                Util.error(e);
                this._statusUpload = false;
            });
        };
        this._view.tutupTbl.onclick = () => {
            this._statusUpload = false;
            this._selesai();
        };
    }
    async loadImage(file) {
        await this.loadImage2(file, 512, 512, "gbr_besar", this.view.fotoCont);
        await this.loadImage2(file, 128, 128, "thumb", this.view.thumbCont);
    }
    async loadImage2(file, panjang, lebar, id, cont) {
        let canvas;
        let img = await loadImage(file.files[0], {
            maxWidth: panjang,
            maxHeight: lebar,
            canvas: true,
            orientation: true,
            imageSmoothingQuality: 'high',
        });
        canvas = img.image;
        canvas.setAttribute("id", id);
        cont.appendChild(canvas);
    }
    get view() {
        return this._view;
    }
    get statusUpload() {
        return this._statusUpload;
    }
    set statusUpload(value) {
        this._statusUpload = value;
    }
    set selesai(value) {
        this._selesai = value;
    }
}
class View extends BaseComponent {
    constructor() {
        super();
        this._elHtml = document.body.querySelector('div.upload-gambar');
    }
    get form() {
        return this.getEl('form');
    }
    get fileInput() {
        return this.getEl('input[type="file"]');
    }
    get uploadTbl() {
        return this.getEl('button.upload');
    }
    get canvasBesar() {
        return this.getEl('canvas#gbr_besar');
    }
    get canvasThumb() {
        return this.getEl('canvas#thumb');
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
    }
    get fotoCont() {
        return this.getEl('div.foto-cont');
    }
    get thumbCont() {
        return this.getEl('div.thumb-cont');
    }
    get img() {
        return this.getEl('img.img-ori');
    }
}
var upload = new PhotoUploadPage();
upload.init();
upload.selesai = () => {
    console.debug('upload selesai');
    upload.toggle();
    if (upload.statusUpload) {
        upload.statusUpload = false;
        document.querySelector('div.form-group img.img-asli').src = upload.view.canvasBesar.toDataURL();
    }
    else {
        console.debug('status upload: ' + upload.statusUpload);
    }
    //update status foto
};
