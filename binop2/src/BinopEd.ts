namespace ha.binop {
    export class BinopEd {
        private binop: Binop;

        constructor() {


        }

        init(): void {
            this.binop = new Binop();
            this.binop.data = {
                id: 1,
                paramKiri: {
                    value: {
                        type: Kons.TY_ANGKA,
                        value: {
                            angka: 0,
                            teks: '',
                        }
                    }
                },
                paramKanan: {
                    value: {
                        type: Kons.TY_ANGKA,
                        value: {
                            angka: 0,
                            teks: ''
                        }
                    }
                },
                operator: {
                    value: {
                        type: Kons.TY_OPR,
                        value: {
                            angka: 0,
                            teks: '='
                        }
                    }
                }
            };

            this.binop.attach(document.body);

            let data: IBinop = this.binop.data;

            data.view = this.binop;

            data.paramKiri.view = new Param();
            data.paramKiri.view.attach(this.binop.kiri);

            data.paramKanan.view = new Param();
            data.paramKanan.view.attach(this.binop.kanan);

            data.operator.view = new Param();
            data.operator.view.attach(this.binop.tengah);

            let value: IValue;

            value = data.paramKiri.value;
            value.view = new Literal();
            value.view.elHtml.innerHTML = value.value.angka + ''
            value.view.attach(data.paramKiri.view.elHtml);

            value = data.paramKanan.value;
            value.view = new Literal();
            value.view.elHtml.innerHTML = value.value.angka + ''
            value.view.attach(data.paramKanan.view.elHtml);

            value = data.operator.value;
            value.view = new Literal();
            value.view.elHtml.innerHTML = value.value.teks + ''
            value.view.attach(data.operator.view.elHtml);
        }
    }
}

window.onload = () => {
    let ed: ha.binop.BinopEd = new ha.binop.BinopEd();
    ed.init();
}