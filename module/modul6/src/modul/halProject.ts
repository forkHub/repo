import { renderPath, dataObj } from "../data.js";
// import { menuHome } from "../menu/system.js";

export function halProject(contEl: HTMLDivElement) {
    let hasil: HTMLDivElement = document.createElement('div');
    // cont = contEl;

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

    //TODO:
    // menu(hasil.querySelector('div.menu'));

    //TODO:
    // listEl = hasil.querySelector('div.list');
    // renderList();

    contEl.innerHTML = '';
    contEl.appendChild(hasil);

    (hasil.querySelector('div.footer button.kembali') as HTMLButtonElement).onclick = (e) => {
        e.stopPropagation();

        //TODO:
        // menuHome(hasil.querySelector('div.footer'));
    }

    return hasil;
}