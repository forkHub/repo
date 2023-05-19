// import { beranda } from "../render/web/HalLapak"
// import { Gudang } from "../dao/gudang/Gudang"
import { AdminController } from "./admin/AdminController"
import { AuthController } from "./admin/AuthController"
// import { BarangCont } from "./gudang/BarangCont"
import { Gudang } from "./gudang/Gudang"
import { BarangController } from "./web/BarangController"
// import { barangController } from "./web/BarangController"
import { BerandaController } from "./web/BerandaController"
// import { berandaController } from "./web/BerandaController"
import { HalLapakController } from "./web/HalLapakController"

export var cont = {
	admin: {
		auth: new AuthController(),
		// gudang: new GudangCont(),
		admin: new AdminController()
	},
	gudang: new Gudang(),
	web: {
		barang: new BarangController(),
		beranda: new BerandaController(),
		lapak: new HalLapakController()
	}
}