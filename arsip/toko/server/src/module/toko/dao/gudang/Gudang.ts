import { BarangDao } from "./BarangDao";
import { ProfileDao } from "./ProfileDao";

export class Gudang {
    readonly barang: BarangDao = new BarangDao();
    readonly profile: ProfileDao = new ProfileDao();
}