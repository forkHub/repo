//TODO: namespace bisa dihapus
namespace arg {

	/**
	 * Form untuk edit argument property
	 */
	class FormArg extends ha.comp.BaseComponent {
		readonly terima: string[] = [];
		private _tipeArg: string;
		private _value: string;
		private _selesai: () => void;

		public set selesai(value: () => void) {
			this._selesai = value;
		}

		public get value(): string {
			return this._value;
		}
		public set value(value: string) {
			this._value = value;
		}

		public get tipeArg(): string {
			return this._tipeArg;
		}
		public set tipeArg(value: string) {
			this._tipeArg = value;
		}

		constructor() {
			super();
			this._elHtml = this.getTemplate('div.edit-arg');

			this.form.onsubmit = (e: Event) => {
				e.preventDefault();
				e.stopPropagation();
				try {
					this._tipeArg = this.tipeInputHtml.value;

					if (this._tipeArg == ARG_VALUE) {
						this._value = this.literalHtml.value;
					}
					else if (this._tipeArg == ARG_REF) {

					}
					else if (this._tipeArg == ARG_REF_FUNGSI) {

					}
					else {
						throw Error('')
					}

					this.detach();

					console.group('form on submit:');
					console.log('tipe: ' + this._tipeArg);
					console.log('value: ' + this._value);
					console.log('input value: ' + this.literalHtml.value);
					console.groupEnd();

					this._selesai();
				}
				catch (e) {
					console.error(e);
				}

				return false;
			}

			// this.literalHtml.onchange = (e: Event) => {
			// 	console.log(e.currentTarget);
			// }

			// this.literalHtml.oninput = (e: Event) => {
			// console.log(e.currentTarget);
			// e;
			// console.log(this.literalHtml.value);
			// }

			this.browse.onclick = (e: MouseEvent) => {
				e.stopPropagation();
				console.log('browse click');
				pilihVariable.finish = () => {
					this._value = pilihVariable.varDipilih + '';
					this.literalHtml.value = Variable.nama(pilihVariable.varDipilih);
					// this.literalHtml.innerText = this.namaVar(pilihVariable.varDipilih);

					console.log('pilih var finish: ' + pilihVariable.varDipilih);
					console.log(this.literalHtml);
					console.log('value: ' + this.literalHtml.value);
					console.log('text: ' + this.literalHtml.innerText);
					console.log('this.value: ' + this._value);
					console.log('nama var: ' + Variable.nama(pilihVariable.varDipilih));
				}
				pilihVariable.tampil();
			}

			(this.getEl('button.batal') as HTMLButtonElement).onclick = (e: MouseEvent) => {
				e.stopPropagation();
				this.detach();
			};
		}


		// private namaVar(id: number): string {
		// 	for (let i: number = 0; i < dataObj.variableAr.length; i++) {
		// 		if (dataObj.variableAr[i].id == id) {
		// 			console.log('nama var ' + dataObj.variableAr[i].nama);
		// 			return dataObj.variableAr[i].nama;
		// 		}
		// 	}

		// 	return '';
		// }

		setTerima(terima: string[]): void {
			terima; //TODO:
		}

		tampil(): void {
			//TODO:atur tampilan sesuai dengan terima
		}

		private get form(): HTMLFormElement {
			return this.getEl('form') as HTMLFormElement;
		}

		private get tipeInputHtml(): HTMLInputElement {
			return this.getEl('input[name=tipe_arg]') as HTMLInputElement;
		}

		private get literalHtml(): HTMLInputElement {
			return this.getEl('input[name=literal]') as HTMLInputElement;
		}

		private get browse(): HTMLButtonElement {
			return this.getEl('button.browse') as HTMLButtonElement;
		}

	}
	export var formArg: FormArg = new FormArg();
	//TODO: bisa dibuat static karena cuman satu

}
