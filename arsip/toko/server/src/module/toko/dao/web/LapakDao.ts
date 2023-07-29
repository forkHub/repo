import { sql } from "../../Sql";
import { IBarangObj } from "../../Type";

export class LapakDao {
	/**
	 * Daftar barang di beranda toko berdasarkan anggotaId
	 * @param anggotaId 
	 * @returns 
	 */
	async daftarBarang(anggotaId: number): Promise<IBarangObj[]> {
		return await sql.query(`
            SELECT tk_barang.id, tk_barang.nama, tk_barang.harga, tk_barang.thumb
			FROM tk_barang
			LEFT JOIN tk_anggota ON tk_barang.anggota_id = tk_anggota.id
			WHERE tk_barang.anggota_id = ? AND tk_barang.publish = 3 AND tk_anggota.aktif = 1
			ORDER BY tk_barang.jml_view ASC
        `, [anggotaId]);
	}

}