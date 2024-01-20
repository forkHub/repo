import { wOp } from "./Window.js";
import { AnggotaObj } from "./mdl/AnggotaEnt.js";
import { conf } from "./mdl/Conf.js";
import { ses } from "./svc/Session.js";
class Beranda {
    checkSesion() {
        console.log("check session");
        if (ses.checkLogin()) {
            console.log("login");
            this.menu();
        }
        else {
            window.top.location.href = conf.urlLogin;
        }
    }
    menu() {
    }
}
const beranda = new Beranda();
beranda.checkSesion();
wOp();
let p = new AnggotaObj('0', 'menu');
p;
// let w: any = window;
// w.daftarAnggota = () => {
//     window.top.location.href = conf.urlAnggotaDaftar;
// }
