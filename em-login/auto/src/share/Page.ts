//SHARE

//toko
export namespace Page2 {
	export const toko = {
		beranda: {
			daftarLapak: `div.nav-cont a[href="/daftar_lapak"]`,
			login: `div.nav-cont a[href="/auth/login"]`,
			barangPertama: {
				el: `div.daftar-barang-cont div.item:nth-child(1)`,
				namaBarang: '---',
				url: '---',
				harga: '---',
				beliTbl: '---',
				wa: '---',
				id: '---',
				lapakId: '---'
			}
		},
		daftarLapak: {
			beranda: `div.nav-cont a[href="/"]`,
			itemPertama: `div.daftar-lapak-cont div.item-lapak:nth-child(1) a`,
			itemMobil: 'div.daftar-lapak-cont div.item-lapak.mobilio a',
			itemTest: 'div.daftar-lapak-cont div.item-lapak.test a',
			login: `div.nav-cont a[href="/auth/login"]`,
		},
		lapak: {
			beranda: 'div.nav-cont a[href="/"]',
			login: `div.nav-cont a[href="/auth/login"]`,
			barangPertama: {
				el: `div.daftar-barang-cont div.item:nth-child(1)`,
				namaBarang: '---',
				url: '---',
				harga: '---',
				beliTbl: '---',
				wa: '---',
				id: '---',
				lapakId: '---'
			}
		},
		barang: {
			beranda: 'div.nav-cont a[href="/"]',
			lapak: 'div.nav-cont a.lapak',
			login: `div.nav-cont a[href="/auth/login"]`
		}
	}
}

let el: string = Page2.toko.beranda.barangPertama.el;
Page2.toko.beranda.barangPertama.namaBarang = el + ' p.nama-barang';
Page2.toko.beranda.barangPertama.beliTbl = el + ' button.chat';
Page2.toko.beranda.barangPertama.harga = el + ' p.harga';
Page2.toko.beranda.barangPertama.id = el + ' p.id';
Page2.toko.beranda.barangPertama.lapakId = el + ' p.lapak';
Page2.toko.beranda.barangPertama.wa = el + ' p.wa';
Page2.toko.beranda.barangPertama.url = el + ' p.nama-barang a';

el = Page2.toko.lapak.barangPertama.el;
Page2.toko.lapak.barangPertama.namaBarang = el + ' p.nama-barang';
Page2.toko.lapak.barangPertama.beliTbl = el + ' button.chat';
Page2.toko.lapak.barangPertama.harga = el + ' p.harga';
Page2.toko.lapak.barangPertama.id = el + ' p.id';
Page2.toko.lapak.barangPertama.lapakId = el + ' p.lapak';
Page2.toko.lapak.barangPertama.wa = el + ' p.wa';
Page2.toko.lapak.barangPertama.url = el + ' p.nama-barang a';

//auth
export namespace Page2 {
	export const auth = {
		daftar: {
			form: 'form',
			userId: 'input.user_id',
			lapak: 'input.lapak',
			deskripsi: 'input.deskripsi',
			alamat: 'input.alamat',
			email: 'input.email',
			wa: 'input.wa',
			password1: 'input.password1',
			password2: 'input.password2',
			kirimTbl: 'form button.submit'
		},
		gantiPassword: {
			form: 'form',
			pass1: 'form input.password1',
			pass2: 'form input.password2'
		},
		login: {
			form: 'form',
			userName: 'input.user-name',
			password: 'input.password',
			lupa: 'button.lupa',
			submit: 'button.submit',
			daftar: 'button.daftar'
		},
		lupa: {
			email: 'input.email',
			form: 'form'
		}
	}
}

//penjual
export namespace Page2 {
	export const Penjual = {
		barangBaru: {
			form: 'form',
			namaInput: 'form input#nama-barang',
			deskripsiInput: 'form input#deskripsi-barang',
			deskripsiPanjangInput: 'form textarea#deskripsi-barang-panjang',
			publishStatus: 'form input.publish',
			wa: 'form input#wa',
			submitTbl: 'button.submit',
			draftTbl: 'button.draft',
			fotoCont: 'div.foto-cont',
			editFotoTbl: 'button.edit-foto',
			gambarHtml: 'img.foto',
			tutupTbl: 'button.tutup',
			hargaBarangInput: 'form input#harga-barang',
		},
		editBarang: {
			form: 'form',
			namaInput: 'form input#nama-barang',
			deskripsiInput: 'form input#deskripsi-barang',
			deskripsiPanjangInput: 'form textarea#deskripsi-barang-panjang',
			publishStatus: 'form input.publish',
			wa: 'form input#wa',
			submitTbl: 'button.submit',
			draftTbl: 'button.draft',
			fotoCont: 'div.foto-cont',
			editFotoTbl: 'button.edit-foto',
			hapusFotoTbl: 'button.hapus-foto',
			gambarHtml: 'img.foto',
			tutupTbl: 'button.tutup',
			hargaBarangInput: 'form input#harga-barang',
			id: 'form input.id',
			fileId: 'form input.file_id'
		},
		editProfile: {
			form: 'form',
			lapak: 'input.lapak',
			deskripsi: 'input.deskripsi',
			wa: 'input.wa',
			alamat: 'input.alamat',
			email: 'input.email',
			nav: {
				berandaLink: 'nav.menu a.beranda',
				profileLink: 'nav.menu a.profile'
			},
			kirimTbl: 'form button.submit',
			tutupTbl: 'form button.batal'
		},
		beranda: {
			menuTbl: 'button.menu',
			tambahTbl: 'button.tambah',
			cont: 'div.cont',
			lihatTbl: 'button.lihat',
			barangPertama: {
				id: 'div.item-barang:nth-child(1) div.id',
				editTbl: 'div.item-barang:nth-child(1) button.edit',
				hapusTbl: 'div.item-barang:nth-child(1) button.hapus',
				shareTbl: 'div.item-barang:nth-child(1) a.share',
				gbr: 'div.item-barang:nth-child(1) img',
				namaP: 'div.item-barang:nth-child1) div.deskripsi p.nama'
			},
			menu: {
				profile: 'div.menu-popup button.profile',
				logout: 'div.menu-popup button.logout',
				share: 'div.menu-popup button.share-lapak'
			}
		},
		profile: {
			editTbl: 'button.edit',
			tutupTbl: 'button.tutup',
			berandaLink: 'nav.menu a.beranda'
		},
		upload: {
			listCont: 'div.foto-page div.list-cont',
			form: 'div.foto-page form',
			input: 'div.foto-page input',
			uploadTbl: 'div.foto-page input.upload',
			canvasBesar: 'div.foto-page canvas#gbr_besar',
			canvasThumb: 'div.foto-page canvas#thumb',
			tutupTbl: 'div.foto-page button.tutup',
			fotoCont: 'div.foto-page div.foto-cont',
			thumbCont: 'div.foto-page div.thumb-cont'
		},
		foto: {
			tutup: 'div.foto-page button.tutup'
		}
	}
}

export namespace Page2 {
	export const Comp = {
		dialog: {
			el: 'div.comp.dialog',
			box: 'div.comp.dialog div.box p.deskripsi',
			okTbl: 'div.comp.dialog div.box button.ok'
		}
	}

}