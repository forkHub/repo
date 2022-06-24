class ViewWadah extends ha.comp.BaseComponent {
	private _item: IArg;
	readonly terima: string[] = [];
	readonly menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();

	public get item(): IArg {
		return this._item;
	}
	public set item(value: IArg) {
		this._item = value;
	}

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

		this.menuTbl.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			console.log('menu klik');
			arg.formArg.attach(document.body);
			arg.formArg.item = this._item;
			arg.formArg.setTerima(this.terima);

			this.detach();
		}
	}

	setupMenu(): void {
		this.menu.buatTombol({
			label: 'update',
			f: () => {
				// this._item.tipeValue = ARG_VALUE;///
			}
		});
		this.menu.buatTombol({
			label: 'value',
			f: () => {
				// this._item.tipeValue = ARG_VALUE;///
			}
		});
		this.menu.buatTombol({
			label: 'ref',
			f: () => {
				//TODO: browse for variable
			}
		})
	}

	get menuTbl(): HTMLButtonElement {
		return this.getEl('div.menu button') as HTMLButtonElement;
	}

	get wadahDiv(): HTMLDivElement {
		return this.getEl('div.wadah2') as HTMLDivElement;
	}


}