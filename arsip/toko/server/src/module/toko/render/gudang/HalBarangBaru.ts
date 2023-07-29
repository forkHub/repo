import { Param } from "../../Param";
import { Util, util } from "../../Util";
import { toko } from "../../AppToko";

//TODO: upload gambar
//TODO: [ux] huruf kecil

export class HalBarangBaru {
	render(lapakId: number, namaLapak: string): string {
		return `
		<!DOCTYPE html>
		<html lang="id">
			<head>
				<title>Barang Baru</title>
				<meta name="viewport" content="width=device-width, initial-scale=1">

				<script src="/lib/tinymce/tinymce.min.js"></script>
				<script src="/lib/load-image.all.min.js"></script>
				<script src="/lib/md5.min.js"></script>
				
				<link href='/css/bootstrap.min.css' rel='stylesheet' />
				<link rel='stylesheet' href="/css/umum.css?r=${util.randId}" />
				
			</head>
			<body>
				<div class="container">

					<!-- NAV BAR -->
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<div class="container-fluid">
							<a class="navbar-brand" href="#">${namaLapak}</a>
						</div>
					</nav>

					<br/>

					<nav aria-label="breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a class='' href="${toko.router.toko_gudang_barang_daftar}">🏠</a></li>
							<li class="breadcrumb-item active" aria-current="page">Barang Baru</li>
						</ol>
					</nav>

					<form
						class="barang"
						action="${toko.router.toko_gudang_barang_baru}" 
						method="post" ${Param.HA_URL}="${toko.router.toko_gudang_barang_daftar}" 
						${Param.HA_DLG}="Barang Telah Disimpan">

						<div class="form-group">
							<label for="thumb">Gambar:</label><br/>
							<img class="img-asli" src="/gbr/thumb.png"}">
							<div class="thumb-cont disp-none">
							</div>

							<input type="hidden" class='thumb' name="thumb" value="">
							<input type="hidden" class='thumb' name="gbr" value="">

							<button 
								type="button" 
								class="btn btn-primary ganti-gambar"
								${Param.HA_TOGGLE}="div.upload-gambar"
								${Param.HA_KLIK}
								>Ganti Gambar</button>
						</div>

						<hr/>

						<div class="form-group">
							<label for="nama-barang">Nama:</label>
							<input 
								type="text" 
								class="form-control nama-barang" 
								name="nama" 
								id="nama-barang"
								maxlength="50" 
								placeholder="nama barang" 
								required/>
						</div>

						<div class="form-group deskripsi-barang-panjang">
							<label for="deskripsi-barang-panjang">Deskripsi Panjang:</label>

							<textarea
								rows="20"
								class="form-control"
								id="deskripsi-barang-panjang"
								name="desk_panjang"
								placeholder="deskripsi panjang"
								${Param.HA_TINYMCE}></textarea>
						</div>

						<div class="form-group">
							<label for="harga-barang">Harga:</label>
							<input 
								type="text" 
								class="form-control" 
								id="harga-barang" 
								name="harga" 
								required
								placeholder="Rp. 1000.000,-" 
								${Param.HA_RP}"/>
						</div>

						<div class="form-group">
							<label for="status-publikasi">Status publikasi:</label>
							<select class="form-select" name="publish" id="status-publikasi">
								<option value="3" selected>Publikasikan</option>
								<option value="2">Draft</option>
							</select>
						</div>

						<input type="hidden" class='anggota_id' name="anggota_id" value="${lapakId}">

						<div class='text-align-center'>
							<button type="submit" class="btn btn-primary btn-sm submit col-12 col-sm-6">Simpan</button>
						</div>

					</form>

				</div>
				<br/>
				<br/>

				${toko.render.upload("/gbr/thumb.png")}

                <script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
                <script type="module" src="/js${Util.revisi}/toko/PhotoUploadPage.js?r=${util.randId}"></script>
			</body>
		</html>`;
	}
}