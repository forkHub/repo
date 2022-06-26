class VarisiViewItem extends ha.comp.BaseComponent {
	private _item: IVarIsi;

	private menu: ha.comp.MenuPopup;
	private varCont: HTMLElement;
	private expCont: HTMLElement;

	constructor(item: IVarIsi) {
		super();
		this._template = `
			<div class='var-isi padding-4'>
				<div class='border padding-4 wbreak-keep-all wspace-nowrap'>

					<div class='padding disp-inline-block'>
						<button class='menu'>|||</button>
					</div>

					<div class='padding disp-inline-block wspace-nowrap'>
						<div class='var-cont disp-inline-block'>
						</div>
						<div class='sama-dengan disp-inline-block padding'>=
						</div>
						<div class='exp-cont disp-inline-block'>
						</div>
					</div>

					<div class="debug disp-none"></div>

					</div>

				</div>
			</div>
		`;

		this.build();
		this._elHtml.setAttribute('id', item.id + '');
		this._item = item;
		this.varCont = this.getEl('div.var-cont');
		this.expCont = this.getEl('div.exp-cont');
		this.debug();
		this.init();

		//tombol
		this.getEl('button.menu').onclick = (e: MouseEvent) => {
			e.stopPropagation();

			this.menu.view.attach(document.body);
		}

		this.expCont.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			arg.formArg.attach(document.body);
			arg.formArg.selesai = () => {
				if (arg.formArg.tipeArg == ARG_REF) {
					this.varCont.innerText = Variable.nama(parseInt(arg.formArg.value));
					this._item.expValue = arg.formArg.value;
					this._item.expTipe = ARG_REF;
				}
				else if (arg.formArg.tipeArg == ARG_VALUE) {
					this.varCont.innerText = arg.formArg.value;
					this._item.expTipe = ARG_VALUE;
					this._item.expValue = arg.formArg.value;
				}
				else {
					throw new Error(arg.formArg.tipeArg);
				}
				dataObj.simpan();
			}
		}

		this.varCont.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			dlgPilihVariable.view.attach(document.body);
			dlgPilihVariable.tampil();
			dlgPilihVariable.finish = () => {
				this.varCont.innerText = Variable.nama(dlgPilihVariable.varDipilih);
				this._item.varId = dlgPilihVariable.varDipilih;
				dataObj.simpan();
			}
		}



	}

	private debug(): void {
		this.getEl('div.debug').innerText = JSON.stringify(this._item);

		if (this._item.varId > 0) {
			this.getEl('div.debug').innerText += "-----";
			this.getEl('div.debug').innerText += JSON.stringify(Variable.getVar(this._item.varId));
		}

	}

	// static buat(obj: IVarIsi): VarisiViewItem {
	// 	let hasil: VarisiViewItem = new VarisiViewItem(obj);
	// 	hasil.init();
	// 	return hasil;
	// }

	destroy(): void {
		super.destroy();
		this._item = null;
		this.menu.destroy();
	}

	private setupMenu(): void {
		this.menu = new ha.comp.MenuPopup();
		this.menu.buatTombol({
			label: 'delete',
			f: () => {
				Data.deleteVarIsi(this._item.id);
				this.destroy();
				dataObj.simpan();
			}
		})
	}

	private init(): void {
		this.setupVar();
		this.setupExp();
		this.setupMenu();
	}

	/*
	setupWadah(): void {
		let argObj: IArg;
		let argView: ViewWadah;

		console.group('setup wadah:');

		//nama variable
		argObj = this.revNamaVar();
		argView = new ViewWadah();
		argView.item = argObj;
		argView.attach(this.varCont);
		argView.terima.push(TY_VARIABLE);
		argView.diupdate = () => {
			dataObj.simpan();
		}
		// this._item.refVarId = argObj.id;
		VarIsi.varRef(this._item, argObj.id);

		//value/referensi/fungsi
		//value/referensi
		argObj = this.argVar();
		argView = new ViewWadah();
		argView.item = argObj;
		argView.attach(this.argCont);
		argView.terima.push(TY_VARIABLE);
		argView.terima.push(TY_VALUE);
		argView.diupdate = () => {
			dataObj.simpan();
		}
		this._item.refExpId = argObj.id;

		//value/referensi
		//bila binop

		console.log('setup wadah 2');
		console.groupEnd();
	}
	*/

	private setupExp(): void {
		if (this._item.expTipe == ARG_VALUE) {
			this.expCont.innerText = this._item.expValue;
		}
		else if (this._item.expTipe == ARG_REF) {
			this.expCont.innerText = Variable.nama(this._item.expId);
		}
		else {
			throw Error('');
		}

		console.log('this._item.expTipe: ' + this._item.expTipe);
		console.log('this._item.expValue: ' + this._item.expValue);
		console.log('this.expCont.innerText ' + this.expCont.innerText);

	}

	private setupVar(): void {
		console.log('setup var:');
		console.log('this._item.varId: ' + this._item.varId);

		if (this._item.varId > 0) {
			this.varCont.innerText = Variable.nama(this._item.varId);
		}
		else {
			this.varCont.innerText = '---';
		}
	}

	// get varCont(): HTMLDivElement {
	// 	return this.getEl('div.var-cont') as HTMLDivElement;
	// }

	// get argCont(): HTMLDivElement {
	// 	return this.getEl('div.arg-cont') as HTMLDivElement;
	// }

}