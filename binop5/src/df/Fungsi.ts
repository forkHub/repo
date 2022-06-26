namespace df {
	export class HalDeklarasiFungsi extends ha.comp.BaseComponent {
		private _item: IDekFungsi;
		private menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();
		readonly pilihStmt: ha.comp.MenuPopup = new ha.comp.MenuPopup();

		public set item(value: IDekFungsi) {
			this._item = value;
		}

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

		buatParamObj(nama: string, indukId: number, prevIdx: number): IParam {
			let hasil: IParam;

			hasil = {
				id: Id.id,
				nama: nama,
				indukId: indukId,
				type: TY_PARAM,
				prevIdx: prevIdx
			}

			return hasil;
		}

		tampil(): void {
			Variable.daftar.forEach((item: IVar) => {
				if (item.indukId == this._item.id) {
					let itemView: ItemVar;

					itemView = new ItemVar(item);
					itemView.attach(this.daftarVar);
				}
			})

			dataObj.paramAr.forEach((item: IParam) => {
				if (item.indukId == this._item.id) {
					let itemView: ItemParam;

					itemView = new ItemParam(item);
					itemView.attach(this.daftarParam);
				}
			})

			for (let i: number = 0; i < dataObj.stmtAr.length; i++) {
				let item: IStmt = dataObj.stmtAr[i];

				if (item.stmtType == STMT_VAR_ISI) {
					console.log('var isi:');

					let view: VarisiViewItem = new VarisiViewItem(item as IVarIsi);
					view.init();

					view.attach(this.daftarStmt);
				}
				else {
					console.warn('');
					//TODO: stmt yang lain
				}
			}

		}

		setupMenuPilihStmt() {
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
					}

					obj; //TODO:
					//buat view
					//attach view
				}
			})

			this.pilihStmt.buatTombol({
				label: 'nama = exp',
				f: () => {
					let obj: IVarIsi = Data.buatVarIsi(this._item.id);

					let view: VarisiViewItem = VarisiViewItem.buat(obj);
					view.attach(this.daftarStmt);
				}
			})
		}

		setupMenu(): void {
			this.menu.buatTombol({
				label: 'var',
				f: () => {
					let nama: string;

					nama = window.prompt('Nama variable: ');

					if (nama) {
						let varObj: IVar = dataObj.halModul.buatVarObj(nama, this._item.id);
						let view: ItemVar;

						view = new ItemVar(varObj);
						view.attach(this.daftarVar);
						Variable.daftar.push(varObj);
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
						let paramView: ItemParam = new ItemParam(paramObj);
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

	// export const halDeklarasiFungsi: HalDeklarasiFungsi = new HalDeklarasiFungsi();
}