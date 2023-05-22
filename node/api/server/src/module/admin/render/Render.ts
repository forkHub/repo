import { Param } from "../../Param";
import { AnggotaBaru } from "../../admin/render/AnggotaBaru";
import { DaftarAnggotaRenderer } from "../../admin/render/DaftarAnggota";
import { EditBeranda } from "../../admin/render/EditBeranda";
import { EditProfileAnggota } from "../../admin/render/EditProfileAnggota";
import { PilihAnggotaGenerik } from "./PilihAnggotaGenerik";
import { util } from "../../Util";
import { HalSilsilah } from "../../silsilah/HalSilsilah";
import { RouterKons } from "../RouterKons";

export class Render {
	readonly daftarAnggota: DaftarAnggotaRenderer = new DaftarAnggotaRenderer();
	readonly editBeranda: EditBeranda = new EditBeranda();
	readonly editProfileAnggota: EditProfileAnggota = new EditProfileAnggota();
	readonly anggotaBaru: AnggotaBaru = new AnggotaBaru();

	readonly pilihAnggotaGenerik: PilihAnggotaGenerik = new PilihAnggotaGenerik();
	readonly silsilah: HalSilsilah = new HalSilsilah();

	public renderCari(status: boolean, path: string, anggota: ISlAnggota): string {
		if (!status) return '';

		return `
			<div class="" id="navbarSupportedContent">
				<form 
					method="get" 
					type="cari" 
					class="d-flex" 
					action="${path}"
					anggota-id="${anggota ? anggota.id : '0'}"
					>
					<input class="form-control me-2" type="search" name="cari" placeholder="Search" aria-label="Search" required>
					<button class="btn btn-outline-success" type="submit">Cari</button>
				</form>
			</div>`
	}

	//TODO: [dev] form action upload
	renderUpload(thumb: string, anggota: ISlAnggota): string {

		return `
			<div class='background disp-none upload-gambar padding-16'>
				<div class='box padding-8 bg-putih'>
					<div class='text-align-right'>
						<button class='btn btn-primary tutup' ${Param.HA_KLIK} ${Param.HA_TOGGLE}="div.upload-gambar">X</button>
					</div>

					<form 
						action="${util.getUrl(RouterKons.uploadFoto, [anggota.id])}"
						method="post"
						class='cont upload'
						${Param.HA_MANUAL}
						>

						<div class="form-group">
							<label for="thumb">Gambar:</label><br/>
							<img class="img-ori disp-block" src="${thumb}"><br/>
							<input type="file">
						</div>
					
						<div class='thumb-cont disp-none'>
						</div>

						<div class='foto-cont disp-none'>
						</div>
						
						<button type='submit' class='btn btn-primary upload'>Upload</button>
					</form>
				</div>
			</div>

		`;
	}
}