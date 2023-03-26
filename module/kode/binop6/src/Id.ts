class Id {
    private static _base: number = 0;

    static get id(): number {
        if (this._base <= 0) {
            this._base = ha.comp.Util.id();
        }

        this._base = this._base + 2;

        return this._base;
    }
}