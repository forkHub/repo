import { Param } from "../../Param";
import { Util, util } from "../../Util";
import { toko } from "../../AppToko";

export class Lupa {
	render(): string {
		return `
		<!DOCTYPE html>
		<html lang="id">
		
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1">
							
				<link href='/css/bootstrap.min.css' rel='stylesheet' />
				<link rel='stylesheet' href="/css/umum.css?r=${util.randId}" />

			</head>
			
			<body>
				<div class='container'>
					<div class='form form-lupa'>
						<h2>Form Lupa Password</h2>
						<form 
							class='form-lupa' 
							action="${toko.router.toko_auth_lupa}" 
							method="post"
							${Param.HA_URL}=${toko.router.toko_auth_login}
							${Param.HA_DLG}="Password telah dikirim ke email">

							<div class="form-group">
								<label for="email">email:</label>
								<input 
									type="email" 
									class="form-control email" 
									name="email" 
									id="email" 
									required 
									value="" 
									placeholder="email"/>
							</div>

							<button type="submit" class="btn btn-primary submit">kirim</button>

						</form>
					</div>
				</div>

                <script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
			</body>
		
		</html>`.trimStart().trimEnd();
	}
}