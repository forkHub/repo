export declare class Rect {
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
//# sourceMappingURL=Rect.d.ts.map