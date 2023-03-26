namespace md {

	export class Modul implements IModul {
		private _induk: number = 0;
		readonly type: string = "modul";
		private _id: number = 0;
		private _nama: string = "modul_default";
		private _anak: number[] = [];
		static readonly daftar: IModul[] = [];

		private static _modulAktif: IModul;

		static load(data: IData[]): void {
			data.forEach((item: IData) => {
				if ('modul' == item.type) {
					console.group('load modul ' + item.id);
					let obj: IModul = JSON.parse(item.meta);
					Modul.buat(obj.nama, obj.id);
					console.groupEnd();
				}
			});
		}

		static hapusAktif(): void {
			for (let i: number = 0; i < this.daftar.length; i++) {
				if (this.daftar[i].id == this.modulAktif.id) {
					this.daftar.splice(i, 1);
				}
			}
			this.modulAktif = null;
		}

		static reset(): void {
			while (this.daftar.length > 0) {
				this.daftar.pop();
			}
			this._modulAktif = null;
		}

		static toDao(data: IData[]): void {
			this.daftar.forEach((item: IModul) => {

				let obj: IModul = {
					id: item.id,
					anak: item.anak,
					induk: item.induk,
					nama: item.nama,
					type: item.type
				}

				console.log('simpan');
				console.log(obj);
				console.log(item);

				data.push({
					id: item.id,
					type: item.type,
					meta: JSON.stringify(obj)
				});
			});
		}

		static buat(nama: string, id: number): Modul {
			let hasil: Modul;

			console.group('buat modul');

			hasil = new Modul();

			hasil.id = id;
			hasil.nama = nama;

			// this.tambahEvt.forEach((item: IModulEvt) => {
			// 	item.baru(hasil);
			// });

			if (this._modulAktif) {
				this._modulAktif.anak.push(hasil.id);
			}

			this.daftar.push(hasil);

			// this._onBuat(hasil);

			console.groupEnd();

			return hasil;
		}

		public get induk(): number {
			return this._induk;
		}
		public set induk(value: number) {
			this._induk = value;
		}
		public static get modulAktif(): IModul {
			return this._modulAktif;
		}
		public static set modulAktif(value: IModul) {
			this._modulAktif = value;
		}

		// public static get tambahEvt(): IModulEvt[] {
		// 	return Modul._tambahEvt;
		// }
		// public static set tambahEvt(value: IModulEvt[]) {
		// 	Modul._tambahEvt = value;
		// }

		public get id(): number {
			return this._id;
		}
		public set id(value: number) {
			this._id = value;
		}
		public get nama(): string {
			return this._nama;
		}
		public set nama(value: string) {
			this._nama = value;
		}
		public get anak(): number[] {
			return this._anak;
		}
		public set anak(value: number[]) {
			this._anak = value;
		}
	}

	// Modul.onBuat = (item: IModul) => {
	// halModul.baru(item);
	// item; //TODO:
	// }
}