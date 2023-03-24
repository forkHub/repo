/**
 * INTERFACE
*/
interface IRect {
    vs?: IV2D[];
    segs?: ISegment[];
}
interface ISegment {
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
interface IPoint2D {
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
//# sourceMappingURL=inteface.d.ts.map