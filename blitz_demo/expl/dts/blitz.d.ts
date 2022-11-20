declare namespace ha {
    class Main {
        private static _fps;
        private static _origin;
        private static _canvasAr;
        private static _canvasAktif;
        private static _skalaOtomatis;
        private static merah;
        private static hijau;
        private static biru;
        private static transparan;
        static Fps(n: number): void;
        static buatCanvas(canvasEl: HTMLCanvasElement): IGambar;
        static init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void;
        static Bersih(): void;
        static warna(r?: number, g?: number, b?: number, a?: number): void;
        static updateWarna(): void;
        static Hijau(a?: number): number;
        static Merah(a?: number): number;
        static Biru(a?: number): number;
        static Transparan(a?: number): number;
        static Grafis(width?: number, height?: number): void;
        static Garis(x1: number, y1: number, x2: number, y2: number): void;
        static Kotak(x1: number, y1: number, x2: number, y2: number): void;
        static SetBuffer(buffer: IGambar): void;
        static get canvasAktif(): IGambar;
        static set canvasAktif(value: IGambar);
        static get canvasAr(): IGambar[];
        static set canvasAr(value: IGambar[]);
        static get origin(): IV2D;
        static set origin(value: IV2D);
        static get fps(): number;
        static set fps(value: number);
        static get skalaOtomatis(): boolean;
        static set skalaOtomatis(value: boolean);
    }
}
declare namespace ha {
    class Image {
        static buatGambar(w?: number, h?: number, frameW?: number, frameH?: number): IGambar;
        static panjangGambar(gbr: IGambar): number;
        static lebarGambar(gbr: IGambar): number;
        static handleXGambar(gbr: IGambar): number;
        static handleYGambar(gbr: IGambar): number;
        static gambarOverlap(gbr1: IGambar, x1: number, y1: number, gbr2: IGambar, x2: number, y2: number): void;
        static gambarTabrakan(gbr1: IGambar, x1: number, y1: number, gbr2: IGambar, x2: number, y2: number): boolean;
        static dotDidalamGambar(gbr1: IGambar, x1: number, y1: number, x2: number, y2: number): boolean;
        static muatGambarAnimasiAsync(url: string, fw?: number, fh?: number): IGambar;
        static muatAsync(url: string): IGambar;
        static gambarUbin(gbr: IGambar, x?: number, y?: number, frame?: number): void;
        static putarGambar(gbr: IGambar, sudut?: number): void;
        static ambilPiksel(x?: number, y?: number): number[];
        static setPiksel(x?: number, y?: number): void;
        static posisiHandleGambar(gbr: IGambar, x?: number, y?: number): void;
        static grabGambar(gbr: IGambar, x?: number, y?: number): void;
        static tungguLoad(): Promise<void>;
        static gambar(gbr: IGambar, x?: number, y?: number, frame?: number): void;
        /**
         * Ubah Ukuran Gambar
         * @param gbr
         * @param w
         * @param h
         */
        static ukuranGambar(gbr: IGambar, w: number, h: number): void;
        static resetImageRect(img: IGambar): void;
        static rectToImageTransform(image: IGambar, x: number, y: number): void;
    }
}
/** SPRITE.TS */
declare namespace ha {
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
        constructor(buffer: IGambar, dragable?: boolean);
        static rotasi(sprite: ISprite, sudut?: number): number;
        static posisi(sprite: ISprite, x?: number, y?: number): void;
        static posisiX(spr: ISprite, x?: number | null | undefined): number;
        static posisiY(spr: ISprite, y?: number | null | undefined): number;
        static handle(spr: ISprite, x?: number, y?: number): void;
        static gambarSemua(): void;
        static tabrakan(spr: ISprite, spr2: ISprite): boolean;
        static muatAnimasiAsync(url: string, pf: number, lf: number, bisaDiDrag?: boolean): ISprite;
        static muatAsync(url: string, dragable?: boolean): ISprite;
        static ukuranGambar(gbr: ISprite, w: number, h: number): void;
        static buat(image: IGambar, dragable?: boolean): ISprite;
        static inputDown(pos: any): void;
        static inputMove(pos: any): void;
        static inputUp(): void;
        static gambar(sprite: ISprite, frame?: number): void;
        static posisiPolar(sprite: ISprite, sudut: number, jarak: number, x2: number, y2: number): void;
        static ubin(spr: ISprite, x?: number, y?: number, frame?: number): void;
        get dragStartX(): number;
        set dragStartX(value: number);
        get dragStartY(): number;
        set dragStartY(value: number);
        get dragged(): boolean;
        set dragged(value: boolean);
        get buffer(): IGambar;
        set buffer(value: IGambar);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get hit(): number;
        set hit(value: number);
        get down(): boolean;
        set down(value: boolean);
        get dragable(): boolean;
        set dragable(value: boolean);
    }
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
}
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
        init(buffer: IGambar): void;
        buatInputDefault(): IInput;
        reset(input: IInput): void;
        flush(): void;
        flushByType(type: string): void;
        flushByInput(input: IInput): void;
        getInput(key: string, inputType: string): IInput;
        baru(keyId: string, inputType: string): IInput;
        pos: (cx: number, cy: number, buffer: IGambar, canvasScaleX: number, canvasScaleY: number) => {
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
        move(input: IInput, buffer: IGambar, e: PointerEvent): void;
        down(input: IInput, key: string, type: string, pos: IV2D): void;
        up(input2: IInput): void;
    }
    export var input: Input;
    export {};
}
declare namespace ha {
    class Point {
        static create(x?: number, y?: number): IPoint2D;
        static copy(p1: IPoint2D, p2: IPoint2D): void;
        static clone(p: IPoint2D): IPoint2D;
        static sama(p1: IPoint2D, p2: IPoint2D): boolean;
        static putarPoros(p: IPoint2D, xc?: number, yc?: number, deg?: number): void;
        static posDist(p: IPoint2D, xt: number, yt: number, jrk: number): IPoint2D;
        static posPolar(jarak: number, sudut: number, xt: number, yt: number): IPoint2D;
    }
}
declare namespace ha {
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
        static scale(r: IRect): void;
        static translate(rect: IRect, x: number, y: number): void;
        static rotate(r: IRect, deg: number, xc: number, yc: number, copy?: boolean): IRect;
    }
}
declare namespace ha {
    class Segment {
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
}
/**
 * BLIJS
 */
declare namespace ha {
    class Blijs {
        private static _skalaOtomatis;
        static init(panjang?: number, lebar?: number, canvas?: HTMLCanvasElement, skalaOtomatis?: boolean): void;
        static loop(): void;
        static repeat(): void;
        static windowResize(): void;
        static get skalaOtomatis(): boolean;
        static set skalaOtomatis(value: boolean);
    }
}
declare namespace ha {
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
        static normalizeDeg(deg: number): number;
        static degDistMax(angleS: number, angleT: number): number;
        static degDistMin(angleS: number, angleT: number): number;
        static jarak(x: number, y: number, xt: number, yt: number): number;
        static rotateRel(x?: number, y?: number, xt?: number, yt?: number, deg?: number): void;
    }
}
declare const Prompt: (m: string, def: string) => string;
declare const InputHit: () => number;
declare const InputX: () => number;
declare const InputY: () => number;
declare const InputGeserX: () => number;
declare const InputGeserY: () => number;
declare const FlushInput: () => void;
declare const Pencet: () => boolean;
declare const Geser: () => boolean;
/**
 * 	KEYBOARD
 */
declare const FlushKeys: () => void;
declare const GetKey: () => string;
declare const KeybDiPencet: (key?: string) => boolean;
declare const KeybHit: (key?: string) => number;
/**
 * MOUSE dihapus
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
interface IV2D {
    x: number;
    y: number;
}
interface ITransform {
    pos: IV2D;
    scale: IV2D;
    rotation: number;
}
declare const Bersih: typeof ha.Main.Bersih;
declare const Grafis: typeof ha.Blijs.init;
declare const Garis: typeof ha.Main.Garis;
declare const Kotak: typeof ha.Main.Kotak;
declare const SetBuffer: typeof ha.Main.SetBuffer;
declare const Warna: typeof ha.Main.warna;
declare const Merah: typeof ha.Main.Merah;
declare const Hijau: typeof ha.Main.Hijau;
declare const Biru: typeof ha.Main.Biru;
declare const Transparan: typeof ha.Main.Transparan;
declare const AmbilPiksel: typeof ha.Main.warna;
declare const SetPiksel: typeof ha.Main.warna;
/** BLITZ-SPRITE.TS */
declare const Buat: typeof ha.Sprite.buat;
declare const Muat: typeof ha.Sprite.muatAsync;
declare const Posisi: typeof ha.Sprite.posisi;
declare const Ukuran: typeof ha.Sprite.ukuranGambar;
declare const PosisiPolar: typeof ha.Sprite.posisiPolar;
declare const Gambar: typeof ha.Sprite.gambar;
declare const GambarSemua: typeof ha.Sprite.gambarSemua;
declare const PosisiX: typeof ha.Sprite.posisiX;
declare const PosisiY: typeof ha.Sprite.posisiY;
declare const Handle: typeof ha.Sprite.handle;
declare const Rotasi: typeof ha.Sprite.rotasi;
declare const MuatAnimasi: typeof ha.Sprite.muatAnimasiAsync;
declare const Tabrakan: typeof ha.Sprite.tabrakan;
declare const PosisiJarakSprite: () => void;
declare const Copy: () => void;
declare const PosisiHandle: () => void;
declare const Panjang: () => void;
declare const Lebar: () => void;
declare const HandleX: () => void;
declare const HandleY: () => void;
declare const Overlap: () => void;
declare const DotDiDalam: () => void;
declare const Ubin: typeof ha.Sprite.ubin;
declare const Skala: () => void;
declare const Piksel: () => void;
declare const FPS: typeof ha.Main.Fps;
/**
 * TEXTS
 */ 
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
    vs?: IPoint2D[];
    segs?: ISegment[];
}
interface ISegment {
    v1: IPoint2D;
    v2: IPoint2D;
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
interface IPoint2D {
    x: number;
    y: number;
}
interface ITransform {
    pos: IPoint2D;
    scale: IPoint2D;
    rotation: number;
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
interface IGambar {
    img: HTMLImageElement;
    frameW: number;
    frameH: number;
    rotation: number;
    isAnim: boolean;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
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
interface ITransform {
    pos: IV2D;
    scale: IV2D;
    rotation: number;
}
