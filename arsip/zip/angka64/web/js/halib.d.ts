declare namespace ha {
    class Input {
        private _inputs;
        private _touchGlobal;
        private _mouseGlobal;
        private _keybGlobal;
        private _inputGlobal;
        private _event;
        constructor();
        getMouseKey(e: PointerEvent): string;
        init(buffer: IBuffer): void;
        def(): IInput;
        reset(input: IInput): void;
        flush(): void;
        flushByType(type: string): void;
        flushByInput(input: IInput): void;
        getInput(key: string, inputType: string): IInput;
        baru(e: string, inputType: string): IInput;
        pos: (cx: number, cy: number, buffer: IBuffer, canvasScaleX: number, canvasScaleY: number) => {
            x: number;
            y: number;
        };
        get inputs(): IInput[];
        get event(): Event;
        get touchGlobal(): IInput;
        get mouseGlobal(): IInput;
        get keybGlobal(): IInput;
        get inputGlobal(): IInput;
    }
    class Event {
        move(input: IInput, canvas: IBuffer, e: PointerEvent): void;
        down(input: IInput, key: string, type: string, pos: IV2D): void;
        up(input2: IInput): void;
    }
    export var input: Input;
    export {};
}
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
