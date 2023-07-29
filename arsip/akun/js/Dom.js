export class Dom {
    static getEl(parent, query) {
        let el;
        el = parent.querySelector(query);
        if (!el)
            throw new Error(query);
        return el;
    }
}
