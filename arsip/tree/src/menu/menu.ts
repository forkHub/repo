import { beranda } from "./beranda.js";

type TMenuEl = {
    el?: HTMLDivElement;
    atas: {
        el?: HTMLDivElement;
        balik?: HTMLButtonElement;
        detail?: HTMLSpanElement;
    };
    tombol?: HTMLDivElement;
}

export const menuEl: TMenuEl = {
    atas: {}
}

export function setKlik(cont: HTMLDivElement, query: string, f: () => void): void {
    (cont.querySelector(`button.${query}`) as HTMLButtonElement).onclick = (e) => {
        e.stopPropagation();
        f();
    }
}

export function menu(cont: HTMLDivElement) {
    menuEl.el = cont.querySelector('div.menu');
    menuEl.atas.el = menuEl.el.querySelector('div.atas');
    menuEl.atas.balik = menuEl.atas.el.querySelector('button.balik');
    menuEl.atas.detail = menuEl.atas.el.querySelector('span.detail');
    menuEl.tombol = menuEl.el.querySelector('div.tombol');

    beranda.render(menuEl.tombol);
}