namespace data {
    export const TY_BINOP: string = 'ty_binop';
    export const TY_PARAM: string = 'ty_param';
    export const TY_LIT: string = 'ty_lit'

    export const daftar: IData[] = [];

    export function tambah(data: IData): void {
        daftar.push(data)
    }
}

namespace menu {
    function holder(): HTMLDivElement {
        return ha.comp.Util.getEl('menu') as HTMLDivElement;
    }
    export function ganti(tombol: HTMLButtonElement[]): void {
        let menuEl: HTMLDivElement = holder();
        while (menuEl.firstChild) {
            menuEl.removeChild(menuEl.firstChild);
        }

        tombol.forEach((item: HTMLButtonElement) => {
            menuEl.appendChild(item);
        })

    }
}

namespace tombol {
    export const tambahTbl: HTMLButtonElement = buat('tambah', () => {
        console.log('tambah klik')
    })
    export const hapusTbl: HTMLButtonElement = buat('hapus', () => {
        console.log('hapus klik');

        //get item yang dipilih
        let dataObj: IData;
        data.daftar.forEach((item: IData) => {
            if (item.dipilih) {
                dataObj = item;
            }
        })

        // if (dataObj.type)//TODO:


    })

    export const updateTbl: HTMLButtonElement = buat('update', () => {
        console.log('update');
    });

    export function buat(label: string, f: Function): HTMLButtonElement {
        let tbl: HTMLButtonElement = document.createElement('button');
        tbl.innerHTML = label;
        tbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            f();
        }

        return tbl;
    }
}

namespace param {
    export const PARAM_OPR: string = 'tengah';
    export const PARAM_KANAN: string = 'kanan';
    export const PARAM_KIRI: string = 'kiri';

    export function buat(indukId: number, paramType: string): IParam {
        let hasil: IParam = {
            id: (new Date()).getTime(),
            indukId: indukId,
            type: data.TY_PARAM,
            view: new View(),
            dipilih: false,
            paramType: paramType
        }

        data.tambah(hasil);

        return hasil;
    }

    export class View extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._elHtml = this.getTemplate('ha-param') as HTMLDivElement;
            this._elHtml.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('param klik');
            }
        }
    }

}

namespace literal {
    export const VALUE_LITERAL: string = 'literal';
    export const VALUE_REF_VAR: string = 'ref_var';
    export const VALUE_FUNC_VAR: string = 'func_var';

    export function buat(indukId: number, value: string): ILiteral {
        let hasil: ILiteral;

        hasil = {
            type: data.TY_LIT,
            value: value,
            id: (new Date()).getTime(),
            indukId: indukId,
            dipilih: false
        }
        hasil.view = new View(hasil);

        data.tambah(hasil);

        return hasil;
    }

    // function isValue(str: string): boolean {

    //     if (str == param.VALUE_FUNC_VAR) return true;
    //     if (str == param.VALUE_LITERAL) return true;
    //     if (str == param.VALUE_REF_VAR) return true;

    //     return false;
    // }

    export class View extends ha.comp.BaseComponent {
        private item: ILiteral;

        constructor(item: ILiteral) {
            super();
            this.item = item;
            this._elHtml = this.getTemplate('ha-lit');
            this._elHtml.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('literal klik');
                menu.ganti([
                    tombol.hapusTbl,
                    tombol.updateTbl
                ]);

                //hapus semua literal yang dipilih
                data.daftar.forEach((item: IData) => {
                    if (data.TY_LIT == item.type) {
                        if (item.dipilih) {
                            console.log('remove dipilih: ' + item.id);
                        }

                        item.dipilih = false;
                        (item as ILiteral).view.elHtml.classList.remove('dipilih');
                    }
                });


                this._elHtml.classList.add('dipilih');
                this.item.dipilih = true;
            }

            this._elHtml.innerHTML = '0'
        }
    }
}

namespace binop {
    export class View extends ha.comp.BaseComponent {
        get kiri(): HTMLDivElement {
            return this.getEl('ha-kiri') as HTMLDivElement;
        }

        get kanan(): HTMLDivElement {
            return this.getEl('ha-kanan') as HTMLDivElement;
        }

        get opr(): HTMLDivElement {
            return this.getEl('ha-tengah') as HTMLDivElement;
        }

        constructor() {
            super();
            this._elHtml = this.getTemplate('ha-binop');

            this.kiri.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('kiri klik');
            }

            this.kanan.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('kanan klik');
            }

            this.opr.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('opr click');
            }

        }
    }

    async function buatParam(binop: IBinop, paramType: string, cont: HTMLDivElement): Promise<IParam> {
        await ha.comp.Util.delay();
        let paramObj: IParam = param.buat(binop.id, paramType);
        paramObj.view.attach(cont);

        let lit: ILiteral = literal.buat(paramObj.id, '0');
        lit.view.attach(paramObj.view.elHtml);

        return paramObj;
    }

    export async function buat(): Promise<IBinop> {
        let hasil: IBinop = {
            id: (new Date()).getTime(),
            indukId: 0,
            type: '',
            view: new View(),
            dipilih: false
        };

        //param
        await buatParam(hasil, param.PARAM_KIRI, hasil.view.kiri);
        await buatParam(hasil, param.PARAM_KANAN, hasil.view.kanan)
        await buatParam(hasil, param.PARAM_OPR, hasil.view.opr)

        return hasil;
    }

}

async function mulai(): Promise<void> {
    let cont: HTMLDivElement = ha.comp.Util.getEl('halaman') as HTMLDivElement;
    binopObj = await binop.buat();
    binopObj.view.attach(cont);
}

let binopObj: IBinop;

window.onload = () => {
    mulai().catch((e) => {
        console.error(e)
    })
}



