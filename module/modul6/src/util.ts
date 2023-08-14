class Util {
    buatTombol(label: string): HTMLButtonElement {
        let tbl = document.createElement('button') as HTMLButtonElement;
        tbl.innerText = label;
        return tbl;
    }
}

export const util = new Util();