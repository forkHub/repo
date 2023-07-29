import express from "express";
import { toko } from "./AppToko";

export class Router {

	readonly toko_web_barang_lihat_barangId: string = "/toko/web/barang/lihat/:barang_id";
	readonly toko_web_lapak_id: string = "/toko/web/lapak/:lapak_id";
	readonly toko_web_lapak_daftar: string = "/toko/web/lapak/daftar";
	readonly toko_web_beranda: string = "/toko"; 																	//toko/web/beranda
	readonly toko_web_beranda_cari_kataKunci_hal_hal: string = "/toko/web/beranda/cari/:kata_kunci/hal/:hal";
	readonly toko_web_beranda_hal_hal: string = "/toko/web/beranda/hal/:hal";

	readonly toko_gudang_barang_daftar: string = "/toko/gudang/barang/daftar";
	readonly toko_gudang_barang_baru: string = "/toko/gudang/barang/baru";
	readonly toko_gudang_barang_lihat_barangId: string = "/toko/gudang/lihat/:barang_id";
	readonly toko_gudang_barang_edit_barangId: string = "/toko/gudang/barang/edit/:barang_id";
	readonly toko_gudang_barang_hapus: string = "/toko/gudang/barang/hapus/:barang_id";
	readonly toko_gudang_barang_foto_update: string = "/toko/gudang/barang/foto/update";

	readonly toko_gudang_profile: string = "/toko/gudang/profile/";
	readonly toko_gudang_profile_edit: string = "/toko/gudang/profile/edit";
	readonly toko_gudang_profile_password_edit: string = "/toko/gudang/profile/password/edit";
	readonly toko_gudang_profile_aktif_edit: string = "/toko/gudang/profile/aktif/edit";

	readonly toko_auth_login: string = "/toko/auth/login";
	readonly toko_auth_logout: string = "/toko/auth/logout";
	readonly toko_auth_lupa: string = "/toko/auth/lupa";
	readonly toko_auth_daftar: string = "/toko/auth/daftar";
	readonly toko_auth_password_edit: string = "/toko/auth/password/edit";

	readonly router = express.Router();

	mapRouter(): void {

		this.router.get(this.toko_web_beranda, toko.cont.web.beranda.renderBeranda);
		this.router.get(this.toko_web_barang_lihat_barangId, toko.cont.web.barang.renderHalLihatBarang);
		this.router.get(this.toko_web_beranda_hal_hal, toko.cont.web.beranda.renderBerandaHal);
		this.router.get(this.toko_web_beranda_cari_kataKunci_hal_hal, toko.cont.web.beranda.renderBerandaCari);

		this.router.get(this.toko_web_lapak_daftar, toko.cont.web.lapak.daftar);
		this.router.get(this.toko_web_lapak_id, toko.cont.web.lapak.renderId);

		this.router.get(this.toko_gudang_barang_daftar, toko.cont.admin.auth.checkAuthGet, toko.cont.gudang.barang.renderDaftarBarang);
		this.router.get(this.toko_gudang_barang_edit_barangId, toko.cont.admin.auth.checkAuthGet, toko.cont.gudang.barang.renderEditPage);
		this.router.get(this.toko_gudang_barang_lihat_barangId, toko.cont.admin.auth.checkAuthGet, toko.cont.gudang.barang.renderLihatBarang);
		this.router.get(this.toko_gudang_barang_baru, toko.cont.admin.auth.checkAuthGet, toko.cont.gudang.barang.renderBarangBaru);

		this.router.get(this.toko_gudang_profile, toko.cont.admin.auth.checkAuthGet, toko.cont.gudang.profile.renderHalProfile);
		this.router.get(this.toko_gudang_profile_edit, toko.cont.admin.auth.checkAuthSession, toko.cont.gudang.profile.renderHalEditProfile);

		this.router.get(this.toko_auth_login, toko.cont.admin.auth.renderLogin);
		this.router.get(this.toko_auth_logout, toko.cont.admin.auth.logout);
		this.router.get(this.toko_auth_lupa, toko.cont.admin.auth.renderLupa);
		this.router.get(this.toko_auth_daftar, toko.cont.admin.auth.renderDaftar);
		this.router.get(this.toko_auth_password_edit, toko.cont.admin.auth.renderHalEditPassword);

		this.router.get("/", toko.cont.web.beranda.renderBeranda);

		//post
		this.router.post(this.toko_auth_login, toko.cont.admin.auth.loginPost);
		this.router.post(this.toko_auth_lupa, toko.cont.admin.auth.lupaPost);
		this.router.post(this.toko_auth_daftar, toko.cont.admin.auth.daftar);

		this.router.post(this.toko_gudang_barang_baru, toko.cont.admin.auth.checkAuthSession, toko.cont.gudang.barang.barangBaru);
		this.router.post(this.toko_gudang_barang_edit_barangId, toko.cont.admin.auth.checkAuthSession, toko.cont.gudang.barang.barangEdit);
		this.router.post(this.toko_gudang_barang_hapus, toko.cont.admin.auth.checkAuthSession, toko.cont.gudang.barang.barangHapus);

		this.router.post(this.toko_gudang_profile_edit, toko.cont.admin.auth.checkAuthSession, toko.cont.gudang.profile.editProfile);
		this.router.post(this.toko_gudang_profile_aktif_edit, toko.cont.admin.auth.checkAuthSession, toko.cont.gudang.profile.editAktif);

		this.router.post(this.toko_gudang_barang_foto_update, toko.cont.admin.auth.checkAuthSession, toko.cont.gudang.barang.gambarUpload);
	}
}

