class Util {
    buatTombol(label) {
        let tbl = document.createElement('button');
        tbl.innerText = label;
        return tbl;
    }
}
export const util = new Util();
