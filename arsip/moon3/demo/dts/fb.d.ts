declare namespace ha.fb {
    export class BolaObj {
        private _r;
        private _x;
        private _y;
        get y(): number;
        set y(value: number);
        get x(): number;
        set x(value: number);
        get r(): number;
        set r(value: number);
    }
    class Fb {
        readonly bolaAr: BolaObj[];
        constructor();
        update(): void;
        /**
         * check apakah dua bola bersinggungan
         * @param b1
         * @param b2
         * @returns boolean
         */
        singgung(b1: BolaObj, b2: BolaObj): boolean;
        /**
         * geser bola bila bersinggungan
         * @param b1
         * @param b2
         * @returns
         */
        geser(b1: BolaObj, b2: BolaObj): void;
        buatBola(): BolaObj;
    }
    export const fb: Fb;
    export {};
}
declare namespace ha.fb {
    class Konstrain {
        static readonly list: Konstrain[];
        private b1;
        private b2;
        private jrk;
        constructor(b1: BolaObj, b2: BolaObj);
        /**
         * cari konstrain berdasarkan bola
         * @param b bola
         * @returns
         */
        static getByBola(b: BolaObj): Konstrain;
        /**
         * menghitung ulang jarak konstrain
         */
        refresh(): void;
        /**
         * geser bola berdasarkan konstrain
         * @param b1 bola
         * @param b2 bola yang digeser
         * @returns
         */
        geser(b1: BolaObj, b2: BolaObj): void;
        /**
         * update konstrain
         */
        update(): void;
        static buat(b1: BolaObj, b2: BolaObj): Konstrain;
    }
}
