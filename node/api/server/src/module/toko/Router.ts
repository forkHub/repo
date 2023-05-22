import express from "express";
import { auth } from "../auth/Auth";
import { Lapak } from "./Lapak";

export class Router {
	readonly router = express.Router();

	impl(): void {
		Lapak.init();
		Lapak.router(this.router);

		//halaman web
		this.router.get("/hal/lapak/:id", auth.cont.checkAuthGet, () => { });
		this.router.get("/hal/lapak/:id/daftar", auth.cont.checkAuthGet, () => { });
		this.router.get("/hal/lapak/:id/edit", auth.cont.checkAuthGet, () => { });
		this.router.get("/hal/barang/:id", auth.cont.checkAuthGet, () => { });
		this.router.get("/hal/barang/:id/edit", auth.cont.checkAuthGet, () => { });

		//lapak
		this.router.get("/tk/lapak", auth.cont.checkAuthGet, () => { });
		this.router.get("/tk/lapak/:id/profile", auth.cont.checkAuthGet, () => { });
		this.router.get("/tk/lapak/:id/barang/", auth.cont.checkAuthGet, () => { });
		this.router.post("/tk/lapak", auth.cont.checkAuthGet, () => { });
		this.router.post("/tk/lapak/:id/edit/", auth.cont.checkAuthGet, () => { });
		this.router.post("/tk/lapak/:id/hapus/", auth.cont.checkAuthGet, () => { });

		//barang
		this.router.get("/tk/barang/:id", auth.cont.checkAuthGet, () => { });
		this.router.post("/tk/lapak/:id/barang", auth.cont.checkAuthGet, () => { });
		this.router.post("/tk/barang/:id/edit", auth.cont.checkAuthGet, () => { });
		this.router.post("/tk/barang/:id/hapus", auth.cont.checkAuthGet, () => { });

		//foto 
		this.router.get("/tk/foto/:id/url", auth.cont.checkAuthGet, () => { });
		this.router.get("/tk/foto/:id/thumb", auth.cont.checkAuthGet, () => { });
		this.router.post("/tk/barang/:id/foto", auth.cont.checkAuthGet, () => { });
		this.router.post("/tk/foto/:id/hapus", auth.cont.checkAuthGet, () => { });
	}
}