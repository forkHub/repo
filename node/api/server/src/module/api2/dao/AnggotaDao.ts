import { sql } from "../../Sql";
import { queryObj } from "./Query";

export class AnggotaDao {
    async lihatById(id: number): Promise<ISlAnggota[]> {
        let query: string = queryObj.selectAnggota + `
			WHERE id = ?
            LIMIT 1
		`;

        let hasil: ISlAnggota[] = await sql.query(query, [id]) as ISlAnggota[];

        if (hasil && hasil.length > 0) {
            return hasil;
        }
        else {
            console.warn('hasil tidak ditemukan:');
            console.log('query ' + query);
            return [];
        }
    }
}