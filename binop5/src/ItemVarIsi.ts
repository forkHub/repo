class ItemVarIsi extends ha.comp.BaseComponent {
	private _item: IVarIsi;
	public get item(): IVarIsi {
		return this._item;
	}
	public set item(value: IVarIsi) {
		this._item = value;
	}

	constructor(item: IVarIsi) {
		super();
		this._template = `
			<div class='var-isi'>
				<div class='var-cont'>
				</div>
				<div class='sama-dengan'>
					=
				</div>
				<div class='arg-cont'>
				</div>
			</div>
		`;
		this.build();

		this._elHtml.style.wordBreak = 'keep-all';
		this.getEl('div.var-cont').style.display = 'inline-block';
		this.getEl('div.arg-cont').style.display = 'inline-block';

		this.item = item;
		this.init().catch((e) => {
			console.error(e);
		})
	}

	async init(): Promise<void> {
		await this.setupWadah();
	}

	async setupWadah(): Promise<void> {
		let argObj: IArg;
		let argView: ViewWadah;

		argObj = await this.buatArgDelay();
		argView = new ViewWadah();
		argView.item = argObj;
		argView.attach(this.varCont);
		argView.terima.push(TY_VARIABLE);

		argObj = await this.buatArgDelay();
		argView = new ViewWadah();
		argView.item = argObj;
		argView.attach(this.argCont);
		argView.terima.push(TY_VARIABLE);
		argView.terima.push(TY_VALUE);
	}

	async buatArgDelay(): Promise<IArg> {
		await ha.comp.Util.delay(1);

		return {
			id: ha.comp.Util.id(),
			refParamId: 0,
			indukId: this._item.id,
			nama: '',
			type: TY_ARG,
			tipeArg: ARG_VALUE,
			value: '0'
		}
	}

	get varCont(): HTMLDivElement {
		return this.getEl('div.var-cont') as HTMLDivElement;
	}

	get argCont(): HTMLDivElement {
		return this.getEl('div.arg-cont') as HTMLDivElement;
	}

}