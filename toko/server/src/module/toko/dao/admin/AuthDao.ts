import { Connection } from "../../../Connection";
import { sql } from "../../Sql";
import { IAnggotaObj, IHasilQuery } from "../../Type";

//TODO: [ref] refaktor pakay sql.query
export class AuthDao {

	async login(username: number, pass: string): Promise<IAnggotaObj[]> {
		let query: string = `
			SELECT id, user_name, lapak, wa, aktif
			FROM tk_anggota
			WHERE user_name = ?
			AND password = ?
			AND setuju = 1
		`;

		return new Promise((resolve, reject) => {
			Connection.pool.query(
				query, [username, pass],
				(_err: any, _rows: any) => {
					if (_err) {
						reject(_err);
					}
					else {
						resolve(_rows);
					}
				});
		});
	}

	async pass(id: number): Promise<IAnggotaObj[]> {
		return await sql.query(`SELECT password FROM tk_anggota WHERE id=?`, [id]);
	}

	async daftar(data: IAnggotaObj): Promise<IHasilQuery> {
		let query: string = `INSERT INTO tk_anggota SET ?`;

		return await sql.query(query, [data]) as unknown as IHasilQuery;
	}

	async updatePassword(id: number, password: string): Promise<IHasilQuery> {
		return await sql.query(`
			UPDATE tk_anggota
			SET password = ?
			WHERE id = ?`, [password, id]) as unknown as IHasilQuery;
	}

	async getByEmail(email: string): Promise<IAnggotaObj[]> {
		return await sql.query(`
			SELECT id, email 
			FROM tk_anggota
			WHERE email = ?
		`, [email]);
	}
}