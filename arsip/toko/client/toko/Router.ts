export class Router {
	static readonly toko_web_barang_lihat_barangId: string = "/toko/web/barang/lihat/:barang_id";
	static readonly toko_web_lapak_id: string = "/toko/web/lapak/:lapak_id";
	static readonly toko_web_lapak_daftar: string = "/toko/web/lapak/daftar";
	static readonly toko_web_beranda: string = "/toko"; 																	//toko/web/beranda
	static readonly toko_web_beranda_cari_kataKunci_hal_hal: string = "/toko/web/beranda/cari/:kata_kunci/hal/:hal";
	static readonly toko_web_beranda_hal_hal: string = "/toko/web/beranda/hal/:hal";

	static readonly toko_gudang_barang_daftar: string = "/toko/gudang/barang/daftar";
	static readonly toko_gudang_barang_baru: string = "/toko/gudang/barang/baru";
	static readonly toko_gudang_barang_lihat_barangId: string = "/toko/gudang/lihat/:barang_id";
	static readonly toko_gudang_barang_edit_barangId: string = "/toko/gudang/barang/edit/:barang_id";
	static readonly toko_gudang_barang_hapus: string = "/toko/gudang/barang/hapus/:barang_id";
	static readonly toko_gudang_barang_foto_update: string = "/toko/gudang/barang/foto/update";

	static readonly toko_gudang_profile: string = "/toko/gudang/profile/";
	static readonly toko_gudang_profile_edit: string = "/toko/gudang/profile/edit";
	static readonly toko_gudang_profile_password_edit: string = "/toko/gudang/profile/password/edit";
	static readonly toko_gudang_profile_aktif_edit: string = "/toko/gudang/profile/aktif/edit";

	static readonly toko_auth_login: string = "/toko/auth/login";
	static readonly toko_auth_logout: string = "/toko/auth/logout";
	static readonly toko_auth_lupa: string = "/toko/auth/lupa";
	static readonly toko_auth_daftar: string = "/toko/auth/daftar";
	static readonly toko_auth_password_edit: string = "/toko/auth/password/edit";
}