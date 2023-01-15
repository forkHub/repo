interface IList {
    key: any;
    onChange: (key: any) => void;
}

interface IState {
    karakter: {
        _x: Number,
        _y: Number,

        x: Number,
        y: Number
    }
}

class Angka {
    private _v: number;
    public get v(): number {
        return this._v;
    }
    public set v(value: number) {
        this._v = value;
        List.onChange(this);
    }
}

class List {
    private static readonly list: IList[] = [];

    static daftar(key: any, f: (key: any) => void) {

        console.log('daftar');
        console.log(key);

        for (let i: number = 0; i < this.list.length; i++) {
            let item: IList = this.list[i];

            if (item.key == key) {
                if (item.onChange == f) {
                    return;
                }
            }

        }

        console.log('baru');
        this.list.push({
            key: key,
            onChange: f
        })
    }

    static onChange(key: any): void {
        for (let i: number = 0; i < this.list.length; i++) {
            let item: IList = this.list[i];
            console.log(item);
            console.log(key);
            if (item.key == key) {
                item.onChange(key);
            }
        }
    };
}

const state = {
    karakter: {
        x: new Angka(),
        y: new Angka(),
    }
}

List.daftar(state.karakter.x, (key: any) => {
    console.log('method 1');
    console.log('key');
    console.log(key);
});


state.karakter.x.v = Number(10);