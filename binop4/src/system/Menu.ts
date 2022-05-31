namespace menu.system {
    let _el: HTMLDivElement;

    export function el(): HTMLDivElement {
        if (!_el) {
            _el = ha.comp.Util.getTemplate('div.menu-sistem') as HTMLDivElement;
        }
        return _el;
    }

    function simpanTbl(): HTMLButtonElement {
        return ha.comp.Util.getEl('button.simpan', el()) as HTMLButtonElement;
    }

    function muatTbl(): HTMLButtonElement {
        return ha.comp.Util.getEl('button.muat', el()) as HTMLButtonElement;
    }

    export function mulai(): void {

        simpanTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            storage.simpan();
            menu.ganti(menu.utama.el());
        }

        muatTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            storage.muat();
            menu.ganti(menu.utama.el());
        }
    }
}