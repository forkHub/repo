import { data, dataObj, renderPath } from "../data.js";
import { EType } from "../skema.js";
import { ROOT, BACK } from "../ent/Modul.js";
var listEl;
var cont;
function tambahVar() {
    let nama = window.prompt('nama modul', '');
    if (nama) {
        modul.tambah(nama, dataObj.modulAktif);
        data.simpan();
        renderList();
    }
    else {
        console.warn('nama kosong');
    }
}
function menu(div) {
    div.innerHTML = `            
        <button class='buka'>buka</button>
        <button class='tambah'>tambah</button>
        <button class='hapus'>hapus</button>
        <button class='rename'>rename</button>
    `;
    div.querySelector('button.buka').onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        tambahVar();
    };
    div.querySelector('button.tambah').onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        // tambahModul();
    };
    div.querySelector('button.hapus').onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        // hapusModul();
    };
    div.querySelector('button.rename').onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        // renameModul();
    };
}
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
function renderList() {
    listEl.innerHTML = '';
    let modul = data.getById(dataObj.modulDipilih);
    if (modul.id != ROOT) {
        listEl.appendChild(renderItem(data.getById(BACK), listEl));
    }
    modul.anak.forEach((itemId) => {
        let item = data.getById(itemId);
        if (item.type == EType.var) {
            listEl.appendChild(renderItem(item, listEl));
        }
    });
}
export function halVar(contEl) {
    let hasil = document.createElement('div');
    cont = contEl;
    hasil.classList.add('hal-var');
    hasil.classList.add('disp-flex');
    hasil.classList.add('flex-dir-col');
    let str = `
        <div class='path'>${renderPath(dataObj.modulDipilih, '')}</div>
        <div class='list flex-grow-1'>
        </div>
        <div class='kembali'>
            <button class='kembali'>[...]</button>
            <span>Variable</span>
            <span class='desk'></span>
        </div>
        <div class='menu'>

        </div>
    `;
    hasil.innerHTML = str;
    menu(hasil.querySelector('div.menu'));
    listEl = hasil.querySelector('div.list');
    renderList();
    contEl.innerHTML = '';
    contEl.appendChild(hasil);
    return hasil;
}
