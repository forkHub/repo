// import { Util, util } from "../../../Util";
import { Param } from "../../Param";
import { Util, util } from "../../Util";
import { toko } from "../../AppToko";
import { config } from "../../Config";
import { IAnggotaObj } from "../../Type";

export class HalEditProfile {
	render(penjual: IAnggotaObj): string {
		return `
		<!DOCTYPE html>
		<html lang="id">
			<head>
				<title>${config.namaToko} - edit profile</title>
				<meta name="viewport" content="width=device-width, initial-scale=1">

				<link rel='stylesheet' href='/css/bootstrap.min.css' rel='stylesheet' />
				<link rel='stylesheet' href="/css/css.css?r=${util.randId}" />
				<link rel='stylesheet' href="/css/umum.css?r=${util.randId}" />
				
				<link rel='stylesheet' href="/css/font/css/fontello.css?r=${util.randId}" />
				<link rel='stylesheet' href="/css/font/css/fontello-codes.css?r=${util.randId}" />

			</head> 
			<body>
				<div class='container'>

					<!-- NAV BAR -->
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<div class="container-fluid">
							<a class="navbar-brand" href="#">${penjual.lapak}</a>
						</div>
					</nav>

					<div class="text-align-right">
						<a href="${toko.router.toko_auth_logout}">Logout</a>
					</div>
					
					<nav aria-label="breadcrumb" class="menu">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a class="beranda" href="${toko.router.toko_gudang_barang_daftar}">Beranda</a></li>
							<li class="breadcrumb-item"><a class="profile" href="${toko.router.toko_gudang_profile}">Profile</a></li>
							<li class="breadcrumb-item active" aria-current="page">Edit Detail</li>
						</ol>
					</nav>
					
					<div class='cont'>
						<form action="${toko.router.toko_gudang_profile_edit}" method="post" ${Param.HA_DLG}="profile berhasil disimpan" ${Param.HA_URL}="${toko.router.toko_gudang_profile}">
							
							<div class="form-group">
								<label for="user_name">user name:</label>
								<input type="text" class="form-control lapak" name="user_name" id="user_name" maxlength="50" placeholder="user name" required value="${penjual.user_name}"/>
							</div>
							
							<div class="form-group">
								<label for="lapak">nama lapak:</label>
								<input type="text" class="form-control lapak" name="lapak" id="lapak" maxlength="50" placeholder="nama lapak" required value="${penjual.lapak}"/>
							</div>

							<div class="form-group">
								<label for="deskripsi">deskripsi lapak:</label>
								<input type="text" class="form-control deskripsi" name="deskripsi" id="deskripsi" maxlength="50" placeholder="deskripsi" required value="${penjual.deskripsi}"/>
							</div>

							<div class="form-group">
								<label for="wa">no wa: 62xxx</label>
								<input type="text" class="form-control wa" name="wa" id="wa" maxlength="50" placeholder="6212345" required value="${penjual.wa}"/>
							</div>

							<div class="form-group">
								<label for="alamat">alamat:</label>
								<input type="text" class="form-control alamat" name="alamat" id="alamat" maxlength="50" placeholder="alamat" required value="${penjual.alamat}"/>
							</div>
							
							<div class="form-group">
								<label for="email">email:</label>
								<input type="email" class="form-control email" name="email" id="email" maxlength="50" placeholder="email" required value="${penjual.email}"/>
							</div>
							
							<div class="text-align-center">
								<button type="submit" class="btn btn-primary submit tbl-blok">simpan</button>
							</div>

						</form
					</div>
				</div>

				<script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
			</body>
		</html>`;
	}
}