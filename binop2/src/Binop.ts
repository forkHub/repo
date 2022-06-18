namespace ha.binop {
    export class Binop extends ha.comp.BaseComponent {
        private _data: IBinop;
        public get data(): IBinop {
            return this._data;
        }
        public set data(value: IBinop) {
            this._data = value;
        }

        private paramKiri: Param = new Param();
        private paramKanan: Param = new Param();
        private paramTengah: Param = new Param();

        constructor() {
            super();
            this._elHtml = this.getTemplate('ha-binop');
        }

        init(): void {
            this.paramKiri.data = this._data.paramKiri;
            this.paramKanan.data = this._data.paramKanan;
            this.paramTengah.data = this.data.operator;

            this.paramKiri.attach(this.kiri);
            this.paramKanan.attach(this.kanan);
            this.paramTengah.attach(this.tengah);
        }

        get kiri(): HTMLDivElement {
            return this.getEl('ha-kiri') as HTMLDivElement;
        }

        get tengah(): HTMLDivElement {
            return this.getEl('ha-tengah') as HTMLDivElement;
        }

        get kanan(): HTMLDivElement {
            return this.getEl('ha-kanan') as HTMLDivElement;
        }
    }

    export class Param extends ha.comp.BaseComponent {
        private _data: IParam;
        public set data(value: IParam) {
            this._data = value;
        }

        constructor() {
            super();
            this._elHtml = this.getTemplate('ha-param');

            this._elHtml.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('param click');

                //menu tambah

                this._data;

            }
        }
    }

    export class Literal extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._elHtml = this.getTemplate('ha-lit');

            this._elHtml.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('value click');
            }
        }
    }
}

