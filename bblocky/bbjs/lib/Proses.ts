namespace ha.bbjs {
    export class ProsessObj {
        private _state: number = 0;
        public get state(): number {
            return this._state;
        }
        public set state(value: number) {
            this._state = value;
        }

        private _mulai: () => void;
        public get mulai(): () => void {
            return this._mulai;
        }
        public set mulai(value: () => void) {
            this._mulai = value;
        }
        private _proses: () => void;
        public get proses(): () => void {
            return this._proses;
        }
        public set proses(value: () => void) {
            this._proses = value;
        }
        private _selesai: () => void;
        public get selesai(): () => void {
            return this._selesai;
        }
        public set selesai(value: () => void) {
            this._selesai = value;
        }
    }

    export class Proses {
        static readonly daftar: ProsessObj[] = [];

        static create(): ProsessObj {
            let hsl = new ProsessObj();
            return hsl;
        }

        static update() {
            this.daftar.forEach((item) => {
                if (0 == item.state) {
                    if (item.mulai) item.mulai();
                    item.state++;
                }
                else if (1 == item.state) {
                    item.proses();
                }
                else if (2 == item.state) {
                    if (item.selesai) item.selesai();
                    item.state = 3;
                }
                else if (3 == item.state) {
                    //kosong
                }
                else {
                    console.warn('state salah');
                }
            })
        }
    }
}