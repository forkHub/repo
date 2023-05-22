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

	//anggota update

	//profile
	static readonly api_profile_lihat: string = "/api/profile/lihat"; //sama dengan anggota lihat

	//kerabat
	static readonly api_kerabat_lihat: string = "/api/kerabat/lihat";

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
	//pasangan lihat manggil dao anggota lihat
}