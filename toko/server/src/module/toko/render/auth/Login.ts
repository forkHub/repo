import { Param } from "../../Param";
import { Util, util } from "../../Util";
import { toko } from "../../AppToko";
import { config } from "../../Config";
// import { config } from "process";

export class Login {
	render(): string {
		return `
		<!DOCTYPE html>
		<html lang="id">
		
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1">
		
			<link href='/css/bootstrap.min.css' rel='stylesheet' />
			<link href='/css/umum.css' rel='stylesheet' />

			<script src="/lib/md5.min.js"></script>
		</head>
		
		<body>
			<div class='container'>
				<div class='form-login'>
					<h2>Form login</h2>
					<form class='form-login' action="${toko.router.toko_auth_login}" method="post" ${Param.HA_URL}="${toko.router.toko_gudang_barang_daftar}">
		
						<div class="form-group">
							<label for="user_name">user name:</label>
							<input type="text" class="form-control user_id" name="user_name" id="user_name" required/>
						</div>
		
						<div class="form-group">
							<label for="password">password:</label>
							<input type="password" class="form-control password" name="password" id="password" required ${Param.HA_MD5}/>
						</div>


						${this.renderDaftar()}

					</form> 
				</div>
			</div>

			<script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>

		</body>
		
		</html>`.trimStart().trimEnd();
	}

	renderDaftar(): string {
		console.debug('tombol daftar ' + config.tombolDaftar);

		if (!config.tombolDaftar) {
			return `
				<div class='row'>
				
					<div class='col-12 col-sm-6'>
						<button type="submit" class="btn btn-primary submit btn-block margin-bottom-8">login</button>
					</div>
					
					<div class='col-12 col-sm-6'>
						${this.renderLupa()}
					</div>
				</div>
			`;
		}

		return `
			<div class='row'>

				<div class='col-12 col-sm-4'>
					<button type="submit" class="btn btn-primary submit btn-block margin-bottom-8">login</button>
				</div>

				<div class='col-12 col-sm-4'>
					${this.renderLupa()}
				</div>

				<div class='col-12 col-sm-4'>
					<button 
						type="button" 
						class="btn btn-primary daftar btn-block margin-bottom-8"
						${Param.HA_KLIK}
						${Param.HA_GET}="${toko.router.toko_auth_daftar}">
							daftar
					</button>
				</div>
			</div>`;
	}

	renderLupa(): string {

		if (config.lupaPasswordAdmin) {
			return `
				<button 
					type="button" 
					class="btn btn-primary lupa btn-block margin-bottom-8"
					${Param.HA_KLIK}
					${Param.HA_DLG}="Silahkan hubungi admin!"
					${Param.HA_RELOAD}
					>
						lupa password
				</button>`;
		}
		else {
			return `
				<button 
					type="button" 
					class="btn btn-primary lupa btn-block margin-bottom-8"
					${Param.HA_KLIK}
					${Param.HA_GET}="${toko.router.toko_auth_lupa}">
						lupa password
				</button>`;
		}

	}
}