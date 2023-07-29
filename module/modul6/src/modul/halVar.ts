import { data, dataObj, renderPath } from "../data.js";
import { EType, IMember, TEntity } from "../skema.js";
import { ModulObj } from "../ent/Modul.js";
import { variable } from "../ent/Var.js";
import { halModule } from "./halModul.js";
import { dialogShow } from "../dialog.js";

var listEl: HTMLDivElement;

function tambahVar(): void {

    let nama = window.prompt('nama modul', '');

    if (nama) {
        console.group('tambah var');
        let v = variable.tambah(nama, dataObj.modulAktif);
        let m = data.getById(dataObj.modulAktif) as ModulObj;
        m.anak.push(v.id);
        console.log('modul', m);
        data.simpan();
        renderList();
        console.groupEnd();
    }
    else {
        console.warn('nama kosong');
    }

}

function renameVar(): void {
    if (!dataObj.varDipilih) {
        return;
    }

    let nama = window.prompt('nama:');
    if (!nama) {
        return;
    }

    data.getById(dataObj.varDipilih).nama = nama;
    data.simpan();
    renderList();
}

function hapusVar(): void {
    if (!dataObj.varDipilih) {
        dialogShow('tidak ada var dipilih');
        return;
    }

    let v = data.getById(dataObj.varDipilih);

    console.log('hapus var, id ', v.id);
    data.hapus(v.id);

    let anak = (data.getById(v.indukId) as unknown as IMember).anak;

    for (let i = 0; i < anak.length; i++) {
        if (anak[i] === v.id) {
            anak.splice(i, 1);
            break;
        }
    }

    data.simpan();
    renderList();
}

function menu(div: HTMLDivElement): void {
    div.innerHTML = `            
        <button class='tambah'>tambah</button>
        <button class='hapus'>hapus</button>
        <button class='rename'>rename</button>
    `;

    (div.querySelector('button.tambah') as HTMLButtonElement).onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        tambahVar();
    };

    (div.querySelector('button.hapus') as HTMLButtonElement).onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        hapusVar();
    };

    (div.querySelector('button.rename') as HTMLButtonElement).onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        renameVar();
    };

}

function renderItem(item: TEntity, induk: HTMLDivElement): HTMLDivElement {
    let hasil = document.createElement('div') as HTMLDivElement;
    hasil.classList.add('item');
    hasil.classList.add('pad');

    hasil.innerHTML = `
        <span class='nama'>var ${item.nama}</span>
    `;

    if (item.id == dataObj.varDipilih) {
        hasil.classList.add('dipilih');
    }

    hasil.onclick = (e) => {
        e.stopPropagation();

        dataObj.varDipilih = item.id;

        induk.querySelectorAll('.item.dipilih').forEach((item) => {
            item.classList.remove('dipilih');
        });

        hasil.classList.add('dipilih');
    }

    return hasil;
}

function renderList(): void {
    listEl.innerHTML = '';

    let modul = data.getById(dataObj.modulAktif) as ModulObj;

    // listEl.appendChild(renderItem(data.getById(BACK), listEl));

    modul.anak.forEach((itemId) => {
        let item = data.getById(itemId);
        if (item.type == EType.var) {
            listEl.appendChild(renderItem(item, listEl));
        }
    });
}

export function halVar(contEl: HTMLDivElement): HTMLDivElement {
    let hasil: HTMLDivElement = document.createElement('div');
    // cont = contEl;

    hasil.classList.add('hal-var');
    hasil.classList.add('disp-flex');
    hasil.classList.add('flex-dir-col');

    let str = `
        <div class='path'>${renderPath(dataObj.modulAktif, '')}</div>
        <div class='list flex-grow-1'>
        </div>
        <div class='kembali'>
            <button class='kembali'>[..]</button>
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

    (contEl.querySelector('button.kembali') as HTMLButtonElement).onclick = () => {
        data.resetDipilih();
        halModule(contEl);
    }

    return hasil;
}