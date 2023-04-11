interface IPoint2D {
    x: number;
    y: number;
}
export declare class Point {
    static create(x?: number, y?: number): IPoint2D;
    static copy(p1: IPoint2D, p2: IPoint2D): void;
    static clone(p: IPoint2D): IPoint2D;
    static sama(p1: IPoint2D, p2: IPoint2D): boolean;
    static putarPoros(p: IPoint2D, xc?: number, yc?: number, deg?: number): void;
    static posDist(p: IPoint2D, xt: number, yt: number, jrk: number): IPoint2D;
    static posPolar(jarak: number, sudut: number, xt: number, yt: number): IPoint2D;
}
export {};
//# sourceMappingURL=Point.d.ts.map