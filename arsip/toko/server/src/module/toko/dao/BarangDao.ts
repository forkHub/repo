import { sql } from "../Sql";
import { IBarangObj } from "../Type";

export class BarangDao {
	readonly status = [
		{
			id: 2,
			value: "draft"
		},
		{
			id: 3,
			value: 'dipublikasikan'
		}
	];

	statusById(id: number): string {
		for (let i: number = 0; i < this.status.length; i++) {
			if (this.status[i].id == id) return this.status[i].value;
		}

		throw Error('status tidak ketemu: id ' + id);
		return '';
	}

	async jmlView(id: number): Promise<IBarangObj[]> {
		return await sql.query(`
		SELECT jml_view
		FROM tk_barang
		WHERE tk_barang.id = ?`, [id]);
	}

	async bacaById(id: number): Promise<IBarangObj[]> {
		return await sql.query(`
		SELECT *
		FROM tk_barang
		WHERE tk_barang.id = ?`, [id]);
	}

	async updateJmlView(id: number): Promise<void> {
		await sql.query(`
			UPDATE tk_barang
			SET jml_view = jml_view + 1
			WHERE id = ?
		`, [id]);
	}
}