namespace ha.sl {
	export class Data {
		readonly HAL_PROFILE: string = '#hal_profile';
		readonly HAL_DEPAN: string = '#hal_depan';
		readonly HAL_LOGIN: string = '#hal_login';

		private _iframe: string = '';
		private _url: string = '';
		private _anggotaAktifId: string = '';
		private _halDepanDilihat: boolean = false;
		private _halTerakhir: string;
		private _halRedirect: string;
		private _halTarget: string;
		private _loginTerakhir: number = 0;

		public get loginTerakhir(): number {
			return this._loginTerakhir;
		}
		public set loginTerakhir(value: number) {
			this._loginTerakhir = value;
		}


		public get halTarget(): string {
			return this._halTarget;
		}
		public set halTarget(value: string) {
			this._halTarget = value;
		}

		public get halRedirect(): string {
			return this._halRedirect;
		}
		public set halRedirect(value: string) {
			this._halRedirect = value;
		}

		reg(setter: Function, getter: Function): void {
			ha.comp.bind.reg(setter, getter);
		}

		update(): void {
			ha.comp.bind.update();
		}

		public get iframe(): string {
			return this._iframe;
		}

		public set iframe(value: string) {
			this._iframe = value;
			this.update();
		}

		public get anggotaAktifId(): string {
			return this._anggotaAktifId;
		}
		public set anggotaAktifId(value: string) {
			this._anggotaAktifId = value;
			this.update();
		}

		public get url(): string {
			return this._url;
		}
		public set url(value: string) {
			this._url = value;
			this.update();
		}

		public get halDepanDilihat(): boolean {
			return this._halDepanDilihat;
		}
		public set halDepanDilihat(value: boolean) {
			this._halDepanDilihat = value;
			this.update();
		}
		public get halTerakhir(): string {
			return this._halTerakhir;
		}
		public set halTerakhir(value: string) {
			this._halTerakhir = value;
		}


	}
}