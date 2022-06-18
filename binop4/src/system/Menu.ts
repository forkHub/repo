namespace system.menu {
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

    export function muatKlik(): void {
        storage.muat();
        window.md.editor.menu.ganti(window.md.editor.menu.utama.view.elHtml as HTMLDivElement);
    }

    export function simplanKlik(): void {
        storage.simpan();
        window.md.editor.menu.ganti(window.md.editor.menu.utama.view.elHtml as HTMLDivElement);

    }

    //TODO: pindah ke basecomponent
    export function exec(): void {

        simpanTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            simplanKlik();
        }

        muatTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            muatKlik();
        }
    }
}