import mysql from "mysql";
import { configDB } from "./toko/ConfigDB";

export class Connection {
	private static _connection: mysql.Connection;
	private static _pool: mysql.Pool;

	public static get pool(): mysql.Pool {
		return Connection._pool;
	}

	public static get connection(): mysql.Connection {
		return this._connection;
	}

	static getPool(): Promise<mysql.PoolConnection> {
		return new Promise((resolve, reject) => {
			Connection._pool.getConnection((err: mysql.MysqlError, connection: mysql.PoolConnection) => {
				if (err) {
					console.error(err);
					reject(err);
				}
				else {
					resolve(connection);
				}
			})

		})
	}

	static connect() {
		try {
			Connection._pool = mysql.createPool({
				host: configDB.host,
				user: configDB.user,
				password: configDB.pass,
				database: configDB.db,
				port: configDB.port,
				multipleStatements: true
			})
		} catch (e) {
			console.error(e);
		}
	}
}
