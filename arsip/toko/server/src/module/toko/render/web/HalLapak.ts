import { Param } from "../../Param";
import { Util, util } from "../../Util";
import { toko } from "../../AppToko";
import { config } from "../../Config";
import { IBarangObj } from "../../Type";

//TODO: url website menuju ke lapak
export class HalLapak {
	render(daftarBarang: IBarangObj[], userName: string, lapak: string, wa: string, lapakDesk: string): string {

		return `
            <!DOCTYPE html>
            <html lang="id">
                <head>
                    <title>${config.namaToko}</title>

                    <meta name="viewport" content="width=device-width, initial-scale=1">                        

                    <meta property="og:site_name" content="${config.namaToko}">
                    <meta property="og:title" content="${lapak}" />
                    <meta property="og:description" content="${lapakDesk}" />
                    <meta name="description" content="${lapakDesk}" />
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
                        
                        ${toko.render.nav(false)}
                        ${toko.render.login(userName)}

                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a class='beranda' href="${toko.router.toko_web_beranda}">🏪</a></li>
                                <li class="breadcrumb-item active" aria-current="page">${lapak}</li>
                            </ol>
                        </nav>                          

                        <div class="daftar-barang-cont row">
                            ${this.content(daftarBarang, wa)}
                        </div>

                    <script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
                </body>
            </html>`;
	}

	content(daftar: IBarangObj[], wa: string): string {
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
                        <button
                            class='chat btn btn-wa'
                            ${Param.HA_KLIK}
                            ${Param.HA_GET}="${util.buatWa(wa, item.nama)}">
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

export var beranda: HalLapak = new HalLapak();