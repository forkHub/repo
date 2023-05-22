import { Param } from "../../Param";
import { RouterKOns } from "../../silsilah/RouterKons";
import { Util, util } from "../../Util";
import { RouterKons } from "../RouterKons";

export class EditProfileAnggota {
    render(anggota: ISlAnggota): string {
        return `
		<!DOCTYPE html>
		<html lang="id">
        <head>
            <title>edit info</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">           
            <link href='/css/bootstrap.min.css' rel='stylesheet' />
            <link rel='stylesheet' href="/css/umum.css?r=${util.randId}" />
        </head>
        <body>
            <div class="container">

				<!-- hidden -->
                <nav aria-label="breadcrumb" class="disp-none">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a class='' href="${RouterKons.daftarAnggota}">daftar</a></li>
                        <li class="breadcrumb-item active" aria-current="page">edit info</li>
                    </ol>
                </nav>

				<h1>Edit Profile:</h1>

                <form 
                    class="anggota"
                    action="${util.getUrl(RouterKons.editProfile, [anggota.id + ''])}" 
                    method="post"
                    ${Param.HA_DLG}="Data telah disimpan"
                    >

                    <hr/>

                    <div class="form-group">
                        <label for="nama">nama:</label>
                        <input type="text"
                            class="form-control"
                            name="nama"
                            id="nama"
                            maxlength="50"
                            placeholder="nama panggilan"
                            required
                            value="${anggota.nama}"/>
                    </div>

                    <div class="form-group">
                        <label for="nama_lengkap">nama lengkap:</label>
                        <input type="text"
                            class="form-control"
                            name="nama_lengkap"
                            id="nama_lengkap"
                            maxlength="50"
                            placeholder="nama lengkap"
                            required
                            value="${anggota.nama_lengkap || ''}"/>
                    </div>

                    <div class="form-group">
                        <label for="alamat">alamat:</label>
                        <textarea
                            class="form-control"
                            name="alamat"
                            id="alamat"
                            maxlength="200"
							rows=4
                            placeholder="alamat"
                            value="">${anggota.alamat || ''}</textarea>
                    </div>

                    <div class="form-group">
                        <label for="tgl_lahir">tanggal lahir:</label>
                        <input type="date"
                            class="form-control"
                            name="tgl_lahir"
                            id="tgl_lahir"
                            ${this.formatDate(anggota.tgl_lahir)}/>
                    </div>

                    <div class="form-group">
                        <label for="tgl_meninggal">tanggal meninggal:</label>
                        <input type="date"
                            class="form-control"
                            name="tgl_meninggal"
                            id="tgl_meninggal"
                            ${this.formatDate(anggota.tgl_meninggal)}/>
                    </div>

					<p>jenis kelamin:</p>
                    <div class="form-check">
						<input type="radio" class="form-check-input" name="jkl" id="jkl1" value="l" ${this.selected(anggota, "l")}>
                        <label for="jkl1">laki-laki</label>
                    </div>

                    <div class="form-check">
						<input type="radio" class="form-check-input" name="jkl" id="jkl2" value="p" ${this.selected(anggota, "p")}>
                        <label for="jkl2">perempuan:</label>
                    </div>

                    <div class='text-align-center'>
                        <button type="submit" class="btn btn-primary btn-sm submit col-12 col-sm-6">simpan</button>
                    </div>

                </form>

				<hr/>

				<h2>Tautan:</h2>
				
				<div>
					<a href="${util.getUrl(RouterKOns.lihatProfile, [anggota.id])}">Hal Profile</a>
				</div>
	
				<div>
					<a href="${util.getUrl(RouterKOns.berandaId, [anggota.id])}">Hal Silsilah</a>
				</div>
				
			</div>
            
            <script type="module" src="/js/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
        </body>
		</html>`;
    }

    private selected(anggota: ISlAnggota, value: string): string {
        if (anggota.jkl == value) return "checked";
        return "";
    }

    private formatDate(str: string): string {
        if (!str || "" == str) return '';

        let date: Date = new Date(str);

        if ('Invalid Date' == (date + '')) return '';

        return ` value="` + date.getFullYear() + "-" + this.padding((date.getMonth() + 1) + '') + "-" + this.padding(date.getDate() + '') + '"';
    }

    private padding(str: string): string {
        str = "00000" + str;
        return str.slice(str.length - 2);
    }

}