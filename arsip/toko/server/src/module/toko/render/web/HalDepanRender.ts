import { Param } from "../../Param";
import { Util, util } from "../../Util";
import { toko } from "../../AppToko";
import { config } from "../../Config";
import { IBarangObj } from "../../Type";

export class HalDepanRenderer {
	render(daftarBarang: IBarangObj[], halLog: number, jmlBarang: number, kunci: string, userName: string): string {

		return `
            <!DOCTYPE html>
            <html lang="id">
                <head>
                    <title>${config.namaToko}</title>

                    <meta name="viewport" content="width=device-width, initial-scale=1">                    

                    <meta property="og:site_name" content="${config.namaToko}">
                    <meta property="og:title" content="${config.namaToko}" />
                    <meta property="og:description" content="${config.deskripsiToko}" />
                    <meta name="description" content="${config.deskripsiToko}" />
                    <meta property="og:image" itemprop="image" content="">
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="${config.website}">
                    <meta property="og:updated_time" content="1440432930" />


                    <link rel='stylesheet' href='/css/bootstrap.min.css' rel='stylesheet' />
                    <link rel='stylesheet' href="/css/css.css?r=${util.randId}" />
                    <link rel='stylesheet' href="/css/umum.css?r=${util.randId}" />
                    <link rel='stylesheet' href="/css/font/css/fontello.css?r=${util.randId}" />

                </head> 
                <body>
                    <div class="container">

                        ${toko.render.nav(true)}
                        ${toko.render.login(userName)}

                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link active" href="#">barang</a>
                            </li>
                            <li class="nav-item">
                                <a class="ul li nav-link" href="${toko.router.toko_web_lapak_daftar}">daftar Lapak</a>
                            </li>
                        </ul>

                        <br/>

                        ${this.info(kunci)}

                        <div class="daftar-barang-cont row">
                            ${this.content(daftarBarang)}
                        </div>

                        <!-- halaman -->
                        ${this.hal(halLog, jmlBarang, config.jmlPerHal, kunci)}

                    </div>
                    <br/>

                    <script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>                    

                </body>                  
            </html>`;
	}

	private info(kunci: string): string {
		if (kunci == "---") return "";
		return `

            <div class='info float-left text-align-center col-12'>
                <p class=''>daftar barang berdasar kata kunci: ${kunci}</p>
                <button type="button" class="btn btn-primary" ${Param.HA_KLIK} ${Param.HA_GET}="${toko.router.toko_web_beranda}">tampilkan semua barang</button>
            </div>
            <div class='clear'></div>
            <hr/>
        `;
	}

	private hal(halLog: number, jmlBarang: number, jmlPerHal: number, kunci: string): string {
		if (kunci != "---") {
			// return util.hal2(halLog, jmlBarang, `/toko/cari/${kunci}/hal/`, jmlPerHal);
			return util.hal2(halLog, jmlBarang, kunci, toko.router.toko_web_beranda_cari_kataKunci_hal_hal, jmlPerHal);
		}
		else {
			return util.hal2(halLog, jmlBarang, kunci, toko.router.toko_web_beranda_hal_hal, jmlPerHal);
		}
	}

	private content(daftar: IBarangObj[]): string {
		if (daftar.length == 0) {
			return `<p class="col-12 text-align-center">Belum ada data barang</p>`;
		}
		else {
			let hasil: string = '';
			daftar.forEach((item: IBarangObj) => {
				let itemHtml: string = `
				<div class='item col-4 col-sm-3 col-md-2 padding text-align-center'>
                    <a class='bersih' href="${util.getUrl(toko.router.toko_web_barang_lihat_barangId, [item.id + ''])}">
                        <img class='kecil' src='${(item.thumb) ? (toko.kons.folder_download + item.thumb) : '/gbr/thumb.png'}'>
                        <div class='nama-barang potong'>${item.nama}</div>
                        <div class='bold'>${util.renderHarga(item.harga)}</div>
                        <button class='chat btn btn-wa' type='button' ${Param.HA_KLIK} ${Param.HA_GET}="${util.buatWa(item.wa, item.nama)}">
                            <span class="fontello">&#xf232;</span> beli
                        </button>
                    </a>
				</div>`;
				hasil += itemHtml;
			});
			return hasil;
		}
	}
}