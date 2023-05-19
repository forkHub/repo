import { HalBarangBaru } from "./HalBarangBaru";
import { HalBarangEdit } from "./HalBarangEdit";
import { HalBarangLihat } from "./HalBarangLihat";
import { HalBeranda } from "./HalBeranda";
// import { HalEditPassword } from "./HalEditPassword";
import { HalEditProfile } from "./HalEditProfile";
import { Profile } from "./HalProfile";

export class Gudang {
	public readonly beranda: HalBeranda = new HalBeranda();
	public readonly barangBaru: HalBarangBaru = new HalBarangBaru();
	public readonly barangEdit: HalBarangEdit = new HalBarangEdit();
	public readonly barangLihat: HalBarangLihat = new HalBarangLihat();

	public readonly profile: Profile = new Profile();
	public readonly editProfile: HalEditProfile = new HalEditProfile();
	// public readonly editPassword: HalEditPassword = new HalEditPassword();
}