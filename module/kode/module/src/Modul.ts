namespace ha.modul.modul {

	export function getModul(id: string): IModul {
		let hasil: IModul;

		for (let i: number = 0; i < sessionObj.daftarModul.length; i++) {
			if (sessionObj.daftarModul[i].id == id) {
				hasil = sessionObj.daftarModul[i]
				return hasil;
			}
		}

		return null;
	}

	export function varBaru(nama: string, type: string): void {
		let varObj: IVar;

		console.group('tambah variable, nama: ' + nama);

		varObj = {
			modul: "",
			nama: nama,
			tipe: TYPE_VAR,
			view: null,
			id: (new Date()).getTime() + ''
		}

		//TODO: variable pakai type
		//TODO: validasi variable nama sama
		type;

		sessionObj.daftarVar.push(varObj);

		// session.simpan();

		console.groupEnd();
	}

	export function modulBaru(): void {
		let judul: string = window.prompt("judul:");

		//tambah item
		sessionObj.daftarModul.push({
			nama: judul,
			tipe: "modul",
			modul: "",
			id: (new Date()).getTime() + ''
		});

		//TODO: validasi

		//render ulang itemnya
		session.simpan();
		halModul.render();
	}

	export function hapusModul(modul: IModul): void {

		//hapus data
		for (let i: number = 0; i < sessionObj.daftarModul.length; i++) {
			if (sessionObj.daftarModul[i] == modul) {
				sessionObj.daftarModul.splice(i, 1)[0];
			}
		}

	}

	export function updateModul(judul: string): void {
		if (!sessionObj.idDipilih) return;

		getModul(sessionObj.idDipilih).nama = judul;
	}

	export function fungsiBaru(nama: string): void {
		sessionObj.daftarFungsi.push({
			id: (new Date()).getTime() + "",
			nama: nama,
			tipe: TYPE_FUNGSI,
			tipeReturn: "string",
			modul: ""
		})
	}

}