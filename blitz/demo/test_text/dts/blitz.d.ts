declare namespace ha {
    class Main {
        private static _fps;
        private static _origin;
        private static _canvasAr;
        private static _canvasAktif;
        private static _skalaOtomatis;
        private static _merah;
        private static _hijau;
        private static _biru;
        private static _transparan;
        private static warnaBackup;
        static kontek(spr?: ISprite): CanvasRenderingContext2D;
        static Fps(n: number): void;
        static buatCanvas(canvasEl: HTMLCanvasElement): IGambar;
        static init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void;
        static backupWarna(): void;
        static restoreWarna(): void;
        static Bersih(m?: number, h?: number, b?: number, t?: number): void;
        static warna(r?: number, g?: number, b?: number, a?: number): void;
        private static updateStyleWarna;
        static Hijau(): number;
        static Merah(): number;
        static Biru(): number;
        static Transparan(): number;
        static Grafis(p?: number, l?: number): void;
        static Garis(x1: number, y1: number, x2: number, y2: number): void;
        static Kotak(x1: number, y1: number, x2: number, y2: number, isi?: boolean, garis?: boolean, rotasi?: number): void;
        static Oval(x: number, y: number, radius: number, skalaX?: number, skalaY?: number, rotasi?: number): void;
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
        static get merah(): number;
        static set merah(value: number);
        static get hijau(): number;
        static set hijau(value: number);
        static get biru(): number;
        static set biru(value: number);
        static get transparan(): number;
        static set transparan(value: number);
    }
}
declare namespace ha {
    class Image {
        static buatBagiCanvas(canvas: HTMLCanvasElement, w?: number, h?: number, frameW?: number, frameH?: number): IGambar;
        static buat(w?: number, h?: number, frameW?: number, frameH?: number): IGambar;
        static panjang(gbr: IGambar, pj?: number): number;
        static lebar(gbr: IGambar, lb?: number): number;
        static handleX(gbr: IGambar): number;
        static handleY(gbr: IGambar): number;
        static tabrakan(gbr1: IGambar, x1: number, y1: number, gbr2: IGambar, x2: number, y2: number): boolean;
        static dotDidalamGambar(gbr1: IGambar, x1: number, y1: number, x2: number, y2: number): boolean;
        static muatAnimAsync(url: string, fw?: number, fh?: number): IGambar;
        static muatAnimAsyncCanvas(url: string, fw: number, fh: number, canvas: HTMLCanvasElement): IGambar;
        static muatAsync(url: string): IGambar;
        static muatAsyncKanvas(url: string, canvas: HTMLCanvasElement): IGambar;
        static gambarUbin(gbr: IGambar, x?: number, y?: number, frame?: number): void;
        static putarGambar(gbr: IGambar, sudut?: number): void;
        static ambilPiksel(x?: number, y?: number): number[];
        static setPiksel(x?: number, y?: number): void;
        static handle(gbr: IGambar, x?: number, y?: number): void;
        static grabGambar(gbr: IGambar, x?: number, y?: number): void;
        static gambar(gbr: IGambar, x?: number, y?: number, frame?: number): void;
        static ukuran(gbr: IGambar, w?: number, h?: number): void;
        private static resetRect;
        private static rectToImageTransform;
    }
}
declare namespace ha {
    class Sprite implements ISprite {
        static readonly daftar: ISprite[];
        private _buff;
        private _x;
        private _y;
        private _dragged;
        private _down;
        private _hit;
        private _dragStartY;
        private _dragStartX;
        private _dragable;
        private _url;
        get url(): string;
        set url(value: string);
        constructor(buffer: IGambar, dragable?: boolean);
        static copy(sprS: ISprite): ISprite;
        static panjang(spr: ISprite, pj?: number): number;
        static lebar(spr: ISprite, lb?: number): number;
        static alpha(spr: ISprite, alpha?: number): number;
        static rotasi(spr: ISprite, sudut?: number): number;
        static posisi(spr: ISprite, x?: number, y?: number): void;
        static posisiX(spr: ISprite, x?: number | null | undefined): number;
        static posisiY(spr: ISprite, y?: number | null | undefined): number;
        static handle(spr: ISprite, x?: number, y?: number): void;
        static gambarSemua(): void;
        static tabrakan(spr: ISprite, spr2: ISprite): boolean;
        static muatAnimasiAsyncKanvas(url: string, pf: number, lf: number, bisaDiDrag: boolean, canvas: HTMLCanvasElement): ISprite;
        static muatAnimasiAsync(url: string, pf: number, lf: number, bisaDiDrag?: boolean): ISprite;
        static muatAsyncBerbagiKanvas(url: string, dragable: boolean, canvas: HTMLCanvasElement): ISprite;
        static muatAsync(url: string, dragable?: boolean): ISprite;
        static ukuran(gbr: ISprite, w: number, h: number): void;
        static buat(image: IGambar, dragable: boolean, url: string): ISprite;
        static inputDown(pos: any): void;
        static inputMove(pos: any): void;
        static inputUp(): void;
        static gambar(sprite: ISprite, frame?: number): void;
        static posisiPolar(sprite: ISprite, sudut: number, jarak: number, x2: number, y2: number, skalaX?: number, skalaY?: number): void;
        static ubin(spr: ISprite, x?: number, y?: number, frame?: number): void;
        static semuaDiLoad(): boolean;
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
    url: string;
}
declare namespace ha {
    class Input {
        private _inputs;
        private _touchGlobal;
        private _mouseGlobal;
        private _keybGlobal;
        private _inputGlobal;
        private _event;
        constructor();
        InputHit(): number;
        InputX(): number;
        InputY(): number;
        GeserX(): number;
        GeserY(): number;
        FlushInput(): void;
        Pencet(): boolean;
        Geser(): boolean;
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
        up(input: IInput): void;
    }
    export const input: Input;
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
declare namespace ha {
    class Blijs {
        private static _skalaOtomatis;
        private static _inputStatus;
        static get inputStatus(): boolean;
        static set inputStatus(value: boolean);
        static init(panjang?: number, lebar?: number, canvas?: HTMLCanvasElement, skalaOtomatis?: boolean, input?: boolean): void;
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
        private static normalizeDeg;
        static degDistMax(angleS: number, angleT: number): number;
        static degDistMin(angleS: number, angleT: number): number;
        static jarak(x: number, y: number, xt: number, yt: number): number;
        static rotateRel(x?: number, y?: number, xt?: number, yt?: number, deg?: number): void;
    }
}
declare namespace ha {
    class Teks {
        private static get ctx();
        static font(font?: string): void;
        static rata(rata?: CanvasTextAlign): void;
        static tulis(teks: string, x: number, y: number, warna?: boolean, garis?: boolean): void;
    }
}
declare namespace ha {
    class Route {
        static ukuran(obj: ISprite | "teks", w?: number, h?: number): void;
    }
}
declare const InputHit: () => number;
declare const InputX: () => number;
declare const InputY: () => number;
declare const GeserX: () => number;
declare const GeserY: () => number;
declare const FlushInput: () => void;
declare const Pencet: () => boolean;
declare const Geser: () => boolean;
declare const FlushKeys: () => void;
declare const GetKey: () => string;
declare const KeybDiPencet: (key?: string) => boolean;
declare const KeybHit: (key?: string) => number;
declare const Bersih: typeof ha.Main.Bersih;
declare const Grafis: typeof ha.Blijs.init;
declare const Warna: typeof ha.Main.warna;
declare const Merah: typeof ha.Main.Merah;
declare const Hijau: typeof ha.Main.Hijau;
declare const Biru: typeof ha.Main.Biru;
declare const Transparan: typeof ha.Main.Transparan;
declare const AmbilPiksel: typeof ha.Image.ambilPiksel;
declare const SetPiksel: typeof ha.Image.setPiksel;
declare const Kontek: typeof ha.Main.kontek;
declare const Garis: typeof ha.Main.Garis;
declare const Kotak: typeof ha.Main.Kotak;
declare const Oval: typeof ha.Main.Oval;
declare const Sudut: typeof ha.Transform.deg;
declare const Buat: typeof ha.Sprite.buat;
declare const Muat: typeof ha.Sprite.muatAsync;
declare const MuatAnimasi: typeof ha.Sprite.muatAnimasiAsync;
declare const Posisi: typeof ha.Sprite.posisi;
declare const Ukuran: typeof ha.Sprite.ukuran;
declare const PosisiPolar: typeof ha.Sprite.posisiPolar;
declare const Gambar: typeof ha.Sprite.gambar;
declare const GambarSemua: typeof ha.Sprite.gambarSemua;
declare const PosisiX: typeof ha.Sprite.posisiX;
declare const PosisiY: typeof ha.Sprite.posisiY;
declare const Handle: typeof ha.Sprite.handle;
declare const Rotasi: typeof ha.Sprite.rotasi;
declare const Alpha: typeof ha.Sprite.alpha;
declare const Tabrakan: typeof ha.Sprite.tabrakan;
declare const Panjang: typeof ha.Sprite.panjang;
declare const Lebar: typeof ha.Sprite.lebar;
declare const Copy: typeof ha.Sprite.copy;
declare const Ubin: typeof ha.Sprite.ubin;
declare const FPS: typeof ha.Main.Fps;
declare var Font: typeof ha.Teks.font;
declare var Tulis: typeof ha.Teks.tulis;
declare var Rata: typeof ha.Teks.rata;
declare namespace ha {
    class Cache {
        private files;
        getGbr(url: string): HTMLImageElement;
        setFile(url: string, img: HTMLImageElement): void;
    }
    export const cache: Cache;
    export {};
}
interface IRect {
    vs?: IV2D[];
    segs?: ISegment[];
}
interface ISegment {
    v1: IV2D;
    v2: IV2D;
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
