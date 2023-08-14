import { data, dataObj, renderPath } from "../../data.js";
import { EType } from "../../skema.js";
import { BACK, ROOT } from "../../ent/Modul.js";
import { halVar } from "../halVar.js";
import { projek } from "../../ent/Project.js";
import { bukaModul, tambahModul, hapusModul, renameModul } from "./editModul.js";
import { tblEditDekFungsi, tblHapusDF, tblTambahDekFungsi } from "./df.js";
var listEl;
export var cont;
function creteItemEl() {
    let hasil = document.createElement('div');
    hasil.classList.add('item');
    hasil.classList.add('pad');
    return hasil;
}
function renderVarItem(item, induk) {
    let hasil = creteItemEl();
    hasil.innerHTML = `
        <span class='nama'> var ${item.nama}</span>
    `;
    if (item.id == dataObj.varDipilih) {
        hasil.classList.add('dipilih');
    }
    hasil.onclick = (e) => {
        e.stopPropagation();
        data.resetDipilih();
        dataObj.varDipilih = item.id;
        induk.querySelectorAll('.item.dipilih').forEach((item) => {
            item.classList.remove('dipilih');
        });
        hasil.classList.add('dipilih');
    };
    return hasil;
}
function renderDFItem(item, induk) {
    let hasil = creteItemEl();
    hasil.innerHTML = `
        <span class='nama'> function ${item.nama}() {}</span>
    `;
    if (item.id == dataObj.dfDipilih) {
        hasil.classList.add('dipilih');
    }
    hasil.onclick = (e) => {
        e.stopPropagation();
        data.resetDipilih();
        dataObj.dfDipilih = item.id;
        induk.querySelectorAll('.item.dipilih').forEach((item) => {
            item.classList.remove('dipilih');
        });
        hasil.classList.add('dipilih');
    };
    return hasil;
}
function renderModulItem(item, induk) {
    let hasil = creteItemEl();
    hasil.innerHTML = `
        <span class='nama'>[${item.nama}]</span>
    `;
    if (item.id == dataObj.modulDipilih) {
        hasil.classList.add('dipilih');
    }
    hasil.onclick = (e) => {
        e.stopPropagation();
        data.resetDipilih();
        dataObj.modulDipilih = item.id;
        induk.querySelectorAll('.item.dipilih').forEach((item) => {
            item.classList.remove('dipilih');
        });
        hasil.classList.add('dipilih');
    };
    return hasil;
}
function bukaVar() {
    // if (!dataObj.modulDipilih) {
    //     dialogShow('tidak ada modul dipilih');
    //     return;
    // }
    data.resetDipilih();
    halVar(cont);
}
function tblTranspile(cont) {
    let tbl = document.createElement('button');
    tbl.innerText = 'transpile';
    tbl.onclick = () => {
        projek.transpile();
    };
    cont.appendChild(tbl);
}
function menu(div) {
    div.innerHTML = `            
        <button class='buka'>buka</button>
        <button class='tambah'>tambah</button>
        <button class='hapus'>hapus</button>
        <button class='rename'>rename</button>
        <button class='var'>var</button>
    `;
    tblTranspile(div);
    div.appendChild(tblTambahDekFungsi());
    div.appendChild(tblEditDekFungsi());
    div.appendChild(tblHapusDF());
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
    div.querySelector('button.hapus').onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        hapusModul();
    };
    div.querySelector('button.rename').onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        renameModul();
    };
    div.querySelector('button.var').onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        bukaVar();
    };
}
/**
 * render daftar modul
 */
export function renderList() {
    listEl.innerHTML = '';
    let modul = data.getById(dataObj.modulAktif);
    if (modul.id != ROOT) {
        listEl.appendChild(renderModulItem(data.getById(BACK), listEl));
    }
    modul.anak.forEach((itemId) => {
        let item = data.getById(itemId);
        if (item.type == EType.modul) {
            listEl.appendChild(renderModulItem(item, listEl));
        }
    });
    modul.anak.forEach((itemId) => {
        let item = data.getById(itemId);
        if (item.type == EType.var) {
            listEl.appendChild(renderVarItem(item, listEl));
        }
    });
    modul.anak.forEach((itemId) => {
        let item = data.getById(itemId);
        if (item.type == EType.df) {
            listEl.appendChild(renderDFItem(item, listEl));
        }
    });
}
export function halModule(contEl) {
    let hasil = document.createElement('div');
    cont = contEl;
    hasil.classList.add('hal-modul');
    hasil.classList.add('disp-flex');
    hasil.classList.add('flex-dir-col');
    let str = `
        <div class='path pad'>${renderPath(dataObj.modulAktif, '')}</div>
        <div class='pad'>
            <hr/>
        </div>
        <div class='list flex-grow-1'>
        </div>

        <div class='footer pad'>
            <div class='kembali pad'>
                <button class='kembali'>[...]</button>
                <span class='desk'>Modul</span>
            </div>
            <div class='menu pad'>
            </div>
        </div>
    `;
    hasil.innerHTML = str;
    menu(hasil.querySelector('div.menu'));
    listEl = hasil.querySelector('div.list');
    renderList();
    contEl.innerHTML = '';
    contEl.appendChild(hasil);
    //TODO:
    // menu project dibuat sejajar
    // dep
    hasil.querySelector('div.footer button.kembali').onclick = (e) => {
        e.stopPropagation();
    };
    return hasil;
}
