export class Kons {

    static readonly beranda: string = "/mnk";

    //laporan daftar karyawan
    static readonly karyawan_daftar: string = "/mnk/karyawan/daftar";

    //karyawan baru
    static readonly karyawan_baru: string = "/mnk/karyawan/baru";

    //hapus karyawan
    static readonly karyawan_hapus: string = "/mnk/karyawan/:id/hapus";

    //info karyawan
    static readonly karyawan_info: string = "/mnk/karyawan/:id/info";

    //edit info karyawan
    static readonly karyawan_edit: string = "/mnk/karyawan/:id/info/edit";

    //transaksi penggajian karyawan
    static readonly gaji_trans: string = "/mnk/karyawan/:id/gaji/baru";

    //transaksi perubahan gaji karyawan
    static readonly gaji_edit: string = "/mnk/karyawan/:id/gaji/ubah";

    //laporan perubahan gaji
    static readonly gaji_laporan: string = "/mnk/karyawan/:id/gaji/laporan";

    static readonly login: string = "/mnk/login";
    static readonly logout: string = "/mnk/logout";
}