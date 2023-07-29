import * as kalender from "./Kalender.js";
/**
 * Demo kalendar ganti bulan
 */
let panahAtasTbl = document.querySelector('div.panah button.atas');
let panahBawahTbl = document.querySelector('div.panah button.bawah');
let tempatTgl = document.querySelector('div.tempat-tanggal');
let bulanEl = document.querySelector('div.tempat-nama-bulan span');
let date = new Date();
let tglEl;
let bulan = [
    'Januari',
    'Pebruari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'Nopember',
    'Desember'
];
update();
function update() {
    tglEl = kalender.table(date.getMonth(), date.getFullYear(), true);
    tempatTgl.innerHTML = '';
    tempatTgl.appendChild(tglEl);
    bulanEl.innerHTML = bulan[date.getMonth()] + ' - ' + date.getFullYear();
}
panahAtasTbl.onclick = () => {
    date = new Date(date.setMonth(date.getMonth() + 1));
    update();
};
panahBawahTbl.onclick = () => {
    date = new Date(date.setMonth(date.getMonth() - 1));
    update();
};
// document.body.appendChild(kalender.widget(date.getMonth(), date.getFullYear()));
