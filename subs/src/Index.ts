interface ISubs {
    update: () => void;
};

class Store<T> {
    private _value: T;
    private subs: ISubs[] = []

    public get value(): T {
        return this._value;
    }
    public set value(value: T) {
        this._value = value;
        this.subs.
    }

    constructor(value: T) {
        this.value = value;
    }
}

var s: Store<Number> = new Store(12);
