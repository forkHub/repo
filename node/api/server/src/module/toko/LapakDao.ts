import { sql } from "../Sql";

export class LapakDAo {

	static async daftarLapak(): Promise<ILapak[]> {
		let hasil: ILapak[] = await sql.query(`
			SELECT *
			FROM tk_lapak`,
			[]) as ILapak[];

		return hasil;
	}

}