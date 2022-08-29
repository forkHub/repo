declare var data: ISlAnggota;

namespace ha.sl {
	export class Depan {

		constructor() {
		}

		async init(): Promise<void> {
			let id: string = ha.comp.Util.getQueryId();
			if (id) {
				await this.loadRenderAnggota(id);
			}
			else {
				await this.loadRenderAnggota(config.defaultId);
			}
		}

		async loadRenderAnggota(id: string): Promise<void> {
			let data: any = {
				id: id
			};

			let url: string = ha.sl.config.nodeServer + ha.sl.RouterAPI2Kons.api_anggota_lihat;

			try {
				let xml: XMLHttpRequest = await ha.comp.Util.Ajax('post', url, JSON.stringify(data));

				if (200 == xml.status) {
					console.log("sukses");
					let angg: ISlAnggota = (JSON.parse(xml.responseText));
					let cont: HTMLDivElement = document.body.querySelector('div.silsilah-cont') as HTMLDivElement;
					cont.innerHTML = '';
					this.renderAnggota(angg, cont, -1, true);
				}
				else if (401 == xml.status) {
					console.log('belum login');
					window.top.location.href = config.server + '/login.html';
				}
				else {
					console.warn('error', xml.statusText);
					ha.comp.dialog.tampil('Ada kesalahan di server!');
				}
			}
			catch (e) {
				ha.comp.Util.error(e);
			}

		}

		async loadAnak(anggota: ISlAnggota): Promise<void> {
			let anak: ISlAnggota[] = await ha.sl.anggotaDao.bacaAnak(anggota);
			anak.forEach((item: ISlAnggota) => {
				item.populated = false;
			})
			anggota.anak = anak || [];
		}

		async loadPasangan(view: AnggotaView): Promise<void> {
			if (view.anggota.rel_id) {
				console.debug('load pasangan');
				let pas: ISlAnggota = (await ha.sl.anggotaDao.bacaPasangan(view.anggota))[0];
				if (pas) {
					// console.debug('pasangan loaded');
					view.anggota.pasangan_id = pas.id;
					view.anggota.pas = pas;
				}
				else {
					console.debug('pasangan tidak ketemu');
				}
			}
			else {
				console.debug('pasangan relasi tidak ada')
			}

		}

		async populateAnggota(view: AnggotaView): Promise<void> {
			if (!view.anggota.populated) {
				console.debug('anggota belum di populate');
				view.anggota.populated = true;

				await this.loadPasangan(view);
				await this.loadAnak(view.anggota);
			}
			else {
				console.log('anggota sudah diload');
			}
		}

		renderAnggota(anggota: ISlAnggota, cont: HTMLDivElement, indek: number, loadOtomatis: boolean): void {
			let view: AnggotaView = new AnggotaView();

			view.anggota = anggota;
			view.nama.innerHTML = anggota.nama;
			view.profileUtama.setAttribute('id', anggota.id + '');

			this.renderImage(view, anggota.foto);
			view.attach(cont);

			this.renderHubung(indek, view.hubungCont);

			view.profileUtama.onclick = (e: MouseEvent) => {
				this.profileUtamaKlik(e);
			}

			view.profilePasangan.onclick = (e: MouseEvent) => {
				this.profilePasanganKlik(e);
			}

			view.utama.onclick = (evt: MouseEvent) => {
				evt.stopPropagation();
				this.anggotaKlik(view);
			}

			if (loadOtomatis) {
				this.anggotaKlik(view);
			}
		}

		renderImage(view: AnggotaView, fotoUrl: any): void {
			view.img.onerror = () => {
				console.log("image on error:");
				console.log(view.img.src);
				view.foto.style.backgroundImage = 'url(' + config.nodeServer + '/gbr/thumb.png' + ')';
				console.log(view.foto.style.backgroundImage);
			}

			view.img.onload = () => {
				console.log('img on load');
				view.foto.style.backgroundImage = 'url(' + view.img.src + ')';
			}
			view.img.src = fotoUrl ? fotoUrl : config.nodeServer + '/gbr/thumb.png';
			view.foto.style.backgroundRepeat = 'no-repeat';
			view.foto.style.backgroundSize = 'cover';

		}

		renderHubung(idx: number, cont: HTMLDivElement): void {
			// console.log('render hubung, idx ' + hubung);

			let view: Hubung = new Hubung();
			view.kanan.classList.remove('border-kanan', 'border-kiri', 'border-atas', 'border-bawah');
			view.kiri.classList.remove('border-kanan', 'border-kiri', 'border-atas', 'border-bawah');

			if (idx == -1) {

			} else if (idx == 0) {
				view.kanan.classList.add('border-kiri');
				view.kiri.classList.add('border-kanan');
			} else if (idx == 1) {
				view.kiri.classList.add('border-kanan');
				view.kanan.classList.add('border-atas');
				view.kanan.classList.add('border-kiri');
			} else if (idx == 2) {
				view.kiri.classList.add('border-kanan');
				view.kiri.classList.add('border-atas');
				view.kanan.classList.add('border-atas');
				view.kanan.classList.add('border-kiri');

			} else if (idx == 3) {
				view.kiri.classList.add('border-atas');
				view.kiri.classList.add('border-kanan');
				view.kanan.classList.add('border-kiri');
			}

			view.attach(cont);
		}

		renderPasangan(view: AnggotaView): void {
			if (view.anggota.pas) {
				console.debug('render pasangan');
				view.namaPasangan.innerHTML = view.anggota.pas.nama;
				view.pasangan.classList.toggle('display-none');

				console.debug('pasangan loaded');

				view.imgPasangan.onload = () => {
					view.fotoPasangan.style.backgroundImage = 'url(' + view.imgPasangan.src + ')';
				}

				view.imgPasangan.onerror = () => {
					view.fotoPasangan.style.backgroundImage = 'url(' + config.nodeServer + '/gbr/thumb.png' + ')';
				}

				view.imgPasangan.src = view.anggota.pas.foto ? view.anggota.pas.foto : (config.nodeServer + '/gbr/thumb.png');

				view.profilePasangan.setAttribute('id', view.anggota.pas.id + '');
				view.fotoPasangan.style.backgroundRepeat = 'no-repeat';
				view.fotoPasangan.style.backgroundSize = 'cover';
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
		}

		renderAnak(view: AnggotaView): void {
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

		}

		async anggotaKlik(view: AnggotaView): Promise<void> {
			console.group('anggota klik');
			console.log(view.anggota);

			await this.populateAnggota(view);

			this.renderPasangan(view);
			this.renderAnak(view);

			//toggle view bawah
			view.bawah.classList.toggle('display-none');
			view.bawah.classList.toggle('display-table');

			console.groupEnd();
		}

		async profileUtamaKlik(e: MouseEvent): Promise<void> {
			e.stopPropagation();
			e.preventDefault();

			console.debug('utama on click');
			console.debug('id : ' + (e.currentTarget as HTMLButtonElement).getAttribute('id'));

			let id: string = (e.currentTarget as HTMLButtonElement).getAttribute('id');
			window.top.location.href = (config.server + "/profile.html?id=" + id);
		}

		async profilePasanganKlik(e: MouseEvent): Promise<void> {
			e.stopPropagation();
			e.preventDefault();

			console.debug('pasangan on click');
			console.debug('id : ' + (e.currentTarget as HTMLButtonElement).getAttribute('id'));

			let id: string = (e.currentTarget as HTMLButtonElement).getAttribute('id');

			window.top.location.href = (config.server + "/profile.html?id=" + id);
		}

	}

	class AnggotaView extends ha.comp.BaseComponent {
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

	class Hubung extends ha.comp.BaseComponent {
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
}

window.onload = () => {
	var app: ha.sl.Depan = new ha.sl.Depan();
	app.init();


	window.document.body.onclick = () => {
		console.log('window on click')
	}
}



