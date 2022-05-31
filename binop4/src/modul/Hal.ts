namespace modul.hal {
    export function halaman(): HTMLDivElement {
        return ha.comp.Util.getEl('halaman') as HTMLDivElement;
    }

    export function variable(): HTMLDivElement {
        return ha.comp.Util.getEl('div.var') as HTMLDivElement;
    }

    export function deklarasiFungsi(): HTMLDivElement {
        return ha.comp.Util.getEl('div.dek-fung') as HTMLDivElement;
    }

    export function menu(): HTMLDivElement {
        return ha.comp.Util.getEl('menu') as HTMLDivElement;
    }

    export function stmt(): HTMLDivElement {
        return ha.comp.Util.getEl('div.daftar div.statement') as HTMLDivElement;
    }

    export function param(): HTMLDivElement {
        return ha.comp.Util.getEl('div.daftar div.param') as HTMLDivElement;
    }

    export function nama(): HTMLDivElement {
        return ha.comp.Util.getEl('div.daftar div.nama') as HTMLDivElement;
    }

    function hapusDaftar(el: HTMLDivElement): void {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    export function hapusDaftarSemua(): void {
        hapusDaftar(halaman());
        hapusDaftar(variable());
        hapusDaftar(deklarasiFungsi());
        hapusDaftar(menu());
        hapusDaftar(param());
        hapusDaftar(nama());
    }
}