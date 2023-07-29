import { sql } from "../../Sql";
import { IBarangObj } from "../../Type";

export class BarangDao {

	async bacaById(id: number): Promise<IBarangObj[]> {
		return await sql.query(`
		SELECT *
		FROM tk_barang
		WHERE tk_barang.id = ?`, [id]);
	}

	async barangTerkait(lapakId: number): Promise<IBarangObj[]> {
		return await sql.query(`
		SELECT *
		FROM tk_barang
		LEFT JOIN tk_anggota ON tk_anggota.id = tk_barang.anggota_id 
		WHERE tk_barang.anggota_id = ?
			AND tk_anggota.aktif = 1
			AND tk_anggota.setuju = 1
		ORDER BY tk_barang.jml_view ASC
		LIMIT 5
		`, [lapakId]);

	}


}