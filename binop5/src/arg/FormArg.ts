namespace arg {

	/**
	 * Form untuk edit argument property
	 */
	class FormArg extends ha.comp.BaseComponent {
		private _item: IArg;
		private _refId: number;
		readonly terima: string[] = [];

		public get refId(): number {
			return this._refId;
		}
		public set refId(value: number) {
			this._refId = value;
		}

		public get item(): IArg {
			return this._item;
		}
		public set item(value: IArg) {
			this._item = value;
		}

		constructor() {
			super();
			this._elHtml = this.getTemplate('div.edit-arg');
			// this.item = item;

			this.form.onsubmit = (e: Event) => {
				e.preventDefault();
				e.stopPropagation();
				try {
					let tipe: string = this.tipe.value;
					let value: string = this.literal.value;

					this._item.tipeArg = tipe;
					this._item.value = value;

					this.detach();
				}
				catch (e) {
					console.error(e);
				}

				return false;
			}

			this.browse.onclick = (e: MouseEvent) => {
				e.stopPropagation();
				console.log('browse click');
				// PilihVariable./
				this.detach();
				pilihVariable.finish = () => {
					this.attach(document.body);
				}
				pilihVariable.tampil(this.item);
			}
		}

		setTerima(terima: string[]): void {
			terima; //TODO:
		}

		tampil(): void {
		}

		get form(): HTMLFormElement {
			return this.getEl('form') as HTMLFormElement;
		}

		get tipe(): HTMLInputElement {
			return this.getEl('input[name=tipe_arg]') as HTMLInputElement;
		}

		get literal(): HTMLInputElement {
			return this.getEl('input[name=literal]') as HTMLInputElement;
		}

		get browse(): HTMLButtonElement {
			return this.getEl('button.browse') as HTMLButtonElement;
		}


		get itemDiv(): HTMLDivElement {
			return this.getEl('item-var-ref') as HTMLDivElement;
		}
	}
	export var formArg: FormArg = new FormArg();

}
