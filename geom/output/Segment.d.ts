export declare class Segment {
    static create(v1?: IPoint2D, v2?: IPoint2D): ISegment;
    static boundCollide(seg1: ISegment, seg2: ISegment): boolean;
    static collide(seg1: ISegment, seg2: ISegment): boolean;
    static copy(seg1: ISegment, seg2: ISegment): void;
    static clone(seg: ISegment): ISegment;
    static crossHor(seg: ISegment): boolean;
    static deg(line: ISegment): number;
    static getXAtIdx(seg: ISegment, idx: number): number;
    static getYAtIdx(seg: ISegment, idx: number): number;
    static vecI(seg: ISegment): number;
    static vecJ(seg: ISegment): number;
    static rotate(seg: ISegment, deg?: number, xc?: number, yc?: number): void;
    static minX(seg: ISegment): number;
    static maxX(seg: ISegment): number;
    static minY(seg: ISegment): number;
    static maxY(seg: ISegment): number;
    static translate(seg: ISegment, x?: number, y?: number): void;
    static xHorIdx(seg: ISegment): number;
}
//# sourceMappingURL=Segment.d.ts.map