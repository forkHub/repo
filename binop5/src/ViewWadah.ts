///<reference path="./comp/BaseComponent.ts"/>

class ViewWadah extends ha.comp.BaseComponent {
	private _item: IArg;
	private _diupdate: () => void;

	public set diupdate(value: () => void) {
		this._diupdate = value;
	}

	public get item(): IArg {
		return this._item;
	}
	public set item(value: IArg) {
		this._item = value;
		this.updateView();
	}

	readonly terima: string[] = [];

	constructor() {
		super();
		this._template = `
			<div class='wadah wspace-nowrap border'>
				<div class='menu disp-inline-block'>
					<button>|||</button>
				</div>
				<div class='wadah2 disp-inline-block'>

				</div>
			</div>
		`;
		this.build();

		this._elHtml.style.display = 'iniline-block';
		this.wadahDiv.style.minWidth = '48px';

		this.menuTbl.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			console.log('menu klik');
			arg.formArg.attach(document.body);
			arg.formArg.setTerima(this.terima);
			arg.formArg.selesai = () => {

				this._item.tipeArg = arg.formArg.tipeArg;
				this._item.value = arg.formArg.value;

				this.updateView();

				// if (this._item.tipeArg == ARG_VALUE) {
				// 	this.wadahDiv.innerText = this._item.value;
				// }
				// else if (this._item.tipeArg == ARG_REF) {
				// 	let id: number = 0;
				// 	id = parseInt(this._item.value);
				// 	this.wadahDiv.innerText = Data.namavar(id);
				// }
				// else if (this._item.tipeArg == ARG_REF_FUNGSI) {
				// 	//TODO:
				// }
				// else {
				// 	throw Error('');
				// }

				// console.log('form arg selesai:');
				// console.log('tipe arg: ' + arg.formArg.tipeArg);
				// console.log('value: ' + arg.formArg.value);
				// console.log(this._item.tipeArg);
				// console.log(this._item.value);

				this._diupdate();
			}
		}
	}

	private updateView(): void {
		this._elHtml.setAttribute('tipe-arg', this._item.tipeArg);
		if (this._item.tipeArg == ARG_VALUE) {
			this.wadahDiv.innerText = this._item.value;
		}
		else if (this._item.tipeArg == ARG_REF) {
			let id: number = 0;
			id = parseInt(this._item.value);

			if (this._item.value == '-1') {
				this.wadahDiv.innerText = '---';
			}
			else {
				this.wadahDiv.innerText = Variable.nama(id);
			}
		}
		else if (this._item.tipeArg == ARG_REF_FUNGSI) {
			throw Error('');
		}
		else {
			throw Error('');
		}

	}


	private get menuTbl(): HTMLButtonElement {
		return this.getEl('div.menu button') as HTMLButtonElement;
	}

	private get wadahDiv(): HTMLDivElement {
		return this.getEl('div.wadah2') as HTMLDivElement;
	}


}