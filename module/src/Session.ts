namespace ha.modul {
	class Session {
		private key: string = "ha.mobile.editor";

		daftarVarObj(): IVar[] {
			let hasil: IVar[] = [];

			sessionObj.daftarVar.forEach((item: IVar) => {
				hasil.push({
					id: item.id,
					modul: item.modul,
					nama: item.nama,
					tipe: item.tipe,
					view: null
				});
			});

			return hasil;
		}

		daftarModulObj(): IModul[] {
			let hasil: IModul[] = []

			sessionObj.daftarModul.forEach((item: IModul) => {
				hasil.push({
					id: item.id,
					modul: item.modul,
					nama: item.nama,
					tipe: item.tipe,
					view: null
				})
			})

			return hasil;
		}

		daftarFungsiObj(): IFungsi[] {
			let hasil: IFungsi[] = [];

			sessionObj.daftarFungsi.forEach((fungsi: IFungsi) => {
				hasil.push({
					id: fungsi.id,
					modul: fungsi.modul,
					nama: fungsi.nama,
					tipe: fungsi.tipe,
					tipeReturn: fungsi.tipeReturn
				})
			})

			return hasil;
		}

		toObj(): ISession {
			let hasil: ISession;

			hasil = {
				daftarModul: this.daftarModulObj(),
				daftarVar: this.daftarVarObj(),
				idDipilih: null,
				daftarFungsi: this.daftarFungsiObj()
			}

			return hasil;
		}

		simpan(): void {
			console.group('simpan');
			let dataStr: string = JSON.stringify(this.toObj());
			window.localStorage.setItem(this.key, dataStr);
			console.groupEnd();
		}

		load(): ISession {
			console.log("load session");
			try {
				let dataStr: string = window.localStorage.getItem(this.key);
				let ses: ISession;

				if (!dataStr || dataStr == "") {
					throw Error('kosong');
				}

				ses = JSON.parse(dataStr);

				return ses;
			}
			catch (e) {
				console.error(e);
				return {
					idDipilih: daftarModul[0].id,
					daftarModul: daftarModul,
					daftarVar: [],
					daftarFungsi: []
				}
			}
		}
	}

	export var session: Session = new Session();
}