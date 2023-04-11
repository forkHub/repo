import * as kalender from "./Kalender.js";

/**
 * Demo klik kalender, menampilkan info hari ini
 */

let kalenderCont: HTMLDivElement = document.body.querySelector('div.kalender-cont');
let infoCont: HTMLDivElement = document.body.querySelector('div.info');

kalenderCont.appendChild(kalender.widget(8, 2022));

document.querySelectorAll('div.widget div.tanggal').forEach((item: Element) => {
    (item as HTMLDivElement).onclick = () => {
        let bln: number = parseInt(item.getAttribute('data-bln')) + 1;
        infoCont.innerText = 'klik kalender tanggal ' + item.getAttribute('data-tgl') + '/' + bln + '/2002';
    }
})
