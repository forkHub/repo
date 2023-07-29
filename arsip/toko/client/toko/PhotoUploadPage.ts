import { BaseComponent } from "../comp/BaseComponent.js";
import { dialog } from "../comp/Dialog.js";
import { loading } from "../comp/Loading.js";
import { Util } from "../comp/Util.js";
import { IFoto } from "../share/Type.js";

declare var loadImage: Function;

export class PhotoUploadPage {

	private _selesai: Function = null;
	private _view: View = new View();
	private _statusUpload: boolean = false;
	private _uploadData: IFoto = {};

	public get uploadData(): IFoto {
		return this._uploadData;
	}
	public set uploadData(value: IFoto) {
		this._uploadData = value;
	}

	toggle(): void {
		this._view.elHtml.classList.toggle('disp-none');
		this._view.elHtml.classList.toggle('disp-block');
	}

	private buatNama(prefix: string, pjg: number = 12): string {
		let hasil: string = prefix;
		let karakter: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
		let date: Date = new Date();

		for (let i: number = 0; i < pjg; i++) {
			hasil += karakter.charAt(Math.floor(Math.random() * karakter.length));
		}

		hasil += date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '_' + date.getMilliseconds();
		hasil += '.png';

		console.log('nama: ' + hasil);

		return hasil;
	}

	init(): void {
		console.debug('foto init');

		this._view.uploadTbl.style.display = 'none';

		this._view.form.onsubmit = () => {
			try {
				this._statusUpload = true;
				Util.Ajax(
					"post",
					this._view.form.action,
					JSON.stringify(this._uploadData),
					(p: ProgressEvent) => {
						console.debug(p.loaded + "/" + p.total);
					}
				).then((x: XMLHttpRequest) => {
					if (x.status == 200) {
						dialog.tampil('gambar berhasil di upload');
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
				})
			}
			catch (e) {
				this._statusUpload = false;
				Util.error(e);
			}

			return false;
		}

		this._view.fileInput.onchange = () => {
			console.debug('foto on change');

			this._view.fotoCont.innerHTML = '';
			this._view.thumbCont.innerHTML = '';
			this._view.uploadTbl.style.display = 'none';

			loading.tampil();

			this.loadImage(this._view.fileInput).then(() => {
				loading.detach();
				this._statusUpload = true;
				this._view.uploadTbl.style.display = 'initial';

				let nama: string = this.buatNama("", 8);

				this._uploadData.gbr_baru = this._view.canvasBesar.toDataURL().slice(22);
				this._uploadData.thumb_baru = this._view.canvasThumb.toDataURL().slice(22);
				this._uploadData.nama_thumb = "thumb_" + nama;
				this._uploadData.nama_gbr = 'gbr_' + nama;

				console.debug(this._uploadData.gbr_baru.slice(0, 50));
				console.debug(this._view.canvasBesar.toDataURL().slice(0, 50));

				this._view.img.src = this._view.canvasThumb.toDataURL();

			}).catch((e: any) => {
				console.log(e);
				Util.error(e);
				this._statusUpload = false;
			});
		}

		this._view.tutupTbl.onclick = () => {
			this._statusUpload = false;
			this._selesai();
		}

	}

	private async loadImage(file: HTMLInputElement): Promise<void> {
		await this.loadImage2(file, 640, 640, "gbr_besar", this.view.fotoCont);
		await this.loadImage2(file, 128, 128, "thumb", this.view.thumbCont);
	}

	private async loadImage2(file: HTMLInputElement, panjang: number, lebar: number, id: string, cont: HTMLDivElement): Promise<void> {
		let canvas: HTMLCanvasElement;
		let img: any = await loadImage(
			file.files[0],
			{
				maxWidth: panjang,
				maxHeight: lebar,
				canvas: true,
				orientation: true,
				imageSmoothingQuality: 'high',
			}
		);

		canvas = img.image;
		canvas.setAttribute("id", id);
		cont.appendChild(canvas);
	}

	public get view(): View {
		return this._view;
	}

	public get statusUpload(): boolean {
		return this._statusUpload;
	}

	public set statusUpload(value: boolean) {
		this._statusUpload = value;
	}


	public set selesai(value: Function) {
		this._selesai = value;
	}
}

class View extends BaseComponent {
	constructor() {
		super();
		this._elHtml = document.body.querySelector('div.upload-gambar');
	}

	get form(): HTMLFormElement {
		return this.getEl('form') as HTMLFormElement;
	}

	get fileInput(): HTMLInputElement {
		return this.getEl('input[type="file"]') as HTMLInputElement;
	}

	get uploadTbl(): HTMLInputElement {
		return this.getEl('button.upload') as HTMLInputElement;
	}

	get canvasBesar(): HTMLCanvasElement {
		return this.getEl('canvas#gbr_besar') as HTMLCanvasElement;
	}

	get canvasThumb(): HTMLCanvasElement {
		return this.getEl('canvas#thumb') as HTMLCanvasElement;
	}

	get tutupTbl(): HTMLButtonElement {
		return this.getEl('button.tutup') as HTMLButtonElement;
	}

	get fotoCont(): HTMLDivElement {
		return this.getEl('div.foto-cont') as HTMLDivElement;
	}

	get thumbCont(): HTMLDivElement {
		return this.getEl('div.thumb-cont') as HTMLDivElement;
	}

	get img(): HTMLImageElement {
		return this.getEl('img.img-ori') as HTMLImageElement;
	}

	// get inputNamaThumb(): HTMLInputElement {
	// 	return this.getEl('input[name="nama_thumb"]') as HTMLInputElement
	// }

	// get inputNamaGbr(): HTMLInputElement {
	// 	return this.getEl('input[name="nama_gbr"]') as HTMLInputElement
	// }
}

var upload: PhotoUploadPage = new PhotoUploadPage();
upload.init();
upload.selesai = () => {
	console.debug('upload selesai');
	upload.toggle();

	if (upload.statusUpload) {
		let input: HTMLInputElement;

		upload.statusUpload = false;

		input = Util.getEl("form input[name='thumb']") as HTMLInputElement;
		input.value = upload.uploadData.nama_thumb;
		input = Util.getEl("form input[name='gbr']") as HTMLInputElement;
		input.value = upload.uploadData.nama_gbr;

		(document.querySelector('form.barang img.img-asli') as HTMLImageElement).src = upload.view.canvasThumb.toDataURL();
	}
	else {
		console.debug('status upload: ' + upload.statusUpload);
	}

	//update status foto
}