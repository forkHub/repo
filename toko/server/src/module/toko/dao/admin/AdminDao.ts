import { sql } from "../../Sql";
import { config } from "../../Config";

export class AdminDao {

	async hapusSemuaBarang(): Promise<void> {
		await sql.query(`
			DELETE FROM barang`,
			[]);
	}

	async hapusAnggotaByUserName(userName: string): Promise<any> {
		let hasil: any = await sql.query(`
			DELETE 
			FROM pengguna
			WHERE
			user_id = ?
			AND toko_id = ?
		`, [userName, config.tokoId]);

		return hasil;
	}

	async hapusAnggota(id: number): Promise<any> {
		let hasil: any = await sql.query(`
			DELETE 
			FROM pengguna
			WHERE
			id = ?
			AND toko_id = ?
		`, [id, config.tokoId]);

		return hasil;
	}

	async daftarAnggota(): Promise<any> {
		return await sql.query(`
			SELECT * 
			FROM barang
			WHERE toko_id = ?
		`, [config.tokoId])
	}
}