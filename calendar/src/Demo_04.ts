import * as kalender from "./Kalender.js";

/**
 * Demo kalendar ganti bulan
 */

let panahAtasTbl: HTMLButtonElement = document.querySelector('div.panah button.atas');
let panahBawahTbl: HTMLButtonElement = document.querySelector('div.panah button.bawah');
let tempatTgl: HTMLDivElement = document.querySelector('div.tempat-tanggal') as HTMLDivElement;
let bulanEl: HTMLElement = document.querySelector('div.tempat-nama-bulan span');

let date: Date = new Date();
let tglEl: HTMLDivElement;

let bulan: string[] = [
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
]
update();


function update(): void {
    tglEl = kalender.table(date.getMonth(), date.getFullYear(), true) as HTMLDivElement;
    tempatTgl.innerHTML = '';
    tempatTgl.appendChild(tglEl);
    bulanEl.innerHTML = bulan[date.getMonth()] + ' - ' + date.getFullYear();
}

panahAtasTbl.onclick = () => {
    date = new Date(date.setMonth(date.getMonth() + 1));
    update();
}

panahBawahTbl.onclick = () => {
    date = new Date(date.setMonth(date.getMonth() - 1));
    update();
}

// document.body.appendChild(kalender.widget(date.getMonth(), date.getFullYear()));