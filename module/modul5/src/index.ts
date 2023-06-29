class Id {
    private _id: number = Date.now();

    get id(): number {
        this._id++;
        return this._id;
    }
}
export const id: Id = new Id;

class BinopObj {
    id: number = 0;
    opr1: string = '';
    opr2: string = '';
}

class Binop {
    readonly list: BinopObj[] = [];

    buat(): BinopObj {
        let b = new BinopObj();
        b.id = id.id;
        this.list.push(b);

        return b;
    }

    render(cont: HTMLDivElement): void {
        this.list.forEach((item) => {
            cont.appendChild(this.buatItem(item));
        })
    }

    buatItem(item: BinopObj): HTMLDivElement {
        let div = document.createElement('div');

        item; //TODO:

        return div;
    }

}
export const binop: Binop = new Binop();