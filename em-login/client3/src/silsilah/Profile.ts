namespace ha.sl {
	class Data {
		private _nama: string;
		public get nama(): string {
			return this._nama;
		}
		public set nama(value: string) {
			this._nama = value;
			ha.comp.bind.update();
		}

		private _namaLengkap: string;
		public get namaLengkap(): string {
			return this._namaLengkap;
		}
		public set namaLengkap(value: string) {
			this._namaLengkap = value;
			ha.comp.bind.update();
		}

		private _jkl: string;
		public get jkl(): string {
			return this._jkl;
		}
		public set jkl(value: string) {
			this._jkl = value;
			ha.comp.bind.update();
		}

		private _alamat: string;
		public get alamat(): string {
			return this._alamat;
		}
		public set alamat(value: string) {
			this._alamat = value;
			ha.comp.bind.update();
		}

		private _tglLahir: string;
		public get tglLahir(): string {
			return this._tglLahir;
		}
		public set tglLahir(value: string) {
			this._tglLahir = value;
			ha.comp.bind.update();
		}

		private _tglMeninggal: string;
		public get tglMeninggal(): string {
			return this._tglMeninggal;
		}
		public set tglMeninggal(value: string) {
			this._tglMeninggal = value;
			ha.comp.bind.update();
		}

		private _fb: string;
		public get fb(): string {
			return this._fb;
		}
		public set fb(value: string) {
			this._fb = value;
			ha.comp.bind.update();
		}

		private _wa: string;
		public get wa(): string {
			return this._wa;
		}
		public set wa(value: string) {
			this._wa = value;
			ha.comp.bind.update();
		}

		private _instagram: string;
		public get instagram(): string {
			return this._instagram;
		}
		public set instagram(value: string) {
			this._instagram = value;
			ha.comp.bind.update();
		}

		private _pasanganState: string;
		public get pasanganState(): string {
			return this._pasanganState;
		}
		public set pasanganState(value: string) {
			this._pasanganState = value;
			ha.comp.bind.update();
		}

		private _tautanState: string;
		public get tautanState(): string {
			return this._tautanState;
		}
		public set tautanState(value: string) {
			this._tautanState = value;
			ha.comp.bind.update();
		}

		private _anakState: string;
		public get anakState(): string {
			return this._anakState;
		}
		public set anakState(value: string) {
			this._anakState = value;
			ha.comp.bind.update();
		}

		private _kerabatState: string;
		public get kerabatState(): string {
			return this._kerabatState;
		}
		public set kerabatState(value: string) {
			this._kerabatState = value;
			ha.comp.bind.update();
		}
	}

	export class Profile {
		readonly data: Data = new Data();

		async init(): Promise<void> {
			this.scanBind();

			let id: string = this.getId();
			this.loadProfile(id);
		}

		getId(): string {
			let id: string;

			//get id
			console.log('get Id:');
			console.log(window.top.location.search);

			let search: string[] = window.top.location.search.slice(1).split('&');
			console.log('search:');
			console.log(search);

			search.forEach((item: string) => {
				let kv: string[] = item.split('=');
				if ('id' == kv[0]) {
					id = kv[1]
				}
			})

			return id;
		}

		halProfile(id: string): string {
			return `${config.server}/profile.html?id=${id}`;
		}

		scanBind(): void {
			// console.group('scan api:');

			document.body.querySelectorAll('[data-bind]').forEach((item: Element) => {
				let attr: string = item.getAttribute('data-bind');
				// console.log(attr);

				ha.comp.bind.reg(() => {
					let data: any = this.data;
					item.innerHTML = data[attr];
					// console.log('update ' + attr);
				}, (): string => {
					let data: any = this.data;
					return (data[attr] as string);
				})
			});

			console.groupEnd();
		}

		async loadProfile(id: string): Promise<void> {

			let data: any = {
				id: id
			};

			console.log('load profile');
			console.log(data);

			let url: string = ha.sl.config.nodeServer + ha.sl.RouterAPI2Kons.api_profile_lihat;
			let xml: XMLHttpRequest = await ha.comp.Util.Ajax('post', url, JSON.stringify(data));

			if (200 == xml.status) {
				let angg: ISlAnggota = (JSON.parse(xml.responseText));
				this.data.alamat = angg.alamat;
				this.data.nama = angg.nama;
				this.data.namaLengkap = angg.nama_lengkap;
				this.data.fb = angg.fb;
				this.data.instagram = angg.instagram;
				this.data.jkl = angg.jkl;
				this.data.tglLahir = this.dateTimeStamp(angg.tgl_lahir);
				this.data.tglMeninggal = this.dateTimeStamp(angg.tgl_meninggal);
				this.data.wa = angg.wa;

				ha.comp.Util.getElByNama('pasangan-cont', document.body).innerHTML = this.renderPasangan(angg);
				ha.comp.Util.getElByNama('anak-cont', document.body).innerHTML = this.renderDaftarAnak(angg.anak);
				ha.comp.Util.getElByNama('kerabat-cont', document.body).innerHTML = this.renderKerabat(angg);
				ha.comp.Util.getElByNama('tautan-cont', document.body).innerHTML = this.renderTautan(angg);

			}
			else if (401 == xml.status) {
				console.log('belum login');
			}
			else {
				console.warn('error', xml.statusText);
				ha.comp.dialog.tampil('Ada kesalahan di server!');
			}
		}

		renderPasangan(anggota: ISlAnggota): string {
			if (anggota.pas) {
				return `
				<a class="pasangan" href="${this.halProfile(anggota.pas.id + '')}"> ${anggota.pas.nama} </a>`;
			}
			else {
				return `<p class="text-muted font-size-sm">tidak ada data</p>`;
			}
		}

		private tglLebihBesar(tgl1: string, tgl2: string): boolean {
			let tgl1a: Date = new Date(tgl1);
			let tgl2a: Date = new Date(tgl2);

			if (tgl1a > tgl2a) return true;
			return false;
		}

		private renderLek(anggota: ISlAnggota): string {
			let hasil: string = '';
			let dhe: string = '';

			anggota.lek.forEach((item: ISlAnggota) => {
				if (item.jkl == 'l') {
					if (this.tglLebihBesar(anggota.tgl_lahir, item.tgl_lahir)) {
						dhe = 'pakdhe';
					}
					else {
						dhe = 'paklek';
					}
					hasil += this.renderkerabat2([item], dhe);
				}
				else {
					if (this.tglLebihBesar(anggota.tgl_lahir, item.tgl_lahir)) {
						dhe = 'budhe';
					}
					else {
						dhe = 'bulek';
					}
					hasil += this.renderkerabat2([item], dhe);
				}
			});

			return hasil;
		}

		renderKerabat(anggota: ISlAnggota): string {
			let hasil: string = '';

			hasil += this.renderkerabat2(anggota.mbah, 'mbah');
			hasil += this.renderkerabat2(anggota.ortu, 'orang tua');
			hasil += this.renderLek(anggota);
			hasil += this.renderkerabat2(anggota.saudara, 'saudara');
			hasil += this.renderkerabat2(anggota.sepupu, 'sepupu');
			hasil += this.renderkerabat2(anggota.ponakan, 'ponakan');
			hasil += this.renderkerabat2(anggota.cucu, 'cucu');

			return hasil;
		}

		//render daftar kerabat detail
		private renderkerabat2(daftar: ISlAnggota[], label: string): string {
			let hasil: string = '';

			daftar.forEach((anggota: ISlAnggota) => {
				let el: string = `
				<div class='margin-bottom-8' id=${anggota.id}>
					<a class="" href="${this.halProfile(anggota.id + '')}">${anggota.nama_lengkap} (${label})</a>
				</div>`;

				hasil += el;
			});

			return hasil;
		}

		renderDaftarAnak(anggotaAr: ISlAnggota[]): string {

			let hasil: string = ``;

			if (anggotaAr.length == 0) {
				return `<p class="text-muted font-size-sm">tidak ada data</p>`;
			}

			anggotaAr.forEach((anggota: ISlAnggota) => {
				let el: string = `
				<div class='margin-bottom-8' id=${anggota.id}>
					<a class="" href="${this.halProfile(anggota.id + '')}">${anggota.nama_lengkap}</a>
				</div>`;

				hasil += el;
			});

			return hasil;
		}

		private renderTautan(anggota: ISlAnggota): string {
			return `<a href="${config.server}?id=${anggota.id}" ">tautan silsilah</a>`;
		}

		dateTimeStamp(t: string): string {
			console.log('date time stamp, input: ' + t);

			if (!t) return '---';
			if ('' == t) return '---';

			t = t + '';

			let date: Date = new Date(t);

			if (!date) return '---';
			if ('Invalid Date' == (date + '')) return '---';

			let dateStr: string = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

			console.log('date time stamp, hasil: ' + dateStr);
			return dateStr;
		}
	}
}

var profile: ha.sl.Profile;
window.onload = () => {
	profile = new ha.sl.Profile();
	profile.init();
}