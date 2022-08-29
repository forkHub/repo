export const HalEditTugas = {
	hal: 'div.hal-edit-tugas',
	judul: 'input.judul',
	deskripsi: 'textarea.isi',
	petugas: {
		pertama: 'form input[type="radio"]#petugas0',
		kedua: 'form input[type="radio"]#petugas1',
		ketiga: 'form input[type="radio"]#petugas2'
	},
	simpanTbl: 'form button.submit',
	nav: {
		daftarTugasLink: 'a.daftar-tugas',
		lihatTugasLink: 'a.lihat-tugas'
	}
}

export const TugasBaru = {
	hal: 'div.hal-tugas-baru',
	judul: 'input.judul',
	deskripsi: 'textarea.isi',
	petugas: {
		pertama: 'form input[type="radio"]#petugas0'
	},
	simpanTbl: 'form button.submit',
	nav: {
		daftarTugasLink: ''
	}
}

export const HalLogin = {
	user: 'form input.user-name',
	pass: 'form input.password',
	btnLogin: 'form button.submit'
}

export const HalDaftarTugas = {
	el: 'div.daftar-tugas',
	status: 'ul li a.status',
	tambah: 'a.tambah',
	list: {
		pertama: {
			el: 'div.item.list-group a.list-group-item.list-group-item-action:nth-child(1)',
			judul: 'div.item.list-group a.list-group-item.list-group-item-action p.judul'
		}
	}
}

export const HalDepan = {
	el: '',
	daftarTugas: 'a.tab.daftar-tugas',
	aktifitas: {
		el: '',
		pertama: {
			el: 'a.list-group-item.list-group-item-action:nth-child(1)',
		}
	}
}

export const HalLihatTugas = {
	editTbl: 'button.edit'
}