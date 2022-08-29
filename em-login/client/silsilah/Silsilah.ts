import { BaseComponent } from "../comp/BaseComponent.js";
import { Util } from "../comp/Util.js";
import { AnggotaDao } from "./AnggotaDao.js"
import { RouterKOns } from "./RouterKons.js";

declare var data: ISlAnggota;

class App {
	readonly anggotaDao: AnggotaDao = new AnggotaDao();

	async loadAnggota(id: number): Promise<ISlAnggota> {
		let anggota: ISlAnggota = (await app.anggotaDao.bacaId(id))[0];
		anggota.populated = false;
		anggota.anak = [];
		return anggota;
	}

	async loadAnak(anggota: ISlAnggota): Promise<void> {
		let anak: ISlAnggota[] = await this.anggotaDao.bacaAnak(anggota);
		anak.forEach((item: ISlAnggota) => {
			item.populated = false;
		})
		anggota.anak = anak || [];
	}

	renderAnggota(anggota: ISlAnggota, cont: HTMLDivElement, indek: number, loadOtomatis: boolean): void {
		console.log('render anggota');
		console.log(anggota);

		let view: AnggotaView = new AnggotaView();
		view.nama.innerHTML = anggota.nama;
		view.img.src = '/gbr/thumb.png';
		view.foto.style.backgroundImage = 'url(' + view.img.src + ')';
		view.foto.style.backgroundRepeat = 'no-repeat';
		view.foto.style.backgroundSize = 'cover';

		view.anggota = anggota;
		view.profileUtama.setAttribute('id', anggota.id + '');

		view.profileUtama.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();

			console.debug('utama on click');
			console.debug('id : ' + (e.currentTarget as HTMLButtonElement).getAttribute('id'));

			let id: string = (e.currentTarget as HTMLButtonElement).getAttribute('id');
			window.location.href = Util.getUrl(RouterKOns.g_beranda_lihat_id, [id])
		}

		view.profilePasangan.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();

			console.debug('pasangan on click');
			console.debug('id : ' + (e.currentTarget as HTMLButtonElement).getAttribute('id'));

			let id: string = (e.currentTarget as HTMLButtonElement).getAttribute('id');
			window.location.href = Util.getUrl(RouterKOns.g_beranda_lihat_id, [id])
		}

		view.attach(cont);

		view.utama.onclick = (evt: MouseEvent) => {
			console.debug('view utama click');
			evt.stopPropagation();
			this.anggotaKlik(view);
		}

		let hubung: Hubung = new Hubung();
		hubung.attach(view.hubungCont);
		this.renderHubung(hubung, indek);

		if (loadOtomatis) {
			this.anggotaKlik(view);
		}
	}

	renderHubung(view: Hubung, hubung: number): void {
		console.log('render hubung, idx ' + hubung);

		view.kanan.classList.remove('border-kanan', 'border-kiri', 'border-atas', 'border-bawah');
		view.kiri.classList.remove('border-kanan', 'border-kiri', 'border-atas', 'border-bawah');

		if (hubung == -1) {

		} else if (hubung == 0) {
			view.kanan.classList.add('border-kiri');
			view.kiri.classList.add('border-kanan');
		} else if (hubung == 1) {
			view.kiri.classList.add('border-kanan');
			view.kanan.classList.add('border-atas');
			view.kanan.classList.add('border-kiri');
		} else if (hubung == 2) {
			view.kiri.classList.add('border-kanan');
			view.kiri.classList.add('border-atas');
			view.kanan.classList.add('border-atas');
			view.kanan.classList.add('border-kiri');

		} else if (hubung == 3) {
			view.kiri.classList.add('border-atas');
			view.kiri.classList.add('border-kanan');
			view.kanan.classList.add('border-kiri');
		}
	}

	async anggotaKlik(view: AnggotaView): Promise<void> {
		console.group('anggota klik');
		console.log(view.anggota);

		if (!view.anggota.populated) {
			console.debug('anggota belum di populate');
			view.anggota.populated = true;

			if (view.anggota.rel_id) {
				console.debug('load pasangan');
				let pas: ISlAnggota = (await app.anggotaDao.bacaPasangan(view.anggota))[0];
				if (pas) {
					console.debug('pasangan loaded');
					view.anggota.pasangan_id = pas.id;
					view.anggota.pas = pas;
					view.imgPasangan.src = pas.foto ? pas.foto : '/gbr/thumb.png';
					view.imgPasangan.src = '/gbr/thumb.png'; //override buat hilangin foto
					view.profilePasangan.setAttribute('id', pas.id + '');

					view.fotoPasangan.style.backgroundImage = 'url(' + view.imgPasangan.src + ')';
					view.fotoPasangan.style.backgroundRepeat = 'no-repeat';
					view.fotoPasangan.style.backgroundSize = 'cover';
				}
				else {
					console.debug('pasangan tidak ketemu');
				}
			}
			else {
				console.debug('pasangan relasi tidak ada')
			}

			//load anak
			console.group('load anak');
			await this.loadAnak(view.anggota);
			console.groupEnd();
		}
		else {
			console.log('anggota sudah diload');
		}

		if (view.anggota.pas) {
			console.debug('render pasangan');
			view.namaPasangan.innerHTML = view.anggota.pas.nama;
			view.pasangan.classList.toggle('display-none');
		}

		if (view.pasangan.classList.contains('display-none')) {
			view.pasangan.classList.remove('disp-table-cell');

			view.utama.classList.remove('text-align-right');
			view.utama.classList.add('text-align-center');
		}
		else {
			view.pasangan.classList.add('disp-table-cell');

			view.utama.classList.remove('text-align-center');
			view.utama.classList.add('text-align-right');
		}



		console.log('render anak');
		view.bawah.innerHTML = '';
		for (let i: number = 0; i < view.anggota.anak.length; i++) {
			let anak: ISlAnggota = view.anggota.anak[i];
			let hubung: number = 0;
			if (i == 0) {
				hubung = 1;
			}
			else if (i == view.anggota.anak.length - 1) {
				hubung = 3;
			}
			else {
				hubung = 2;
			}

			if (view.anggota.anak.length == 1) {
				hubung = 0;
			}

			this.renderAnggota(anak, view.bawah, hubung, false);
		}


		view.bawah.classList.toggle('display-none');
		view.bawah.classList.toggle('display-table');

		console.groupEnd();
	}

}

class AnggotaView extends BaseComponent {
	private _anggota: ISlAnggota;
	public get anggota(): ISlAnggota {
		return this._anggota;
	}
	public set anggota(value: ISlAnggota) {
		this._anggota = value;
	}

	constructor() {
		super();
		this._elHtml = document.body.querySelector('template').content.querySelector('div.cont').cloneNode(true) as HTMLDivElement;

	}

	get profileUtama(): HTMLButtonElement {
		return this.getEl('div.atas div.utama button.profile') as HTMLButtonElement;
	}

	get profilePasangan(): HTMLButtonElement {
		return this.getEl('div.atas div.pasangan button.profile') as HTMLButtonElement;
	}

	get bawah(): HTMLDivElement {
		return this.getEl('div.bawah') as HTMLDivElement;
	}

	get nama(): HTMLDivElement {
		return this.getEl('div.utama div.nama') as HTMLDivElement;
	}

	get img(): HTMLImageElement {
		return this.getEl('div.utama img.foto') as HTMLImageElement;
	}

	get foto(): HTMLDivElement {
		return this.getEl('div.utama div.foto') as HTMLDivElement;
	}

	get fotoPasangan(): HTMLDivElement {
		return this.getEl('div.pasangan div.foto') as HTMLDivElement;
	}

	get utama(): HTMLDivElement {
		return this.getEl('div.utama') as HTMLImageElement;
	}

	get pasangan(): HTMLDivElement {
		return this.getEl('div.pasangan') as HTMLDivElement;
	}

	get imgPasangan(): HTMLImageElement {
		return this.getEl('div.pasangan img.foto') as HTMLImageElement;
	}

	get namaPasangan(): HTMLDivElement {
		return this.getEl('div.pasangan div.nama') as HTMLDivElement;
	}

	get hubungCont(): HTMLDivElement {
		return this.getEl('div.hubung-cont') as HTMLDivElement;
	}


}

export class Hubung extends BaseComponent {
	constructor() {
		super();
		this._template = `
			<div class='hubung'>
				<div class='kiri'></div>
				<div class='kanan'></div>
			</div>
		`;
		this.build();
	}

	get hubungDiv(): HTMLDivElement {
		return this.getEl('div.hubung') as HTMLDivElement;
	}

	get kanan(): HTMLDivElement {
		return this.getEl('div.hubung div.kanan') as HTMLDivElement;
	}
	get kiri(): HTMLDivElement {
		return this.getEl('div.hubung div.kiri') as HTMLDivElement;
	}


}

var app: App = new App();

window.onload = () => {
	let w: any = window;
	w.app = app;

	app.renderAnggota(data, document.body.querySelector('div.silsilah-cont') as HTMLDivElement, -1, true);

	window.document.body.onclick = () => {
		console.log('window on click')
	}
}


