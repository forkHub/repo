import { dialog, folder, listEl, root } from "./index.js";
function validasiNama(nama) {
    if (!nama)
        return false;
    if (nama == '..')
        return false;
    if (nama == '...')
        return false;
    if (nama == 'root')
        return false;
    if (nama.indexOf('...') >= 0)
        return false;
    return true;
}
function tambahFolder() {
    if (!folder.data.aktif) {
        dialog.innerText = 'tidak ada folder aktif';
        dialog.showModal();
        return;
    }
    let nama = window.prompt('Nama folder:');
    if (!validasiNama(nama)) {
        dialog.innerText = 'nama invalid';
        dialog.showModal();
        return;
    }
    //validasi nama
    folder.tambahFolder(folder.data.aktif, folder.buatFolder(nama));
    folder.renderFolder(folder.data.aktif, listEl);
}
function bukaFolder() {
    if (!folder.data.dipilih) {
        dialog.innerText = 'tidak ada folder dipilih';
        return;
    }
    if ('...' == folder.data.dipilih.nama) {
        if (folder.data.aktif.nama == 'root')
            return;
        folder.renderFolder(root, listEl);
        return;
    }
    if ('..' == folder.data.dipilih.nama) {
        let folderObj = folder.getParentFolder(root, folder.data.aktif);
        if (folderObj) {
            folder.renderFolder(folderObj, listEl);
            folder.data.aktif = folderObj;
        }
        return;
    }
    folder.tambahHelper(folder.data.dipilih);
    folder.renderFolder(folder.data.dipilih, listEl);
    folder.data.aktif = folder.data.dipilih;
}
export function menu() {
    let menuEl = document.body.querySelector('div.menu');
    let tambahTbl = menuEl.querySelector('button.tambah');
    menuEl.querySelector('button.buka').onclick = (e) => {
        e.stopPropagation();
        bukaFolder();
    };
    tambahTbl.onclick = () => {
        tambahFolder();
    };
}
