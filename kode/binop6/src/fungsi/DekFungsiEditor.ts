///<reference path="../ha/comp/BaseComponent.ts"/>

class DekFungsiEditor extends ha.comp.BaseComponent {
	private _item: IDekFungsi;
	private menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();
	readonly pilihStmt: ha.comp.MenuPopup = new ha.comp.MenuPopup();

	constructor() {
		super();
		this._elHtml = this.getTemplate("div.hal-fungsi-dek");

		this.menuTbl.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			this.menu.view.attach(document.body);
		}

		this.setupMenu();
		this.setupMenuPilihStmt();
	}

	private buatParamObj(nama: string, indukId: number): IParam {
		let hasil: IParam;

		hasil = {
			id: Id.id,
			nama: nama,
			indukId: indukId,
			type: TY_PARAM,
			// prevIdx: prevIdx,
			ket: ''
		}

		return hasil;
	}

	private setBack(): void {
		Path.back = () => {
			this.detach();
			dataObj.halModul.attach(document.body);
			dataObj.halModul.tampil(Modul.getModul(this._item.indukId));
		}
	}

	tampil(item: IDekFungsi): void {
		this._item = item;

		item.varAr.forEach((id: number) => {
			let varObj: IVar = Variable.get(id);

			if (varObj.indukId == this._item.id) {
				let varView: VariableItem;

				varView = new VariableItem(varObj);
				varView.attach(this.daftarVar);
			}
		})

		//TODO:
		dataObj.paramAr.forEach((item: IParam) => {
			if (item.indukId == this._item.id) {
				let itemView: ParamView;

				itemView = new ParamView(item);
				itemView.attach(this.daftarParam);
			}
		})

		//TODO:
		for (let i: number = 0; i < item.stmtAr.length; i++) {
			let idx: number = item.stmtAr[i];
			let stmt: IStmt = Stmt.get(idx);

			if (stmt.stmtType == STMT_VAR_ISI) {
				console.log('var isi:');

				let view: VarIsiEd = new VarIsiEd(stmt as IVarIsi, true);

				view.attach(this.daftarStmt);
			}
			else {
				console.warn('');
				//TODO: stmt yang lain
			}
		}

		this.setBack()
	}

	private setupMenuPilihStmt() {
		this.pilihStmt.buatTombol({
			label: 'name (arg1, arg2)',
			f: () => {
				//buat obj
				let obj: IPanggilFungsi = {
					id: Id.id,
					indukId: this._item.id,
					nama: 'fungsi',
					// prevIdx: 0,
					refId: 0,
					stmtType: STMT_PANGGIL_FUNGSI,
					type: TY_STMT,
					ket: '',
					param: []
				}

				obj; //TODO:
				//buat view
				//attach view
			}
		})

		this.pilihStmt.buatTombol({
			label: 'nama = value',
			f: () => {
				let obj: IVarIsi;
				let view: VarIsiEd;
				// let valueObj: IValue;
				// let expObj: IExp;

				// valueObj = value.buat(0);
				// expObj = Exp.buatDef(0);
				obj = VarIsi.buatDef(this._item.id);

				// expObj = exp.get(obj.refId)
				// valueObj = value.buat(expObj.id);
				// expObj.refId = valueObj.id;

				view = new VarIsiEd(obj, true);

				this._item.stmtAr.push(obj.id);
				view.attach(this.daftarStmt);
				dataObj.simpan();

				DekFungsi.validasi(this._item);
			}
		})
	}

	private setupMenu(): void {

		this.menu.buatTombol({
			label: 'var',
			f: () => {
				let nama: string;

				nama = window.prompt('Nama variable: ', 'var 1');

				if (nama) {
					let varObj: IVar = Variable.buatVarObj(nama, this._item.id);
					let view: VariableItem;
					this._item.varAr.push(varObj.id);

					view = new VariableItem(varObj);
					view.attach(this.daftarVar);
					dataObj.simpan();
				}
			}
		});

		this.menu.buatTombol({
			label: 'param',
			f: () => {
				let nama: string = window.prompt('nama parameter:');
				if (nama) {
					let paramObj: IParam = this.buatParamObj(nama, this._item.id);
					let paramView: ParamView = new ParamView(paramObj);
					paramView.attach(this.daftarParam);
					dataObj.paramAr.push(paramObj);
					dataObj.simpan();
				}
			}
		})

		this.menu.buatTombol({
			label: 'stmt',
			f: () => {
				//TODO: stmt
				//pilih stmt type
				this.menu.view.detach();
				this.pilihStmt.view.attach(document.body);
			}
		})
	}

	get daftarParam(): HTMLDivElement {
		return this.getEl('div.daftar-param') as HTMLDivElement;
	}

	get daftarVar(): HTMLDivElement {
		return this.getEl('div.daftar-var') as HTMLDivElement;
	}

	get daftarStmt(): HTMLDivElement {
		return this.getEl('div.daftar-stmt') as HTMLDivElement;
	}

	get menuTbl(): HTMLButtonElement {
		return this.getEl('div.menu button') as HTMLButtonElement;
	}
}