import { Param } from "../../Param";
import { Util, util } from "../../Util";
import { toko } from "../../AppToko";
import { config } from "../../Config";
import { IBarangObj } from "../../Type";

export class HalBarang {
	render(barang: IBarangObj, userName: string): string {
		return `
            <!DOCTYPE html>
            <html lang="id">
                <head>
                    <title>${config.namaToko} - ${barang.nama}</title>

                    <meta name="viewport" content="width=device-width, initial-scale=1">                     

                    <meta property="og:site_name" content="${config.namaToko}">
                    <meta property="og:title" content="${barang.nama}" />
                    <meta property="og:description" content="${barang.desk_panjang}" />
                    <meta property="og:image" itemprop="image" content="${barang.gbr}">
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="${config.website}/barang/baca/id/${barang.id}">
                    <meta property="og:updated_time" content="${util.randId}" />

                    <link rel='stylesheet' href='/css/bootstrap.min.css' rel='stylesheet' />
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
                                <li class="breadcrumb-item"><a class='lapak' href="${util.getUrl(toko.router.toko_web_lapak_id, [barang.anggota_id + ''])}">${barang.lapak_nama}</a></li>
                                <li class="breadcrumb-item active" aria-current="page">${barang.nama}</li>
                            </ol>
                        </nav>                        

                        <div class="detail-barang-cont">
                            <div class='item-fokus'>

                                <div class='text-align-center'>
                                    <img class='besar col-10' src="${barang.gbr ? (toko.kons.folder_download + barang.gbr) : "/gbr/gambar.png"}">
                                </div>

                                <br/>
                                
                                <p class='nama-barang text-align-center bold'>${barang.nama}</p>
                                
                                <div class='deskripsi-panjang'>
                                    ${barang.desk_panjang}
                                </div>

                                <br/>

                                <p class='harga text-align-center warna-harga bold'>${util.renderHarga(barang.harga)}</p>

                                <br/>

                                <div class='text-align-center'>
                                    <button class='chat btn btn-wa col-6' type='button' ${Param.HA_KLIK} ${Param.HA_GET}="${util.buatWa(barang.wa, barang.nama)}">
                                        <span class="fontello">&#xf232;</span> beli
                                    </button>
                                </div>
                                
                                <div class='data' id='${barang.id}'></div>
                                
                                <div class='barang-terkait-cont'></div>

                                <br/>
                                <br/>
                                <br/>
                            </div>
                        </div>

                        <script type="module" src="/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>
                    </div>
                    <br/>
                    <br/>
                </body>
            </html>`;
	}
}