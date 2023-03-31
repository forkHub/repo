namespace ly {
    export class Layout implements ILayout {
        private static daftar: Layout[] = [];

        private _id: number;
        private _anak: ILayout[];

        public get id(): number {
            return this._id;
        }
        public set id(value: number) {
            this._id = value;
        }
        public get anak(): ILayout[] {
            return this._anak;
        }
        public set anak(value: ILayout[]) {
            this._anak = value;
        }

        constructor() {

        }

        static create(): Layout {
            let hasil: Layout;

            hasil = new Layout();
            this.daftar.push(hasil);

            return hasil;
        }
    }
}
