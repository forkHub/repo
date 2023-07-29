import { beranda } from "./beranda.js";
export const menuEl = {
    atas: {}
};
export function setKlik(cont, query, f) {
    cont.querySelector(`button.${query}`).onclick = (e) => {
        e.stopPropagation();
        f();
    };
}
export function menu(cont) {
    menuEl.el = cont.querySelector('div.menu');
    menuEl.atas.el = menuEl.el.querySelector('div.atas');
    menuEl.atas.balik = menuEl.atas.el.querySelector('button.balik');
    menuEl.atas.detail = menuEl.atas.el.querySelector('span.detail');
    menuEl.tombol = menuEl.el.querySelector('div.tombol');
    beranda.render(menuEl.tombol);
}
