export class Util {
    static getEl(parent, query) {
        let el;
        el = parent.querySelector(query);
        if (!el)
            throw new Error(query);
        return el;
    }
    static tambahTitik(str) {
        let res = '';
        let ctr = 0;
        for (let i = str.length - 1; i >= 0; i--) {
            let char;
            char = str.slice(i, i + 1);
            res = char + res;
            ctr++;
            if (ctr % 3 == 0) {
                res = "." + res;
            }
        }
        if (res.slice(0, 1) == ".") {
            res = res.slice(1, res.length);
        }
        return res;
    }
}
