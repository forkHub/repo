import { AdminDao } from "./AdminDao";
import { AuthDao } from "./AuthDao";
import { BarangDao } from "../gudang/BarangDao";

export class Admin {
    readonly AdminDao: AdminDao = new AdminDao();
    readonly auth: AuthDao = new AuthDao();
    readonly penjual: BarangDao = new BarangDao();
}