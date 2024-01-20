import { IAnggota } from "./mdl/AnggotaEnt.js";
import { anggotaSvc } from "./svc/AnggotaService.js";

let cont = document.body.querySelector("cont") as HTMLDivElement;

function renderDaftarAnggota(d: IAnggota[], cont: HTMLDivElement) {
    cont.innerHTML = '';

    d.forEach((item) => {
        item;
    })
}

//get daftar anggota
anggotaSvc.daftarAnggota().then((d) => {
    renderDaftarAnggota(d, cont)
}).catch((e) => {
    console.error(e);
});