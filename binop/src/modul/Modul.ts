namespace md {
	export class Modul implements IModul {
		private _id: number = 0;
		private _nama: string = "modul_default";
		private _anak: number[] = [];
		private static _tambahEvt: IModulEvt[];

		public static get tambahEvt(): IModulEvt[] {
			return Modul._tambahEvt;
		}
		public static set tambahEvt(value: IModulEvt[]) {
			Modul._tambahEvt = value;
		}

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

		static buat(nama: string): Modul {
			let hasil: Modul = new Modul();

			hasil.id = ha.comp.Id.id;
			hasil.nama = nama;

			this.tambahEvt.forEach((item: IModulEvt) => {
				item.baru(hasil);
			});

			return hasil;
		}
	}
}