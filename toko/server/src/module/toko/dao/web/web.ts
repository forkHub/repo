import { BarangDao } from "./BarangDao";
import { BerandaDao } from "./BerandaDao";
import { LapakDao } from "./LapakDao";

export class Web {
    readonly barang: BarangDao = new BarangDao();
    readonly beranda: BerandaDao = new BerandaDao();
    readonly lapak: LapakDao = new LapakDao();
}