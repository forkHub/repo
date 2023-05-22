export class RouterKons {
	//#admin
	//anggota
	static readonly daftarAnggota: string = "/sm/anggota/daftar";
	static readonly daftarAnggotaFilter: string = "/sm/anggota/daftar/kunci/:kunci/hal/:hal";
	static readonly pendaftaranAnggota: string = "/sm/anggota/baru";
	static readonly hapusAnggota: string = "/sm/anggota/hapus/:id";

	static readonly editProfile: string = "/sm/anggota/:id/info/edit";
	static readonly halEditAnggota: string = "/sm/anggota/:id/edit/beranda";

	//pasangan
	static readonly editRelasi: string = "/sm/anggota/:id/rel/edit/:id2";
	static readonly halCariPasangan: string = "/sm/anggota/:id/pasangan/tambah";
	static readonly halCariPasanganFilter: string = "/sm/anggota/:id/pasangan/tambah/kunci/:kunci/hal/:hal";
	static readonly lihatPasangan: string = "/sm/anggota/:id/pasangan/lihat";

	//anak
	static readonly daftarAnak: string = "/sm/anggota/:id/anak/baca";
	static readonly daftarCalonAnak: string = "/sm/anggota/:id/anak/tambah";
	static readonly daftarCalonAnakFilter: string = "/sm/anggota/:id/anak/tambah/kunci/:kunci/hal/:hal";

	static readonly uploadFoto: string = "/sm/anggota/:id/gbr/upload";

	//orang tua
	static readonly editOrtu: string = "/sm/anggota/:id/ortu/edit/:id2";


	static readonly rel_daftar: string = "/sm/rel/daftar";
	static readonly rel_hapus_id: string = "/sm/rel/hapus/:id";
}