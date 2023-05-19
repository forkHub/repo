import { Param } from "../../Param";
import { Util, util } from "../../Util";
import { toko } from "../../AppToko";
import { IBarangObj } from "../../Type";

export class HalBarangLihat {

	render(barang: IBarangObj, namaLapak: string): string {
		return `
		<!DOCTYPE html>
		<html lang="id">
			<head>
				<title>LIhat Barang</title>
				<meta name="viewport" content="width=device-width, initial-scale=1">
			
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
							<li class="breadcrumb-item active" aria-current="page">${barang.nama}</li>
						</ol>
					</nav>

                    <!-- FOTO BARANG -->

                    <img src="${barang.thumb ? (toko.kons.folder_download + barang.thumb) : "/gbr/thumb.png"}"></img><br/>
					<hr/>

					<div class="detail">
						<p class="text-secondary mb-1 font-weight-bold">nama:</p>
						<p class="text-muted font-size-sm">${barang.nama}</p>

						<p class="text-secondary mb-1 font-weight-bold">deskripsi panjang:</p>
						<div class="text-muted font-size-sm border">${barang.desk_panjang}</div>

						<br/>
						<p class="text-secondary mb-1 font-weight-bold">harga:</p>
						<p class="text-muted font-size-sm">${util.renderHarga(barang.harga)}</p>

						<p class="text-secondary mb-1 font-weight-bold">status publikasi:</p>
						<p class="text-muted font-size-sm">${toko.dao.barang.statusById(barang.publish)}</p>

						<div class='row'>
							<div class='col-12 col-sm-6'>
								<button 
									class="btn btn-primary btn-block" 
									${Param.HA_KLIK} 
									${Param.HA_GET}="${util.getUrl(toko.router.toko_gudang_barang_edit_barangId, [barang.id + ''])}">
										edit
								</button>
							</div>

							<div class="col-12 col-sm-6">
								<button 
									class="btn btn-danger btn-block" 
									${Param.HA_KLIK} 
									${Param.HA_POST}="${util.getUrl(toko.router.toko_gudang_barang_hapus, [barang.id + ''])}" 
									${Param.HA_URL}="${toko.router.toko_gudang_barang_daftar}"
									${Param.HA_KF}="Apakah barang akan dihapus?"
									${Param.HA_DLG}="Barang sudah berhasil dihapus?">
										hapus
								</button>
							</div>
						</div>

					</form>

				</div>
				<br/>
				<br/>

				<script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
			</body>
		</html>`;
	}
}