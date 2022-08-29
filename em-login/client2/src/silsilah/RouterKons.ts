namespace ha.sl {
	export class RouterAPI2Kons {

		//auth
		static readonly api_auth_login: string = "/api/auth/login";
		static readonly api_auth_logout: string = "/api/auth/logout";

		//anggota
		static readonly api_anggota_lihat: string = "/api/anggota/lihat";
		static readonly api_anggota_daftar: string = "/api/anggota/daftar";
		static readonly api_anggota_edit: string = "/api/anggota/edit";
		static readonly api_anggota_hapus: string = "/api/anggota/hapus";
		static readonly api_anggota_update: string = "/api/anggota/update";

		//profile
		static readonly api_profile_lihat: string = "/api/profile/lihat";

		//anak
		static readonly api_anak_daftar: string = "/api/anak/daftar";
		static readonly api_anak_edit: string = "/api/anak/edit";
		static readonly api_anak_hapus: string = "/api/anak/hapus";
		static readonly api_anak_update: string = "/api/anak/update";

		//ortu
		static readonly api_ortu_daftar: string = "/api/ortu/daftar";
		static readonly api_ortu_edit: string = "/api/ortu/edit";
		static readonly api_ortu_hapus: string = "/api/ortu/hapus";
		static readonly api_ortu_update: string = "/api/ortu/update";

		//pasangan
	}

	export class RouterKOns {
		static readonly server: string = "http://localhost:3000";

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
}
