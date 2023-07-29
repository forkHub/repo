import { data, dataObj, renderPath } from "../data.js";
import { dialogShow } from "../dialog.js";
import { EType } from "../skema.js";
import { BACK, ROOT, modul } from "../ent/Modul.js";
import { halVar } from "./halVar.js";
import { projek } from "../ent/Project.js";
// import { menuHome } from "../menu/system.js";
var listEl;
var cont;
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
        dataObj.varDipilih = item.id;
        dataObj.modulDipilih = 0;
        induk.querySelectorAll('.item.dipilih').forEach((item) => {
            item.classList.remove('dipilih');
        });
        hasil.classList.add('dipilih');
    };
    return hasil;
}
function renderItem(item, induk) {
    let hasil = creteItemEl();
    hasil.innerHTML = `
        <span class='nama'>[${item.nama}]</span>
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
    let m = data.getById(dataObj.modulDipilih);
    if (m.id === BACK) {
        console.log('buka parent');
        if (dataObj.modulAktif == 1) {
            console.log('root');
            return;
        }
        dataObj.modulAktif = data.getById(dataObj.modulAktif).indukId;
        dataObj.modulDipilih = 0;
    }
    else {
        console.log('buka modul');
        dataObj.modulAktif = dataObj.modulDipilih;
        dataObj.modulDipilih = 0;
    }
    halModule(cont);
}
function tambahModul() {
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
function hapusModul() {
    if (!dataObj.modulDipilih) {
        dialogShow('tidak ada modul dipilih');
        return;
    }
    let m = data.getById(dataObj.modulDipilih);
    if (m.anak.length > 0) {
        dialogShow('tidak kosong');
        return;
    }
    console.log('hapus modul, id ', m.id);
    data.hapus(m.id);
    let anak = data.getById(m.indukId).anak;
    for (let i = 0; i < anak.length; i++) {
        if (anak[i] === m.id) {
            anak.splice(i, 1);
            break;
        }
    }
    data.simpan();
    renderList();
}
function renameModul() {
    if (!dataObj.modulDipilih) {
        return;
    }
    if (dataObj.modulDipilih == BACK) {
        return;
    }
    let nama = window.prompt('nama:');
    if (!nama) {
        return;
    }
    data.getById(dataObj.modulDipilih).nama = nama;
    data.simpan();
    renderList();
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
function renderList() {
    listEl.innerHTML = '';
    let modul = data.getById(dataObj.modulAktif);
    if (modul.id != ROOT) {
        listEl.appendChild(renderItem(data.getById(BACK), listEl));
    }
    modul.anak.forEach((itemId) => {
        let item = data.getById(itemId);
        if (item.type == EType.modul) {
            listEl.appendChild(renderItem(item, listEl));
        }
    });
    //TODO: render variable
    modul.anak.forEach((itemId) => {
        let item = data.getById(itemId);
        if (item.type == EType.var) {
            listEl.appendChild(renderVarItem(item, listEl));
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
    hasil.querySelector('div.footer button.kembali').onclick = (e) => {
        e.stopPropagation();
        //TODO:
        // menuHome(hasil.querySelector('div.footer'));
    };
    return hasil;
}
