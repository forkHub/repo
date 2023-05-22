import { Connection } from "./Connection";

class Sql {
	async query(query: string, data: any[]): Promise<unknown[]> {
		// this.log(query, data);

		return new Promise((resolve, reject) => {
			Connection.pool.query(
				query, data,
				(_err: any, _rows: any) => {
					if (_err) {
						reject(_err);
					}
					else {
						resolve(_rows);
						// console.debug(_rows);
					}
				});
		});
	}

	log(query: string, data: any[]): void {
		query = query.replace(/\t/g, '');
		console.log("=============");
		console.log('query:')
		console.debug(query);
		console.log("data:");
		console.log(data)
		console.log("=============");
	}

}

export var sql: Sql = new Sql();