import { Connection } from "../../../Connection";
import { sql } from "../../Sql";
import { v } from "../../Validator";
import { IBarangObj, IHasilQuery, IAnggotaObj } from "../../Type";

export class BarangDao {

	//TODO: [ref] pindahin ke profile
	async profileEdit(data: IAnggotaObj): Promise<IHasilQuery> {
		return new Promise((resolve, reject) => {
			Connection.pool.query(`UPDATE pengguna SET ? WHERE id = ?`, [data, data.id],
				(_err, _rows) => {
					if (_err) {
						console.error(_err);
						reject(_err);
					}
					else {
						resolve(_rows);
					}
				});
		});
	}

	async barangBaru(data: IBarangObj): Promise<IHasilQuery> {
		return await sql.query(
			`INSERT INTO tk_barang SET ?`,
			[data]) as unknown as IHasilQuery;
	}

	async barangEdit(data: IBarangObj): Promise<IHasilQuery> {
		return await sql.query(`
			UPDATE tk_barang
			SET
				nama = ?,
				desk_panjang = ?,
				harga = ?,
				publish = ?,
				tgl_update = NOW(),
				thumb = ?,
				gbr = ?,
				jml_view = ?
			WHERE id = ?
		`, [
			v.escape(data.nama),
			v.checkScriptErr(data.desk_panjang),
			data.harga,
			data.publish,
			data.thumb,
			data.gbr,
			parseInt(data.jml_view + ''),
			data.id
		]) as unknown as IHasilQuery;
	}

	async barangHapus(id: number): Promise<IHasilQuery> {
		return sql.query(`
			DELETE FROM tk_barang
			WHERE id = ?
		`, [id]) as unknown as IHasilQuery;
	}

	async daftarBarang(anggotaId: number): Promise<IBarangObj[]> {
		return await sql.query(`
			SELECT tk_barang.id, tk_barang.nama, tk_barang.harga, tk_barang.thumb, tk_barang.tgl_update, tk_barang.publish
			FROM tk_barang
			WHERE anggota_id = ?`, [anggotaId]);
	}

	async bacaBarangBuatEdit(id: number): Promise<IBarangObj[]> {
		return (
			await sql.query(`
				SELECT * 
				FROM tk_barang
				WHERE tk_barang.id = ?`,
				[id])) as IBarangObj[];
	}

	async barangCheckPemilik(id: number): Promise<IBarangObj[]> {
		return (
			await sql.query(`
				SELECT barang.lapak_id 
				FROM barang 
				WHERE barang.id = ?`,
				[id])) as IBarangObj[];
	}


}
