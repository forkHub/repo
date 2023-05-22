import { sql } from "../Sql";

class Karyawan {
    private readonly daftar: IKaryawan[] = [];

    constructor() {
        this.def();
    }

    def(): void {
        this.daftar.push({
            gaji: 1000,
            id: 1,
            nama: 'karyawan 01'
        });
        this.daftar.push({
            gaji: 1000,
            id: 2,
            nama: 'karyawan 02'
        });
        this.daftar.push({
            gaji: 1000,
            id: 3,
            nama: 'karyawan 03'
        });
    }

    //daftar semua karyawan
    async daftarKaryawan(): Promise<IKaryawan[]> {
        let hasil: IKaryawan[] = await sql.query(`
			SELECT *
			FROM tk_lapak`,
            []) as IKaryawan[];

        return hasil;
    }

    //karyawan baru

    //karyawan edit

    //karyawan lihat
    async lihat(id: string): Promise<IKaryawan> {
        let hasil: IKaryawan = await sql.query(`

        `, [id]) as unknown as IKaryawan;

        return hasil;
    }

    //pembayaran gaji karyawan
    //perubahan gaji karyawan 
}

export var karyawanDao: Karyawan = new Karyawan();