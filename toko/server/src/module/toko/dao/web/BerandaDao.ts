import { sql } from "../../Sql";
import { config } from "../../Config";
import { IBarangObj, IJUmlah } from "../../Type";

export class BerandaDao {

	async jmlBarang(): Promise<IJUmlah[]> {
		return await sql.query(`
				SELECT count(tk_barang.id) as jumlah 
				FROM tk_barang 
				LEFT JOIN tk_anggota ON tk_barang.anggota_id = tk_anggota.id 
				WHERE publish = 3 AND tk_anggota.aktif = 1`,
			[]) as IJUmlah[];
	}

	async semuaBarang(offsetAbs: number): Promise<IBarangObj[]> {
		return await sql.query(
			`SELECT 
				tk_barang.id, tk_barang.nama, tk_barang.harga, tk_barang.thumb,
				tk_anggota.wa as wa
			FROM tk_barang
			LEFT JOIN tk_anggota ON tk_anggota.id = tk_barang.anggota_id
			WHERE 
				tk_barang.publish = 3 
				AND tk_anggota.aktif = 1
			ORDER BY tk_barang.jml_view ASC
			LIMIT ?
			OFFSET ?;`.replace(/\t/g, ''), [config.jmlPerHal, offsetAbs]);
	}

	async jmlCariBarang(kunci: string): Promise<IJUmlah[]> {
		let kunciSql: string = `%${kunci}%`;

		let hasil: IJUmlah[] = await sql.query(`
			SELECT COUNT(tk_barang.id) as jumlah
			FROM tk_barang
			LEFT JOIN tk_anggota ON tk_anggota.id = tk_barang.anggota_id
			WHERE (
					tk_barang.nama LIKE ? 
					OR tk_barang.deskripsi LIKE ? 
					OR tk_barang.desk_panjang LIKE ?
				) 
				AND tk_anggota.aktif = 1
		`, [kunciSql, kunciSql, kunciSql]) as IJUmlah[];

		return hasil;
	}

	async cariBarang(kunci: string, offsetAbs: number): Promise<IBarangObj[]> {
		let kunciSql: string = `%${kunci}%`;

		return await sql.query(` 
			SELECT 
				tk_barang.id, tk_barang.nama, tk_barang.harga, tk_barang.thumb, tk_barang.deskripsi, tk_barang.desk_panjang,
				tk_anggota.wa as wa
			FROM tk_barang
			LEFT JOIN tk_anggota ON tk_anggota.id = tk_barang.anggota_id
			WHERE 
				(
					(tk_barang.nama LIKE ?) OR 
					(tk_barang.deskripsi LIKE ?) OR 
					(tk_barang.desk_panjang LIKE ?)
				) AND
				tk_anggota.aktif = 1
			ORDER BY tk_barang.jml_view ASC
			LIMIT ?
			OFFSET ?
		`, [kunciSql, kunciSql, kunciSql, config.jmlPerHal, offsetAbs]);
	}
}