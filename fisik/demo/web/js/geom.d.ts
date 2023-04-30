declare namespace ha.geom {
    class Point {
        static create(x?: number, y?: number): IPoint2D;
        /**
         * menukar posisi antara dua point
         * @param p1
         * @param p2
         */
        static tukarPosisi(p1: IPoint2D, p2: IPoint2D): void;
        static copy(ps: IPoint2D, pt: IPoint2D): void;
        static clone(p: IPoint2D): IPoint2D;
        static sama(p1: IPoint2D, p2: IPoint2D): boolean;
        static putarPoros(p: IPoint2D, xc?: number, yc?: number, deg?: number): void;
        static posDist(p: IPoint2D, xt: number, yt: number, jrk: number): IPoint2D;
        static posPolar(jarak: number, sudut: number, xt: number, yt: number): IPoint2D;
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
    class Garis {
        static create(v1?: IPoint2D, v2?: IPoint2D): IGaris;
        static destroy(g1: IGaris): void;
        static hadapAtas(garis: IGaris): boolean;
        /**
         * tukar posisi point
         * @param garis
         * @param klon
         * @returns
         */
        static tukarPosisi(garis: IGaris, klon: boolean): IGaris;
        static keAtas(garis: IGaris, klon: boolean): IGaris;
        static boundCollide(seg1: IGaris, seg2: IGaris): boolean;
        static tabrakan(g1: IGaris, g2: IGaris): boolean;
        static collide2(seg1: IGaris, seg2: IGaris): boolean;
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
        static melewatiGarisX(seg: IGaris): boolean;
        static melewatiGarisY(seg: IGaris): boolean;
        /**
         * menghitung sudut dari garis
         * @param garis - garis
         * @returns sudut
         */
        static sudut(garis: IGaris): number;
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
        static getYAtIdx(seg: IGaris, idx: number): number;
        /**
         * menghasilkan panjang pada sumbu x
         * @param garis garis
         * @returns
         */
        static vecI(garis: IGaris): number;
        static vecJ(garis: IGaris): number;
        /**
         * memutar garis
         * @param garis garis
         * @param deg sudut perputaran
         * @param xc posisi tengah x
         * @param yc posisi tengah y
         */
        static putar(garis: IGaris, deg?: number, xc?: number, yc?: number): void;
        static putarKeHor(g: IGaris, klon: boolean): IGaris;
        static minX(garis: IGaris): number;
        static maxX(garis: IGaris): number;
        static minY(garis: IGaris): number;
        static maxY(garis: IGaris): number;
        static pindah(garis: IGaris, x?: number, y?: number): void;
        static xHorIdx(garis: IGaris): number;
    }
}
declare namespace ha.geom {
    class Transform {
        static readonly RAD2DEG: number;
        static readonly DEG2RAD: number;
        private static _lastX;
        private static _lastY;
        static get lastX(): number;
        static get lastY(): number;
        static equal(n1: number, n2: number, toleransi?: number): boolean;
        private static quadDeg2;
        static deg(x: number, y: number): number;
        private static normalizeDeg;
        static degDistMax(angleS: number, angleT: number): number;
        static degDistMin(angleS: number, angleT: number): number;
        static jarak(x: number, y: number, xt: number, yt: number): number;
        static rotateRel(x?: number, y?: number, xt?: number, yt?: number, deg?: number): void;
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
    interface IRect {
        vs?: IV2D[];
        segs?: IGaris[];
    }
    interface IGaris {
        v1: IV2D;
        v2: IV2D;
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
