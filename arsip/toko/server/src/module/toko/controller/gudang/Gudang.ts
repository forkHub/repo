import { BarangCont } from "./BarangCont";
import { ProfileCont } from "./ProfileCont";

export class Gudang {
    readonly barang: BarangCont = new BarangCont();
    readonly profile: ProfileCont = new ProfileCont();
}