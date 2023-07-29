import { dataObj } from "../data.js";
import { dialogShow } from "../dialog.js";
import { EType } from "../ent.js";
var cont;
var listEl;
function renderItem(item, induk) {
    let hasil = document.createElement('div');
    hasil.classList.add('item');
    hasil.classList.add('pad');
    hasil.innerHTML = `
        <span class='nama'>${item.nama}</span>
    `;
    if (item.id == dataObj.modulDipilih) {
        hasil.classList.add('dipilih');
    }
    hasil.onclick = (e) => {
        e.stopPropagation();
        dataObj.modulDipilih = item.id;
        induk.querySelectorAll('.item.dipilih').forEach((item) => {
            item.classList.remove('dipilih');
        });
        hasil.classList.add('dipilih');
    };
    return hasil;
}
function bukaModul() {
    if (!dataObj.modulDipilih) {
        console.warn('tidak ada modul dipilih');
        dialogShow('tidak ada modul dipilih');
        return;
    }
    console.log('buka data');
}
function tambahModul() {
}
function menu(div) {
    div.innerHTML = `            
        <button class='buka'>buka</button>
        <button class='tambah'>tambah</button>
        <button class='hapus'>hapus</button>
        <button class='rename'>rename</button>`;
    div.querySelector('button.buka').onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        bukaModul();
    };
    div.querySelector('button.tambah').onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        tambahModul();
    };
}
function renderList() {
    listEl.innerHTML = '';
    dataObj.entList.filter((item) => {
        return (item.type == EType.modul);
    }).forEach((item) => {
        // console.log('render item', item);
        listEl.appendChild(renderItem(item, listEl));
    });
}
export function halModule(contEl) {
    let hasil = document.createElement('div');
    cont = contEl;
    hasil.classList.add('hal-modul');
    hasil.classList.add('disp-flex');
    hasil.classList.add('flex-dir-col');
    let str = `
        <div class='path'></div>
        <div class='list flex-grow-1'>
        </div>
        <div class='kembali'>
            <button class='kembali'>[...]</button>
        </div>
        <div class='menu'>

        </div>
    `;
    hasil.innerHTML = str;
    menu(hasil.querySelector('div.menu'));
    listEl = hasil.querySelector('div.list');
    renderList();
    cont.innerHTML = '';
    cont.appendChild(hasil);
    return hasil;
}
