export class RouterKOns {
    static gp_auth_login = "/sm/auth/login";
    static g_anggota_daftar = "/sm/anggota/daftar";
    static g_anggota_daftar_kunci_hal = "/sm/anggota/daftar/kunci/:kunci/hal/:hal";
    static g_anggota_id_lihat = "/sm/anggota/:id/lihat/";
    static g_beranda_lihat_id = "/sm/beranda/lihat/:id";
    static g_anggota_id_info_edit = "/sm/anggota/:id/info/edit";
    static g_anggota_id_edit_beranda = "/sm/anggota/:id/edit/beranda";
    static gp_anggota_baru = "/sm/anggota/baru";
    static p_anggota_hapus_id = "/sm/anggota/hapus/:id";
    static p_anggota_id_rel_edit_id = "/sm/anggota/:id/rel/edit/:id2";
    //hanya get
    static g_anggota_id_pas_tambah = "/sm/anggota/:id/pasangan/tambah";
    static g_anggota_id_pas_tambah_kunci_hal = "/sm/anggota/:id/pasangan/tambah/kunci/:kunci/hal/:hal";
    //post
    static p_anggota_id_pas_lihat = "/sm/anggota/:id/pasangan/lihat";
    //post
    static p_anggota_id_anak_baca = "/sm/anggota/:id/anak/baca";
    static p_anggota_id_gbr_upload = "/sm/anggota/:id/gbr/upload";
    static p_anggota_id_ortu_edit_id = "/sm/anggota/:id/ortu/edit/:id2";
    static g_anggota_id_anak_tambah = "/sm/anggota/:id/anak/tambah";
    static g_anggota_id_anak_tambah_kunci_hal = "/sm/anggota/:id/anak/tambah/kunci/:kunci/hal/:hal";
    static rel_daftar = "/sm/rel/daftar";
    static rel_hapus_id = "/sm/rel/hapus/:id";
}
