class Id {
    private static _base: number = 0;
    public static get base(): number {
        return this._base;
    }

    constructor() {
        Id._base = ha.comp.Util.id();
    }

    static get id(): number {
        this._base++;
        return this.base;
    }
}