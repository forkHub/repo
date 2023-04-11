class VarIsiEd extends ha.comp.BaseComponent {
	private _item: IVarIsi;

	private menu: ha.comp.MenuPopup;
	private varCont: HTMLElement;
	private expCont: HTMLElement;

	constructor(item: IVarIsi, del: boolean) {
		super();
		this._template = `
			<div class='var-isi disp-table'>

					<div class='disp-cell var-isi menu-cont padding-kanan'>
						<button class='menu'>|||</button>
					</div>

					<div class='disp-cell'>
						<div class='disp-table'>
							<div class='disp-cell padding-kanan'>
								<div class='var-isi var-cont border'>
								</div>
							</div>

							<div class='sama-dengan disp-cell padding-kanan user-select-none'>=
							</div>

							<div class='var-isi exp-cont disp-cell'>
							</div>
						</div>
					</div>

					<div class="debug disp-none"></div>

					</div>

			</div>
		`;

		this.build();

		if (!del) {
			this.getEl('div.var-isi.menu-cont').style.display = 'none';
		}

		this._elHtml.setAttribute('id', item.id + '');
		this._item = item;
		this.varCont = this.getEl('div.var-cont');
		this.expCont = this.getEl('div.exp-cont');

		// this.debug();
		this.init();
		this.setupEvent();
	}

	private setupEvent(): void {
		//tombol
		this.getEl('button.menu').onclick = (e: MouseEvent) => {
			e.stopPropagation();

			this.menu.view.attach(document.body);
		}
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

	private init(): void {
		this.setupVar();
		this.setupExp();
		this.setupMenu();
	}

	private setupExp(): void {
		let expEd2: ExpEd2 = new ExpEd2(Exp.get(this._item.expId));
		expEd2.attach(this.expCont);
	}

	private setupVar(): void {
		console.log('setup var:');
		console.log('this._item.varId: ' + this._item.varRefId);

		let varRef: IVarRef;
		let varEd: VarRefEd;

		varRef = VarRef.get(this._item.varRefId);
		varEd = new VarRefEd(varRef, false);
		varEd.attach(this.varCont);
	}

}