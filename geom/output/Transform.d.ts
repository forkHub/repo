export declare class Transform {
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
//# sourceMappingURL=Transform.d.ts.map