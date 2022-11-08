declare namespace ha.blitz {
    class Main {
        private _fps;
        private _origin;
        private _canvasAr;
        private _canvasAktif;
        buatCanvas(canvasEl: HTMLCanvasElement): IBuffer;
        init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void;
        get canvasAktif(): IBuffer;
        set canvasAktif(value: IBuffer);
        get canvasAr(): IBuffer[];
        set canvasAr(value: IBuffer[]);
        get origin(): IV2D;
        set origin(value: IV2D);
        get fps(): number;
        set fps(value: number);
    }
    export var main: Main;
    export {};
}
declare namespace ha.blitz {
    class Image {
        loadImage: (url: string) => Promise<HTMLImageElement>;
        resetImageRect(img: IBuffer): void;
        rectToImageTransform(image: IBuffer, x: number, y: number): void;
    }
    export var image: Image;
    export {};
}
/**
 * IMAGE
 */
declare const CreateImage: (w?: number, h?: number, frameW?: number, frameH?: number) => IBuffer;
declare const CopyImage: (src: IBuffer) => IBuffer;
declare const DrawImage: (img: IBuffer, x?: number, y?: number, frame?: number) => void;
declare const GrabImage: (img: IBuffer, x?: number, y?: number) => void;
declare const HandleImage: (img: IBuffer, x?: number, y?: number) => void;
declare const ImageWidth: (img: IBuffer) => number;
declare const ImageHeight: (img: IBuffer) => number;
declare const ImageXHandle: (img: IBuffer) => number;
declare const ImageYHandle: (img: IBuffer) => number;
declare const ImageOverlap: () => void;
declare const ImageCollide: (img1: IBuffer, x1: number, y1: number, img2: IBuffer, x2: number, y2: number) => boolean;
declare const ImageDotCollide: (img1: IBuffer, x1: number, y1: number, x2: number, y2: number) => boolean;
declare const ImageBoundOverlap: () => boolean;
declare const MidHandle: (img: IBuffer) => void;
declare const LoadImage: (url: string) => Promise<IBuffer>;
declare const LoadAnimImage: (url: string, fw?: number, fh?: number) => Promise<IBuffer>;
declare const TileImage: (img: IBuffer, x?: number, y?: number, frame?: number) => void;
declare const ResizeImage: (img: IBuffer, w?: number, h?: number) => void;
declare const RotateImage: (img: IBuffer, degree?: number) => void;
declare const ScaleImage: (img: IBuffer, xScale?: number, yScale?: number) => void;
declare const GetPixel: (x?: number, y?: number) => number[];
declare const SetColor: (r?: number, g?: number, b?: number, a?: number) => void;
declare const SetPixel: (x?: number, y?: number) => void;
declare const ImagePivot: () => void;
declare const BackgroundImage: () => void;
declare const MainLayer: () => void;
declare const CreateLayer: () => void;
declare const LayerZ: () => void;
declare const Prompt: (m: string, def: string) => string;
declare const InputHit: () => number;
declare const WaitInput: () => Promise<void>;
declare const InputX: () => number;
declare const InputY: () => number;
declare const InputDragX: () => number;
declare const InputDragY: () => number;
declare const FlushInput: () => void;
declare const InputDown: () => boolean;
declare const InputDrag: () => boolean;
/**
 * 	KEYBOARD
 */
declare const FlushKeys: () => void;
declare const GetKey: () => string;
declare const KeyIsDown: (key?: string) => boolean;
declare const KeyHit: (key?: string) => number;
declare const WaitKey: (kode?: string) => Promise<void>;
/**
 * MOUSE
 */
declare const GetMouse: () => number;
declare const MouseHit: (button?: number) => number;
declare const MouseDown: (key: string) => boolean;
declare const WaitMouse: () => void;
declare const MouseX: () => number;
declare const MouseY: () => number;
declare const MouseZ: () => number;
declare const FlushMouse: () => void;
/**
 * INTERFACE
*/
interface ILine {
    y: number;
    m: number;
    b: number;
}
interface IRect {
    vs?: IV2D[];
    segs?: ISegment[];
}
interface ISegment {
    v1: IV2D;
    v2: IV2D;
}
interface ITimer {
    endTime: number;
    startTime: number;
    time: number;
    aktif: boolean;
}
interface IInput {
    xStart: number;
    yStart: number;
    xDrag: number;
    yDrag: number;
    x: number;
    y: number;
    isDrag: boolean;
    isDown: boolean;
    isTap: boolean;
    hit: number;
    key: string;
    type: string;
    timerStart: number;
    timerEnd: number;
    id: number;
}
interface IInputData {
    type?: string;
    key?: string;
}
interface IBuffer {
    img: HTMLImageElement;
    width: number;
    height: number;
    frameW: number;
    frameH: number;
    handleX: number;
    handleY: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    isAnim: boolean;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    rect: IRect;
}
interface IV2D {
    x: number;
    y: number;
}
interface ITransform {
    pos: IV2D;
    scale: IV2D;
    rotation: number;
}
declare const Cls: (r?: number, g?: number, b?: number, alpha?: number) => void;
declare const BackBuffer: () => void;
declare const Color: (r?: number, g?: number, b?: number, a?: number) => void;
declare const ColorRed: () => void;
declare const ColorBlue: () => void;
declare const ColorGreen: () => void;
declare const ClsColor: () => void;
declare const CopyPixel: () => void;
declare const CopyRect: () => void;
declare const FrontBuffer: () => void;
declare const GetColor: () => void;
declare const Graphics: (width?: number, height?: number, gl?: boolean, pixel?: boolean) => void;
declare const GraphicsBuffer: () => void;
declare const Line: (x1: number, y1: number, x2: number, y2: number) => void;
declare const Origin: () => void;
declare const Oval: () => void;
declare const Rect: (x1: number, y1: number, x2: number, y2: number) => void;
declare const SetBuffer: (buffer: IBuffer) => void;
declare const WritePixel: () => void;
declare const ReadPixel: () => void;
declare const Plot: () => void;
/** BLITZ-SPRITE.TS */
declare const CreateSprite: (image: IBuffer, dragable?: boolean) => ha.blitz.ISprite;
declare const DrawSprite: (sprite: ha.blitz.ISprite, frame?: number) => void;
declare const Delay: (m?: number) => Promise<void>;
declare const FPS: (n: number) => void;
declare const Dim: (...args: any[]) => any[];
declare const Millisecs: () => number;
/**
 * TEXTS
 */ 
/** INPUT.TS */
declare namespace ha {
    class Input {
        private _inputs;
        private _touchGlobal;
        private _mouseGlobal;
        private _keybGlobal;
        private _inputGlobal;
        private _event;
        constructor();
        getMouseKeyId(e: PointerEvent): string;
        init(buffer: IBuffer): void;
        buatInputDefault(): IInput;
        reset(input: IInput): void;
        flush(): void;
        flushByType(type: string): void;
        flushByInput(input: IInput): void;
        getInput(key: string, inputType: string): IInput;
        baru(keyId: string, inputType: string): IInput;
        pos: (cx: number, cy: number, buffer: IBuffer, canvasScaleX: number, canvasScaleY: number) => {
            x: number;
            y: number;
        };
        get inputs(): IInput[];
        get event(): EventHandler;
        get touchGlobal(): IInput;
        get mouseGlobal(): IInput;
        get keybGlobal(): IInput;
        get inputGlobal(): IInput;
    }
    class EventHandler {
        move(input: IInput, canvas: IBuffer, e: PointerEvent): void;
        down(input: IInput, key: string, type: string, pos: IV2D): void;
        up(input2: IInput): void;
    }
    export var input: Input;
    export {};
}
/**
 * INTERFACE
*/
interface IConfig {
    input: IInput;
}
interface ILine {
    y: number;
    m: number;
    b: number;
}
interface IRect {
    vs?: IV2D[];
    segs?: ISegment[];
}
interface ISegment {
    v1: IV2D;
    v2: IV2D;
}
interface ITimer {
    endTime: number;
    startTime: number;
    time: number;
    aktif: boolean;
}
interface IInput {
    xStart: number;
    yStart: number;
    xDrag: number;
    yDrag: number;
    x: number;
    y: number;
    isDrag: boolean;
    isDown: boolean;
    isTap: boolean;
    hit: number;
    key: string;
    type: string;
    timerStart: number;
    timerEnd: number;
    id: number;
}
interface IInputData {
    type?: string;
    key?: string;
}
interface IBuffer {
    img: HTMLImageElement;
    width: number;
    height: number;
    frameW: number;
    frameH: number;
    handleX: number;
    handleY: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    isAnim: boolean;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    rect: IRect;
}
interface IV2D {
    x: number;
    y: number;
}
interface ITransform {
    pos: IV2D;
    scale: IV2D;
    rotation: number;
}
declare namespace ha {
    class Line {
        createLine(m: number, b: number): ILine;
        fromPos(): void;
        fromVec(): void;
        fromSeg(): void;
        lineCrossPos(line: ILine, line2: ILine): IV2D;
    }
    export var line: Line;
    export {};
}
declare namespace ha {
    class Point {
        create(x?: number, y?: number): IV2D;
        copyInfo(p1: IV2D, p2: IV2D): void;
        copy(p: IV2D): IV2D;
        equal(p1: IV2D, p2: IV2D): boolean;
        translate(p: IV2D, x?: number, y?: number): void;
        rotateRel(p: IV2D, xc?: number, yc?: number, deg?: number): void;
    }
    export var point: Point;
    export {};
}
declare namespace ha {
    class Rect {
        create(x1?: number, y1?: number, x2?: number, y2?: number): IRect;
        copy(r: IRect): IRect;
        copyInfo(r1: IRect, r2: IRect): void;
        collideBound(r1: IRect, r2: IRect): boolean;
        collide(r1: IRect, r2: IRect): boolean;
        collideDotBound(r: IRect, d: IV2D): boolean;
        collideDot(r: IRect, x: number, y: number): boolean;
        minX(r: IRect): number;
        maxX(r: IRect): number;
        minY(r: IRect): number;
        maxY(r: IRect): number;
        scale(r: IRect): void;
        translate(rect: IRect, x: number, y: number): void;
        rotate(r: IRect, deg: number, xc: number, yc: number): void;
    }
    export var rect: Rect;
    export {};
}
declare namespace ha {
    class Segment {
        createSeg(v1?: IV2D, v2?: IV2D): ISegment;
        boundCollide(seg1: ISegment, seg2: ISegment): boolean;
        collide(seg1: ISegment, seg2: ISegment): boolean;
        copyInfo(seg1: ISegment, seg2: ISegment): void;
        copy(seg: ISegment): ISegment;
        crossHor(seg: ISegment): boolean;
        deg(line: ISegment): number;
        getXAtIdx(seg: ISegment, idx: number): number;
        getYAtIdx(seg: ISegment, idx: number): number;
        vecI(seg: ISegment): number;
        vecJ(seg: ISegment): number;
        rotate(seg: ISegment, deg?: number, xc?: number, yc?: number): void;
        minX(seg: ISegment): number;
        maxX(seg: ISegment): number;
        minY(seg: ISegment): number;
        maxY(seg: ISegment): number;
        /**
         * whether a point position is on the left side of a segment
         * @param p point
         * @param seg segment
         * @returns 0 = false, 1 = true, 2 = true, on tip
         */
        /**
         * rotate segment so that it is pararel to horzontal axis based on the first point as center of rotation
         * @param seg
         */
        /**
         * rotate segment so that it is pararel to vertical axis based on the first point as center of rotation
         * @param seg
         */
        translate(seg: ISegment, x?: number, y?: number): void;
        xHorIdx(seg: ISegment): number;
    }
    export var segment: Segment;
    export {};
}
declare namespace ha {
    class Transform {
        readonly RAD2DEG: number;
        readonly DEG2RAD: number;
        private _lastX;
        private _lastY;
        get lastX(): number;
        get lastY(): number;
        create(): ITransform;
        equal(n1: number, n2: number, tol?: number): boolean;
        quadDeg2(x: number, y: number, deg: number): number;
        deg(x: number, y: number): number;
        normalizeDeg(deg: number): number;
        degMaxDist(angleS: number, angleT: number): number;
        degMinDist(angleS: number, angleT: number): number;
        dist(x: number, y: number, xt: number, yt: number): number;
        rotateRel(x?: number, y?: number, xt?: number, yt?: number, deg?: number): void;
    }
    export var trans: Transform;
    export {};
}
/** SPRITE.TS */
declare namespace ha.blitz {
    class Sprite implements ISprite {
        static readonly daftar: ISprite[];
        private _buffer;
        private _x;
        private _y;
        private _dragged;
        private _down;
        private _hit;
        private _dragStartY;
        private _dragStartX;
        private _dragable;
        constructor(buffer: IBuffer, dragable?: boolean);
        get dragable(): boolean;
        set dragable(value: boolean);
        static buat(image: IBuffer, dragable?: boolean): ISprite;
        static gambar(sprite: ISprite): void;
        get dragStartX(): number;
        set dragStartX(value: number);
        get dragStartY(): number;
        set dragStartY(value: number);
        get dragged(): boolean;
        set dragged(value: boolean);
        get buffer(): IBuffer;
        set buffer(value: IBuffer);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get hit(): number;
        set hit(value: number);
        get down(): boolean;
        set down(value: boolean);
    }
    interface ISprite {
        buffer: IBuffer;
        x: number;
        y: number;
        dragable: boolean;
        dragged: boolean;
        down: boolean;
        hit: number;
        dragStartX: number;
        dragStartY: number;
    }
}
