import { anggotaSvc } from "./svc/AnggotaService.js";
let cont = document.body.querySelector("cont");
function renderDaftarAnggota(d, cont) {
    cont.innerHTML = '';
    d.forEach((item) => {
        item;
    });
}
//get daftar anggota
anggotaSvc.daftarAnggota().then((d) => {
    renderDaftarAnggota(d, cont);
}).catch((e) => {
    console.error(e);
});
