namespace ha.sl {
	export class Data {
		readonly HAL_PROFILE: string = '#hal_profile';
		readonly HAL_DEPAN: string = '#hal_depan';
		// readonly server: string = 

		private _iframe: string = '';
		private _url: string = '';
		private _anggotaAktifId: string = '';
		private _halDepanDilihat: boolean = false;

		// private bindList: IBindObj[] = [];

		reg(setter: Function, getter: Function): void {
			// let bindObj = {
			// 	data: '',
			// 	setter: setter,
			// 	getter: getter
			// }
			ha.comp.bind.reg(setter, getter);
			// this.bindList.push(bindObj);

			// let data: any = bindObj.getter();
			// bindObj.data = this.serialize(data);
		}

		// serialize(data: any): string {
		// 	try {
		// 		return JSON.stringify(data);
		// 	}
		// 	catch (e) {
		// 		return data + '';
		// 	}
		// }

		update(): void {
			ha.comp.bind.update();
			// console.log('update');
			// this.bindList.forEach((item: IBindObj) => {
			// 	let data: any = item.getter();
			// 	data = this.serialize(data);
			// 	if (item.data != data) {
			// 		console.debug('data terupdate');
			// 		item.setter();
			// 		item.data = data;
			// 	}
			// 	else {
			// 		console.log('data tidak terupdate');
			// 		//debug
			// 	}
			// })
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


	}
}