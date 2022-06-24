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
				id: ha.comp.Util.id(),
				nama: nama,
				indukId: indukId,
				type: TY_PARAM,
				prevIdx: prevIdx
			}

			return hasil;
		}

		tampil(): void {
			data.variableAr.forEach((item: IVar) => {
				if (item.indukId == this._item.id) {
					let itemView: ItemVar;

					itemView = new ItemVar(item);
					itemView.attach(this.daftarVar);
				}
			})

			data.paramAr.forEach((item: IParam) => {
				if (item.indukId == this._item.id) {
					let itemView: ItemParam;

					itemView = new ItemParam(item);
					itemView.attach(this.daftarParam);
				}
			})

			data.stmtAr.forEach((item: IStmt) => {
				if (item.stmtType == STMT_VAR_ISI) {

				}
				else {
					//TODO: stmt yang lain
				}
			});
		}

		setupMenuPilihStmt() {
			this.pilihStmt.buatTombol({
				label: 'name (arg1, arg2)',
				f: () => {
					//buat obj
					let obj: IPanggilFungsi = {
						id: ha.comp.Util.id(),
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
					//buat obj
					let obj: IVarIsi = {
						id: ha.comp.Util.id(),
						indukId: this._item.id,
						nama: '',
						prevIdx: 0,
						refVarId: 0,
						refExpId: 0,
						stmtType: STMT_VAR_ISI,
						type: TY_STMT
					}

					// let view:
					let view: ItemVarIsi = new ItemVarIsi(obj);
					view.attach(this.daftarStmt);

					//TODO: simpan
					data.stmtAr.push(obj);
					data.simpan();

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
						let varObj: IVar = data.halModul.buatVarObj(nama, this._item.id);
						let view: ItemVar;

						view = new ItemVar(varObj);
						view.attach(this.daftarVar);
						data.variableAr.push(varObj);
						data.simpan();
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
						data.paramAr.push(paramObj);
						data.simpan();
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