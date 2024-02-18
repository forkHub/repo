declare namespace ha.geom {
    class Point {
        static jarak(x: number, y: number): number;
        static buat(x?: number, y?: number): IPoint2D;
        /**
         * menukar posisi antara dua point
         * @param p1
         * @param p2
         */
        static tukarPosisi(p1: IPoint2D, p2: IPoint2D): void;
        static copyPosisi(ps: IPoint2D, pt: IPoint2D): void;
        static clone(p: IPoint2D): IPoint2D;
        static sama(p1: IPoint2D, p2: IPoint2D): boolean;
        static putarPoros(p: IPoint2D, xc: number, yc: number, deg: number, klon: boolean): IPoint2D;
        static posDist(p: IPoint2D, xt: number, yt: number, jrk: number): IPoint2D;
        static posPolar(jarak: number, sudut: number, xt: number, yt: number): IPoint2D;
    }
}
declare namespace ha.geom {
    class PolyObj {
        private vs;
        constructor(vs: IPoint2D[]);
    }
    class Poly {
        private static pp;
        static buat(p: IPoint2D[]): PolyObj;
    }
}
declare namespace ha.geom {
    class Rect {
        static create(x1?: number, y1?: number, x2?: number, y2?: number): IRect;
        static copy(r: IRect): IRect;
        static copyInfo(r1: IRect, r2: IRect): void;
        static collideBound(r1: IRect, r2: IRect): boolean;
        static collide(r1: IRect, r2: IRect): boolean;
        static collideDotBound(r: IRect, d: IPoint2D): boolean;
        static collideDot(r: IRect, x: number, y: number): boolean;
        static minX(r: IRect): number;
        static maxX(r: IRect): number;
        static minY(r: IRect): number;
        static maxY(r: IRect): number;
        static translate(rect: IRect, x: number, y: number): void;
        static rotate(r: IRect, deg: number, xc: number, yc: number, copy?: boolean): IRect;
    }
}
declare namespace ha.geom {
    /**
     * segment vs garis x
     */
    class SegHor {
        checkTabrakanBound(g: IGaris): void;
        checkTabrakan(g: IGaris): void;
    }
    export const segH: SegHor;
    /**
     * menghitung garis relatif terhadap titik (0,0)
     * segement vs titik (0,0)
     */
    class Seg0 {
    }
    export const seg0: Seg0;
    export {};
}
declare namespace ha.geom {
    class GP {
        /**
         * apakah sebuah garis berada di sebelah kanan titik
         * @param g
         * @param xt
         * @param yt
         * @returns
         */
        kananPos(g: IGaris, xt: number, yt: number): boolean;
        jarak(g: IGaris, xt: number, yt: number): number;
    }
    export class Garis {
        static readonly gp: GP;
        /**
         * buat garis object
         * @param v1
         * @param v2
         * @returns
         */
        static create(v1?: IPoint2D, v2?: IPoint2D): IGaris;
        /**
         * hapus garis dari memory
         * @param g
         */
        static destroy(g: IGaris): void;
        /**
         * check apakah garis menghadap ke atas
         * y2 > y1
         * x2 > x1
         * @param g
         * @returns
         */
        static hadapAtas(g: IGaris): boolean;
        static posIdx(g: IGaris, idx?: number): IPoint2D;
        /**
         * tukar posisi point
         * @param g
         * @param klon
         * @returns
         */
        static tukarPosisi(g: IGaris, klon: boolean): IGaris;
        /**
         * memutar garis agar menghadap ke atas
         * @param garis
         * @param klon
         * @returns
         */
        static keAtas(garis: IGaris, klon: boolean): IGaris;
        /**
         * menghasilkan posisi x dari vecI(), pada idx tertentu
         *
         * @param garis garis
         * @param idx posisi (0-1)
         * @returns
         */
        static getXAtIdx(garis: IGaris, idx: number): number;
        /**
         * menghasilkan posisi y dari vecY(), pada idx tertentu
         *
         * @param garis garis
         * @param idx posisi (0-1)
         * @returns
         */
        static getYAtIdx(g: IGaris, idx: number): number;
        /**
         * memutar garis
         * @param g garis
         * @param sdt sudut perputaran
         * @param xc posisi pusat putaran x
         * @param yc posisi pusat putaran y
         */
        static putar(g: IGaris, sdt: number, xc: number, yc: number, klon: boolean): IGaris;
        /**
         * putar garis agar sejajar sumbu X
         * @param g garis
         * @param klon apakah akan mengklone garis sebelum diputar
         * @returns garis yang sudah di putar
         */
        static putarKeHor(g: IGaris, klon: boolean): IGaris;
        static minX(garis: IGaris): number;
        static maxX(garis: IGaris): number;
        static minY(garis: IGaris): number;
        static maxY(garis: IGaris): number;
        static pindah(garis: IGaris, x?: number, y?: number): void;
        static xHorIdx(garis: IGaris): number;
        /**
         * mengkopy dari garis sumber ke garis target
         * @param gs garis sumber
         * @param gt garis target
         */
        static copy(gs: IGaris, gt: IGaris): void;
        /**
         * klone garis
         * @param garis
         * @returns
         */
        static klon(garis: IGaris): IGaris;
        /**
         * menghitung sudut dari garis
         * @param garis - garis
         * @returns sudut
         */
        static sudut(garis: IGaris): number;
        /**
         * menghasilkan panjang pada sumbu x
         * @param garis garis
         * @returns
         */
        static vecI(garis: IGaris): number;
        static vecJ(garis: IGaris): number;
        /**
         * putar garis jamak
         * menggunakan garis 1 sebagai pusat
         *
         */
        static putarGarisJmk(gs: IGaris[], sdt: number, klon: boolean): void;
        /** GARIS - POINT
         * ==============
        */
        /**
         * apakah sebuah garis berada di sebelah kanan titik
         * @param g
         * @param xt
         * @param yt
         * @returns
         */
        static kananPos(g: IGaris, xt: number, yt: number): boolean;
        /** GARIS - GARIS
         * ==============
        */
        static boundCollide(g1: IGaris, g2: IGaris): boolean;
        /**
         * update bound
         * @param g
         * @returns
         */
        static updateBound(g: IGaris): void;
        private static _tabrakan;
        static tabrakan(g1: IGaris, g2: IGaris): boolean;
        static collide2(g: IGaris, seg2: IGaris): boolean;
        static melewatiGarisX(g: IGaris, y?: number): boolean;
        static melewatiGarisY(g: IGaris): boolean;
    }
    export const G: typeof Garis;
    export {};
}
declare namespace ha.geom {
    /**
     * menghitung geometri relative terhadap titik 0
     */
    class Transform {
        static readonly RAD2DEG: number;
        static readonly DEG2RAD: number;
        private static _lastX;
        private static _lastY;
        static get lastX(): number;
        static get lastY(): number;
        static sama(n1: number, n2: number, toleransi?: number): boolean;
        private static quadDeg2;
        static sudut(x: number, y: number): number;
        private static normalizeDeg;
        static degDistMax(angleS: number, angleT: number): number;
        static degDistMin(angleS: number, angleT: number): number;
        static jarak(x: number, y: number, xt: number, yt: number): number;
        static rotateRel(x?: number, y?: number, xt?: number, yt?: number, deg?: number): void;
        static posPolar(jrk: number, sdt: number): void;
    }
}
declare namespace ha.geom {
    class BoundObj implements IBound {
        private _v1;
        private _v2;
        get v1(): IPoint2D;
        set v1(value: IPoint2D);
        get v2(): IPoint2D;
        set v2(value: IPoint2D);
    }
    class Bound {
        static create(): void;
        static render(ctx: CanvasRenderingContext2D, b: BoundObj): void;
        static copy(b: BoundObj, b2: BoundObj): void;
        static clone(b: BoundObj): BoundObj;
    }
}
declare namespace ha.geom {
    /**
     * INTERFACE
    */
    interface IPoint2D {
        x: number;
        y: number;
    }
    interface IBound {
        v1: IPoint2D;
        v2: IPoint2D;
    }
    interface IRect {
        vs?: IV2D[];
        segs?: IGaris[];
    }
    interface IGaris {
        v1: IV2D;
        v2: IV2D;
        b: BoundObj;
    }
    interface IGambar {
        img: HTMLImageElement;
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        frameW: number;
        frameH: number;
        rotasi: number;
        alpha: number;
        isAnim: boolean;
        rect: IRect;
        load: boolean;
        panjang: number;
        lebar: number;
        panjangDiSet: boolean;
        lebarDiSet: boolean;
        handleX: number;
        handleY: number;
        ratioX?: number;
        ratioY?: number;
    }
    interface IV2D {
        x: number;
        y: number;
    }
    interface ISprite {
        buffer: IGambar;
        x: number;
        y: number;
        dragable: boolean;
        dragged: boolean;
        down: boolean;
        hit: number;
        dragStartX: number;
        dragStartY: number;
        url: string;
        tipeDrag: number;
        sudutTekanAwal: number;
        sudutAwal: number;
        inputId: number;
    }
}
