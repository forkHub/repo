import { util } from "../../Util";
import { toko } from "../../AppToko";
import { config } from "../../Config";
import { IAnggotaObj } from "../../Type";


export class HalDaftarLapak {
    render(daftarLapak: IAnggotaObj[], userName: string): string {

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

                        ${toko.render.nav(false)}
                        ${toko.render.login(userName)}

                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link" href="${toko.router.toko_web_beranda}">barang</a>
                            </li>
                            <li class="nav-item">
                                <a class="ul li nav-link active" href="#">daftar lapak</a>
                            </li>
                        </ul>

                        <Br/>

                        <div class="daftar-lapak-cont">
                            ${this.daftarLapak(daftarLapak)}
                        </div>
                    </div>

                    <br/>
                    <br/>
                </body>                  
            </html>`.trimStart().trimEnd();
    }

    private daftarLapak(daftar: IAnggotaObj[]): string {

        if (daftar.length == 0) {
            return '<div>Belum ada data</div>';
        }
        else {
            let hasil: string = '';
            daftar.forEach((lapak: IAnggotaObj) => {
                let itemHtml: string = `
                    <div class='item list-group' id=${lapak.id}>
                        <a class="list-group-item list-group-item-action" href="${util.getUrl(toko.router.toko_web_lapak_id, [lapak.id + ''])}">
                            <div class='judul bold'>${lapak.lapak}</div>
                            <div class=''>${lapak.deskripsi}</div>
                        </a>
                    </div>`;
                hasil += itemHtml;
            });

            return hasil;
        }
    }
}