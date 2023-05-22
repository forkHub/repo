import express from "express";
import { admin } from "../admin/admin";
import { auth } from "../auth/Auth";
import { RouterKons } from "./RouterKons";

export class Router {

	readonly router = express.Router();

	impl(): void {

		//#admin
		//anggota
		this.router.get(RouterKons.daftarAnggota, auth.cont.checkAuthGet, admin.cont.anggota.renderDaftarAnggota);
		this.router.get(RouterKons.daftarAnggotaFilter, auth.cont.checkAuthGet, admin.cont.anggota.renderDaftarAnggotaCari);
		this.router.get(RouterKons.editProfile, auth.cont.checkAuthGet, admin.cont.anggota.renderEditProfile);
		this.router.get(RouterKons.halEditAnggota, auth.cont.checkAuthGet, admin.cont.anggota.renderHalBerandaEdit);
		this.router.get(RouterKons.pendaftaranAnggota, auth.cont.checkAuthGet, admin.cont.anggota.renderPendaftaranAnggotaBaru);

		this.router.post(RouterKons.pendaftaranAnggota, auth.cont.checkAuthSession, admin.cont.anggota.pendaftaranAnggota);
		this.router.post(RouterKons.editProfile, auth.cont.checkAuthSession, admin.cont.anggota.editProfile);
		this.router.post(RouterKons.hapusAnggota, auth.cont.checkAuthSession, admin.cont.anggota.hapus);

		//anak
		this.router.get(RouterKons.daftarCalonAnak, auth.cont.checkAuthGet, admin.cont.anggota.renderDaftarCalonAnak);
		this.router.get(RouterKons.daftarCalonAnakFilter, auth.cont.checkAuthGet, admin.cont.anggota.renderDaftarCalonAnakCari);
		this.router.post(RouterKons.daftarAnak, auth.cont.checkAuthSession, admin.cont.anggota.daftarAnak);

		//pasangan
		this.router.get(RouterKons.halCariPasangan, auth.cont.checkAuthGet, admin.cont.relasi2.renderCariPasangan);
		this.router.get(RouterKons.halCariPasanganFilter, auth.cont.checkAuthGet, admin.cont.relasi2.renderCariPasangan);
		this.router.post(RouterKons.lihatPasangan, auth.cont.checkAuthGet, admin.cont.relasi2.lihatPasangan);

		this.router.post(RouterKons.uploadFoto, auth.cont.checkAuthSession, admin.cont.anggota.upload);
		this.router.post(RouterKons.editRelasi, auth.cont.checkAuthSession, admin.cont.anggota.editRel);
		this.router.post(RouterKons.editOrtu, auth.cont.checkAuthSession, admin.cont.anggota.editOrtu);
	}
}