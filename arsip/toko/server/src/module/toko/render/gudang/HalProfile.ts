import { Param } from "../../Param";
import { Util, util } from "../../Util";
import { toko } from "../../AppToko";
import { config } from "../../Config";
import { IAnggotaObj } from "../../Type";

export class Profile {
	render(penjual: IAnggotaObj): string {
		return `
		<!DOCTYPE html>
		<html lang="id">
			<head>
				<title>${config.namaToko} - profile</title>
				<meta name="viewport" content="width=device-width, initial-scale=1">

				<link rel='stylesheet' href='/css/bootstrap.min.css' rel='stylesheet' />
				<link rel='stylesheet' href="/css/css.css?r=${util.randId}" />
				<link rel='stylesheet' href="/css/umum.css?r=${util.randId}" />
				
				<link rel='stylesheet' href="/css/font/css/fontello.css?r=${util.randId}" />
				<link rel='stylesheet' href="/css/font/css/fontello-codes.css?r=${util.randId}" />
								
			</head> 

			<!-- SINKRONISASI TAB BARANG - TAB PROFILE -->
			<body data-id=${penjual.id} data-host=${config.website} data-aktif=${penjual.aktif}>
				<div class='container'>
					<!-- NAV BAR -->
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<div class="container-fluid">
							<a class="navbar-brand" href="#">${penjual.lapak}</a>
						</div>
					</nav>

					<div class="text-align-right">
						<a href="${toko.router.toko_auth_logout}">logout</a>
					</div>

					<nav aria-label="breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a class='beranda' href="${toko.router.toko_web_beranda}">🏪</a></li>
							<li class="breadcrumb-item active" aria-current="page">gudang</li>
						</ol>
					</nav>
					
					<!-- SINKRONISASI TAB BARANG - TAB PROFILE -->
					<ul class="nav nav-tabs">
						<li class="nav-item">
							<a class="nav-link" href="${toko.router.toko_gudang_barang_daftar}">barang</a>
						</li>

						<li class="nav-item">
							<a class="ul li nav-link active">profile</a>
						</li>

						<li class="nav-item">
							<a class="ul li nav-link icon-menu popup-menu" href="#"></a>
						</li>

					</ul>

					<br/>
							
					<div class='cont'>
						<p class="text-secondary mb-1 font-weight-bold">user name:</p>
						<p class="text-muted font-size-sm">${penjual.user_name}</p>					
						<p class="text-secondary mb-1 font-weight-bold">nama lapak:</p>
						<p class="text-muted font-size-sm">${penjual.lapak}</p>					
						<p class="text-secondary mb-1 font-weight-bold">deskripsi lapak:</p>
						<p class="text-muted font-size-sm">${penjual.deskripsi}</p>					
						<p class="text-secondary mb-1 font-weight-bold">wa: (62xxx)</p>
						<p class="text-muted font-size-sm">${penjual.wa}</p>					
						<p class="text-secondary mb-1 font-weight-bold">alamat:</p>
						<p class="text-muted font-size-sm">${penjual.alamat}</p>					
						<p class="text-secondary mb-1 font-weight-bold">email:</p>
						<p class="text-muted font-size-sm">${penjual.email}</p>					
					</div>
					
					<div class='row'>
						<div class='col-12 col-sm-6'>
							<button 
								type='button' 
								class='btn btn-primary btn-block margin-bottom-8' 
								${Param.HA_KLIK} 
								${Param.HA_GET}="${toko.router.toko_gudang_profile_edit}">
									edit profile
							</button>
						</div>

						<div class='col-12 col-sm-6'>
							<button 
								type='button' 
								class='btn btn-primary btn-block margin-bottom-8' 
								${Param.HA_KLIK} 
								${Param.HA_GET}="${toko.router.toko_gudang_profile_password_edit}">
									ganti password
							</button>
						</div>
					</div>				
				</div>

				<!-- SINKRONISASI TAB BARANG - TAB PROFILE -->
				<script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
                <script type="module" src="/js${Util.revisi}/toko/Gudang.js?r=${util.randId}"></script>
			</body>
		</html>`;
	}
}