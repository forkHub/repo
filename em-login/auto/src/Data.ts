import { HalDaftarTugas, HalDepan, HalEditTugas, HalLihatTugas, HalLogin, TugasBaru } from "./Data2"

export const data = {
	urlMain: 'http://localhost:3000',
	urlHapus: 'http://localhost:3000/admin/auth/db/reset/',
	urlLogout: 'http://localhost:3000/auth/logout',
	user: 'test',
	tugas: {
		awal: {
			judul: 'judul-test',
			isi: 'isi-test'
		},
		edit: {
			judul: 'judul-test-edit',
			isi: 'isi-test-edit'
		}
	},
	halDepan: {
		judul: {
			awal: 'test telah membuat tugas judul-test',
			edit: 'test telah mengupdate tugas judul-test-edit'
		}
	}
}

export const Hal = {
	comp: {
		dialog: {
			el: 'div.comp.dialog',
			judul: 'div.comp.dialog p.deskripsi',
			okTbl: 'div.comp.dialog button.ok'
		}
	},
	tugasBaru: TugasBaru,
	halDaftarTugas: HalDaftarTugas,
	halDepan: HalDepan,
	halLogin: HalLogin,
	halLihatTugas: HalLihatTugas,
	halEditTugas: HalEditTugas
}
