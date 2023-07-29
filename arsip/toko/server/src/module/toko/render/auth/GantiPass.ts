import { Param } from "../../Param";
import { util, Util } from "../../Util";
import { toko } from "../../AppToko";
import { config } from "../../Config";
import { IAnggotaObj } from "../../Type";


export class GantiPass {
	render(profile: IAnggotaObj): string {
		return `
		<!DOCTYPE html>
		<html lang="id">
			<head>
				<title>${config.namaToko} - ganti password</title>
				<meta name="viewport" content="width=device-width, initial-scale=1">

				<link rel='stylesheet' href='/css/bootstrap.min.css' rel='stylesheet' />
				<link rel='stylesheet' href="/css/css.css?r=${util.randId}" />
				<link rel='stylesheet' href="/css/umum.css?r=${util.randId}" />
				
				<link rel='stylesheet' href="/css/font/css/fontello.css?r=${util.randId}" />
				<link rel='stylesheet' href="/css/font/css/fontello-codes.css?r=${util.randId}" />

				<script src="/lib/md5.min.js"></script>
			</head>
			<body>
				<div class='container'>

					<!-- NAV BAR -->
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<div class="container-fluid">
							<a class="navbar-brand" href="#">${profile.lapak}</a>
						</div>
					</nav>

					<div class="text-align-right">
						<a href="${toko.router.toko_auth_logout}">Logout</a>
					</div>
					
					<nav aria-label="breadcrumb" class="menu">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a class="beranda" href="${toko.router.toko_gudang_barang_daftar}">🏪</a></li>
							<li class="breadcrumb-item"><a class="profile" href="${toko.router.toko_gudang_profile}">profile</a></li>
							<li class="breadcrumb-item active" aria-current="page">password</li>
						</ol>
					</nav>
					
					<div class='cont'>
						<form action="${toko.router.toko_gudang_profile_password_edit}" method="post" ${Param.HA_DLG}="password berhasil diubah" ${Param.HA_URL}="${toko.router.toko_gudang_profile}">

							<div class="form-group">
								<label for="lapak">password lama:</label>
								<input type="password" class="form-control lapak" name="password_lama" id="password_lama" maxlength="20" required ${Param.HA_MD5}/>
							</div>
							
							<div class="form-group">
								<label for="lapak">password baru:</label>
								<input type="password" class="form-control lapak" name="password_baru" id="password_baru" maxlength="20" required ${Param.HA_MD5}/>
							</div>

							<div class="form-group">
								<label for="lapak">konfirmasi password:</label>
								<input type="password" class="form-control lapak" name="password_konfirmasi" id="password_konfirmasi" maxlength="20" required ${Param.HA_MD5}/>
							</div>

							<div class="text-align-center">
								<button type="submit" class="col-6 btn btn-primary btn-sm submit">Simpan</button>
							</div>
						</form
					</div>
				</div>

				<script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>

			</body>
		</html>`;
	}
}