export class RouterKOns {

	static readonly gp_auth_login: string = "/sm/auth/login";

	static readonly g_anggota_daftar: string = "/sm/anggota/daftar";
	static readonly g_anggota_daftar_kunci_hal: string = "/sm/anggota/daftar/kunci/:kunci/hal/:hal";

	static readonly g_anggota_id_lihat: string = "/sm/anggota/:id/lihat/";
	static readonly g_beranda_lihat_id: string = "/sm/beranda/lihat/:id";
	static readonly g_anggota_id_info_edit: string = "/sm/anggota/:id/info/edit";
	static readonly g_anggota_id_edit_beranda: string = "/sm/anggota/:id/edit/beranda";
	static readonly gp_anggota_baru: string = "/sm/anggota/baru";
	static readonly p_anggota_hapus_id: string = "/sm/anggota/hapus/:id";

	static readonly p_anggota_id_rel_edit_id: string = "/sm/anggota/:id/rel/edit/:id2";


	//hanya get
	static readonly g_anggota_id_pas_tambah: string = "/sm/anggota/:id/pasangan/tambah";
	static readonly g_anggota_id_pas_tambah_kunci_hal: string = "/sm/anggota/:id/pasangan/tambah/kunci/:kunci/hal/:hal";

	//post
	static readonly p_anggota_id_pas_lihat: string = "/sm/anggota/:id/pasangan/lihat";

	//post
	static readonly p_anggota_id_anak_baca: string = "/sm/anggota/:id/anak/baca";
	static readonly p_anggota_id_gbr_upload: string = "/sm/anggota/:id/gbr/upload";

	static readonly p_anggota_id_ortu_edit_id: string = "/sm/anggota/:id/ortu/edit/:id2";

	static readonly g_anggota_id_anak_tambah: string = "/sm/anggota/:id/anak/tambah";
	static readonly g_anggota_id_anak_tambah_kunci_hal: string = "/sm/anggota/:id/anak/tambah/kunci/:kunci/hal/:hal";

	static readonly rel_daftar: string = "/sm/rel/daftar";
	static readonly rel_hapus_id: string = "/sm/rel/hapus/:id";
}