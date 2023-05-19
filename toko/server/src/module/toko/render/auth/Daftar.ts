import { Param } from "../../Param";
import { util, Util } from "../../Util";
import { toko } from "../../AppToko";
import { config } from "../../Config";

export class Daftar {
	render(): string {
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
										
					<div class='cont'>

						<nav aria-label="breadcrumb" class="menu">
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><a class="beranda" href="${toko.router.toko_web_beranda}">🏪</a></li>
								<li class="breadcrumb-item"><a class="login" href="${toko.router.toko_auth_login}">login</a></li>
								<li class="breadcrumb-item active" aria-current="page">daftar</li>
							</ol>
						</nav>

						<form 
							action="${toko.router.toko_auth_daftar}" 
							method="post" ${this.daftarAttribute()}">
							
							<div class="form-group">
								<label for="user_name">user name:</label>
								<input type="text" class="form-control lapak" name="user_name" id="user_name" maxlength="50" placeholder="user name" required value=""/>
							</div>
							
							<div class="form-group">
								<label for="lapak">nama lapak:</label>
								<input type="text" class="form-control lapak" name="lapak" id="lapak" maxlength="50" placeholder="nama lapak" required value=""/>
							</div>

							<div class="form-group">
								<label for="deskripsi">deskripsi lapak:</label>
								<input 
									type="text" 
									class="form-control deskripsi" 
									name="deskripsi" 
									id="deskripsi" 
									maxlength="50" 
									placeholder="deskripsi" 
									required 
									value=""/>
							</div>

							<div class="form-group">
								<label for="wa">no wa: 62xxx</label>
								<input 
									type="text" 
									class="form-control wa" 
									name="wa" 
									id="wa" 
									maxlength="50" 
									placeholder="6212345" 
									required 
									value=""/>
							</div>

							<div class="form-group">
								<label for="alamat">alamat:</label>
								<input 
									type="text" 
									class="form-control alamat" 
									name="alamat" 
									id="alamat" 
									maxlength="50" 
									placeholder="alamat" 
									required 
									value=""/>
							</div>
							
							<div class="form-group">
								<label for="email">email:</label>
								<input 
									type="email" 
									class="form-control email" 
									name="email" 
									id="email" 
									maxlength="50" 
									placeholder="email" 
									required 
									value=""/>
							</div>

							<div class="form-group">
								<label for="password_lama">password:</label>
								<input type="password" class="form-control password" name="password_lama" id="password_lama" maxlength="20" required ${Param.HA_MD5}/>
							</div>
							
							<div class="form-group">
								<label for="password_baru">password (ulangi):</label>
								<input type="password" class="form-control" name="password_baru" id="password_baru" maxlength="20" required ${Param.HA_MD5}/>
							</div>
							
							<div class="text-align-center">
								<button 
									type="submit" 
									class="btn btn-primary submit tbl-blok">
									simpan
								</button>
							</div>

						</form
					</div>
				</div>

				<script src="/lib/md5.min.js"></script>
				<script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
			</body>
		</html>`;
	}

	daftarAttribute(): string {
		if (config.daftarPersetujuanAdmin) {
			return `
				${Param.HA_DLG}="Pendaftaran berhasil dan akan dicheck oleh admin" 
				${Param.HA_URL}="${toko.router.toko_web_beranda}
			`;

		}
		else {
			return `
				${Param.HA_DLG}="Pendaftaran berhasil, klik OK untuk login" 
				${Param.HA_URL}="${toko.router.toko_auth_login}
			`;
		}
	}
}