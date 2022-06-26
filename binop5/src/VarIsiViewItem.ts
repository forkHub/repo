class VarisiViewItem extends ha.comp.BaseComponent {
	private _item: IVarIsi;
	public get item(): IVarIsi {
		return this._item;
	}
	public set item(value: IVarIsi) {
		this._item = value;
	}

	private menu: ha.comp.MenuPopup;

	constructor(item: IVarIsi) {
		super();
		this._template = `
			<div class='var-isi border'>
				<div class='padding disp-inline-block'>
					<button class='menu'>|||</button>
				</div>
				<div class='var-cont disp-inline-block'>
				</div>
				<div class='sama-dengan disp-inline-block padding'>=
				</div>
				<div class='arg-cont disp-inline-block'>
				</div>
				<div class="debug disp-none"></div>
			</div>
		`;
		this.build();
		this._elHtml.setAttribute('id', item.id + '');

		this._elHtml.style.wordBreak = 'keep-all';
		this.getEl('div.var-cont').style.display = 'inline-block';
		this.getEl('div.arg-cont').style.display = 'inline-block';

		this.item = item;

		this.getEl('div.debug').innerText = JSON.stringify(this.item);

		if (this._item.refVarId > 0) {
			this.getEl('div.debug').innerText += "-----";
			this.getEl('div.debug').innerText += JSON.stringify(Variable.getVar(this._item.refVarId));
		}

		//tombol
		this.getEl('button.menu').onclick = (e: MouseEvent) => {
			e.stopPropagation();

			this.menu.view.attach(document.body);
		}

	}

	static buat(obj: IVarIsi): VarisiViewItem {
		let hasil: VarisiViewItem = new VarisiViewItem(obj);
		hasil.init();
		return hasil;
	}

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

	init(): void {
		this.setupWadah();
		this.setupMenu();
	}

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

	argVar(): IArg {

		if (this._item.refExpId > 0) {
			return Data.getArg(this._item.refExpId);
		}

		// ha.comp.Util.delay(10);
		let argObj: IArg = Data.buatArg(ARG_VALUE, this._item.id);

		return argObj;
	}

	revNamaVar(): IArg {
		if (this._item.refVarId > 0) {
			return Data.getArg(this._item.refVarId);
		}

		// ha.comp.Util.delay(10);
		let argObj: IArg = Data.buatArg(ARG_REF, this._item.id);

		return argObj;
	}

	get varCont(): HTMLDivElement {
		return this.getEl('div.var-cont') as HTMLDivElement;
	}

	get argCont(): HTMLDivElement {
		return this.getEl('div.arg-cont') as HTMLDivElement;
	}

}