import { Admin } from "./admin/Admin";
import { AuthDao } from "./admin/AuthDao";
// import { GudangDao } from "./gudang/GudangDao";
import { AnggotaDao } from "./AnggotaDao";
import { Web } from "./web/web";
import { Gudang } from "./gudang/Gudang";
import { BarangDao } from "./BarangDao";
// import { BarangDao } from "./gudang/BarangDao";


export class Dao {
	readonly admin: Admin = new Admin();
	readonly web: Web = new Web();
	readonly auth: AuthDao = new AuthDao();
	readonly gudang: Gudang = new Gudang();
	readonly anggota: AnggotaDao = new AnggotaDao();
	readonly barang: BarangDao = new BarangDao();
}

// export var dao = {
// 	admin: {
// 		auth: authSql,
// 		penjual: penjualSql,
// 		admin: new AdminDao()
// 	},
// 	toko: {
// 		barang: BarangDao = new BarangDao()
// 		beranda: berandaSql,
// 		lapak: new LapakSql()
// 	}
// }