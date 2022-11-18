declare namespace ha_blitz {
    class Main {
        private static _fps;
        private static _origin;
        private static _canvasAr;
        private static _canvasAktif;
        static buatCanvas(canvasEl: HTMLCanvasElement): IGambar;
        static init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void;
        static Bersih: (r?: number, g?: number, b?: number, alpha?: number) => void;
        static Color: (r?: number, g?: number, b?: number, a?: number) => void;
        static Grafis: (width?: number, height?: number, gl?: boolean, pixel?: boolean) => void;
        static Garis: (x1: number, y1: number, x2: number, y2: number) => void;
        static Kotak: (x1: number, y1: number, x2: number, y2: number) => void;
        static SetBuffer: (buffer: IGambar) => void;
        static get canvasAktif(): IGambar;
        static set canvasAktif(value: IGambar);
        static get canvasAr(): IGambar[];
        static set canvasAr(value: IGambar[]);
        static get origin(): IV2D;
        static set origin(value: IV2D);
        static get fps(): number;
        static set fps(value: number);
    }
}
declare namespace ha_blitz {
    class Image {
        static buatGambar(w?: number, h?: number, frameW?: number, frameH?: number): IGambar;
        static panjangGambar(gbr: IGambar): number;
        static lebarGambar(gbr: IGambar): number;
        static handleXGambar(gbr: IGambar): number;
        static handleYGambar(gbr: IGambar): number;
        static gambarOverlap(gbr1: IGambar, x1: number, y1: number, gbr2: IGambar, x2: number, y2: number): void;
        static gambarTabrakan(gbr1: IGambar, x1: number, y1: number, gbr2: IGambar, x2: number, y2: number): boolean;
        static dotDidalamGambar(gbr1: IGambar, x1: number, y1: number, x2: number, y2: number): boolean;
        static muatGambarAnimasi(url: string, fw?: number, fh?: number): Promise<IGambar>;
        static gambarUbin(gbr: IGambar, x?: number, y?: number, frame?: number): void;
        static putarGambar(gbr: IGambar, sudut?: number): void;
        static skalaGambar(gbr: IGambar, skalaX?: number, skalaY?: number): void;
        static ambilPiksel(x?: number, y?: number): number[];
        static setWarna(r?: number, g?: number, b?: number, a?: number): void;
        static setPiksel(x?: number, y?: number): void;
        static posisiHandleGambar(gbr: IGambar, x?: number, y?: number): void;
        static grabGambar(gbr: IGambar, x?: number, y?: number): void;
        static muat(url: string): Promise<IGambar>;
        static muatAsync(url: string): IGambar;
        static gambar(gbr: IGambar, x?: number, y?: number, frame?: number): void;
        handleTengah: (gbr: IGambar) => void;
        /**
         * Ubah Ukuran Gambar
         * @param gbr
         * @param w
         * @param h
         */
        ukuranGambar(gbr: IGambar, w: number, h: number): void;
        loadImage: (url: string) => Promise<HTMLImageElement>;
        resetImageRect(img: IGambar): void;
        rectToImageTransform(image: IGambar, x: number, y: number): void;
    }
    var image: Image;
}
/**
 * IMAGE
 */
declare const BuatGambar: typeof ha_blitz.Image.buatGambar;
declare const TaruhGambar: typeof ha_blitz.Image.gambar;
declare const GrabGambar: typeof ha_blitz.Image.grabGambar;
declare const PosisiHandleGambar: typeof ha_blitz.Image.posisiHandleGambar;
declare const PanjangGambar: typeof ha_blitz.Image.panjangGambar;
declare const LebarGambar: typeof ha_blitz.Image.lebarGambar;
declare const HandleXGambar: typeof ha_blitz.Image.handleXGambar;
declare const HandleYGambar: typeof ha_blitz.Image.handleYGambar;
declare const GambarOverlap: typeof ha_blitz.Image.gambarOverlap;
declare const GambarTabrakan: typeof ha_blitz.Image.gambarTabrakan;
declare const DotDidalamGambar: typeof ha_blitz.Image.dotDidalamGambar;
declare const MuatGambar: typeof ha_blitz.Image.muat;
declare const MuatGambarAnimasi: typeof ha_blitz.Image.muatGambarAnimasi;
declare const GambarUbin: typeof ha_blitz.Image.gambarUbin;
declare const ResizeGambar: (gbr: IGambar, w: number, h: number) => void;
declare const PutarGambar: typeof ha_blitz.Image.putarGambar;
declare const SkalaGambar: typeof ha_blitz.Image.skalaGambar;
declare const AmbilPiksel: typeof ha_blitz.Image.ambilPiksel;
declare const SetWarna: typeof ha_blitz.Image.setWarna;
declare const SetPiksel: typeof ha_blitz.Image.setPiksel;
declare const ImagePivot: () => void;
declare const BackgroundImage: () => void;
declare const MainLayer: () => void;
declare const CreateLayer: () => void;
declare const LayerZ: () => void;
declare const Prompt: (m: string, def: string) => string;
declare const InputHit: () => number;
declare const TungguInput: () => Promise<void>;
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
declare const TungguKeyb: (kode?: string) => Promise<void>;
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
declare const Bersih: (r?: number, g?: number, b?: number, alpha?: number) => void;
declare const Color: (r?: number, g?: number, b?: number, a?: number) => void;
declare const Grafis: (width?: number, height?: number, gl?: boolean, pixel?: boolean) => void;
declare const Garis: (x1: number, y1: number, x2: number, y2: number) => void;
declare const Kotak: (x1: number, y1: number, x2: number, y2: number) => void;
declare const SetBuffer: (buffer: IGambar) => void;
declare const GraphicsBuffer: () => void;
declare const Origin: () => void;
declare const Oval: () => void;
declare const WritePixel: () => void;
declare const ReadPixel: () => void;
declare const Plot: () => void;
declare const WarnaMerah: () => void;
declare const ColorBlue: () => void;
declare const ColorGreen: () => void;
declare const ClsColor: () => void;
declare const CopyPixel: () => void;
declare const CopyRect: () => void;
declare const FrontBuffer: () => void;
declare const GetColor: () => void;
declare const BackBuffer: () => void;
/** SPRITE.TS */
declare namespace ha_blitz {
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
        static posisi(sprite: ISprite, x?: number, y?: number): void;
        static posisiX(spr: ISprite, x?: number | null | undefined): number;
        static posisiY(spr: ISprite, y?: number | null | undefined): number;
        static gambarSemua(): void;
        static muatAsync(url: string, dragable?: boolean): ISprite;
        static muat(url: string, dragable?: boolean): Promise<ISprite>;
        static ukuranGambar(gbr: ISprite, w: number, h: number): void;
        static handleTengah(gbr: ISprite): void;
        static buat(image: IGambar, dragable?: boolean): ISprite;
        static inputDown(pos: any): void;
        static inputMove(pos: any): void;
        static inputUp(): void;
        static gambar(sprite: ISprite): void;
        static posisiPolar(sprite: ISprite, sudut: number, jarak: number, x2: number, y2: number): void;
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
/** BLITZ-SPRITE.TS */
declare const Buat: typeof ha_blitz.Sprite.buat;
declare const Muat: typeof ha_blitz.Sprite.muatAsync;
declare const Posisi: typeof ha_blitz.Sprite.posisi;
declare const Ukuran: typeof ha_blitz.Sprite.ukuranGambar;
declare const HandleTengah: typeof ha_blitz.Sprite.handleTengah;
declare const PosisiPolar: typeof ha_blitz.Sprite.posisiPolar;
declare const Gambar: typeof ha_blitz.Sprite.gambar;
declare const GambarSemua: typeof ha_blitz.Sprite.gambarSemua;
declare const PosisiX: typeof ha_blitz.Sprite.posisiX;
declare const PosisiY: typeof ha_blitz.Sprite.posisiY;
declare const PosisiJarakSprite: () => void;
declare const Copy: () => void;
declare const PosisiHandle: () => void;
declare const Panjang: () => void;
declare const Lebar: () => void;
declare const HandleX: () => void;
declare const HandleY: () => void;
declare const Overlap: () => void;
declare const Tabrakan: () => void;
declare const DotDiDalam: () => void;
declare const MuatAnimasi: () => void;
declare const Ubin: () => void;
declare const Putar: () => void;
declare const Skala: () => void;
declare const Piksel: () => void;
declare const Warna: () => void;
declare const Merah: () => void;
declare const Hijau: () => void;
declare const Biru: () => void;
declare const Jeda: (m?: number) => Promise<void>;
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
    load: boolean;
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
