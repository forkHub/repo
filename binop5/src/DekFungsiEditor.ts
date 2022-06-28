///<reference path="./comp/BaseComponent.ts"/>

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

	private buatParamObj(nama: string, indukId: number, prevIdx: number): IParam {
		let hasil: IParam;

		hasil = {
			id: Id.id,
			nama: nama,
			indukId: indukId,
			type: TY_PARAM,
			prevIdx: prevIdx,
			ket: ''
		}

		return hasil;
	}

	tampil(item: IDekFungsi): void {
		this._item = item;

		item.varAr.forEach((id: number) => {
			let varObj: IVar = Variable.getVar(id);

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

				let view: VarisiViewItem = new VarisiViewItem(stmt as IVarIsi);

				view.attach(this.daftarStmt);
			}
			else {
				console.warn('');
				//TODO: stmt yang lain
			}
		}

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
					prevIdx: 0,
					refFungsiIdx: 0,
					stmtType: STMT_PANGGIL_FUNGSI,
					type: TY_STMT,
					ket: ''
				}

				obj; //TODO:
				//buat view
				//attach view
			}
		})

		this.pilihStmt.buatTombol({
			label: 'nama = exp',
			f: () => {
				let obj: IVarIsi = VarIsi.buatVarIsi(this._item.id);
				let view: VarisiViewItem = new VarisiViewItem(obj);
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
					let paramObj: IParam = this.buatParamObj(nama, this._item.id, 0);
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