import * as kalender from "./Kalender.js";
/**
 * Demo klik kalender, menampilkan info hari ini
 */
let kalenderCont = document.body.querySelector('div.kalender-cont');
let infoCont = document.body.querySelector('div.info');
kalenderCont.appendChild(kalender.widget(8, 2022));
document.querySelectorAll('div.widget div.tanggal').forEach((item) => {
    item.onclick = () => {
        let bln = parseInt(item.getAttribute('data-bln')) + 1;
        infoCont.innerText = 'klik kalender tanggal ' + item.getAttribute('data-tgl') + '/' + bln + '/2002';
    };
});
