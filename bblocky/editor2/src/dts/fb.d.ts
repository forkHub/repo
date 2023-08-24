declare namespace ha.fb {
    class BentukObj {
        private _id;
        readonly bola: BolaObj[];
        get id(): number;
        set id(value: number);
    }
    class Bentuk {
        readonly list: BentukObj[];
        buat(str?: string[]): BentukObj;
        bola(bentuk: BentukObj, strAr: string[], id: number): void;
        debug(bl: BentukObj, ctx: CanvasRenderingContext2D): void;
        update(): void;
    }
    export const bentuk: Bentuk;
    export {};
}
declare namespace ha.fb {
    class Id {
        private _id;
        get id(): number;
    }
    /**
     *
     */
    export class BolaObj {
        private _r;
        private _x;
        private _y;
        private _groupId;
        get groupId(): number;
        set groupId(value: number);
        get y(): number;
        set y(value: number);
        get x(): number;
        set x(value: number);
        get r(): number;
        set r(value: number);
    }
    class Bola {
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
    export const bola: Bola;
    export const id: Id;
    export {};
}
declare namespace ha.fb {
    class KonstrainObj {
        constructor(b1: BolaObj, b2: BolaObj);
        private _id;
        get id(): number;
        set id(value: number);
        private _b1;
        get b1(): BolaObj;
        set b1(value: BolaObj);
        private _b2;
        get b2(): BolaObj;
        set b2(value: BolaObj);
        private _jrk;
        get jrk(): number;
        set jrk(value: number);
    }
    /**
     *
     */
    class Konstrain {
        readonly list: KonstrainObj[];
        /**
         * cari konstrain berdasarkan bola
         * @param b bola
         * @returns
         */
        getByBola(b: BolaObj): KonstrainObj;
        /**
         * menghitung ulang jarak konstrain
         */
        refresh(obj: KonstrainObj): void;
        /**
         * geser bola berdasarkan konstrain
         * @param b1 bola
         * @param b2 bola yang digeser
         * @returns
         */
        geser(obj: KonstrainObj, b1: BolaObj, b2: BolaObj): void;
        /**
         * update konstrain
         */
        updateObj(obj: KonstrainObj): void;
        update(): void;
        debug(ctx: CanvasRenderingContext2D): void;
        buat(b1: BolaObj, b2: BolaObj): KonstrainObj;
    }
    export const kt: Konstrain;
    export {};
}
