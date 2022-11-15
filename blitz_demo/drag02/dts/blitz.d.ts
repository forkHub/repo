declare namespace ha_blitz {
    class Main {
        private _fps;
        private _origin;
        private _canvasAr;
        private _canvasAktif;
        buatCanvas(canvasEl: HTMLCanvasElement): IGambar;
        init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void;
        get canvasAktif(): IGambar;
        set canvasAktif(value: IGambar);
        get canvasAr(): IGambar[];
        set canvasAr(value: IGambar[]);
        get origin(): IV2D;
        set origin(value: IV2D);
        get fps(): number;
        set fps(value: number);
    }
    export var main: Main;
    export {};
}
declare namespace ha_blitz {
    class Image {
        readonly daftar: IGambar[];
        buat(img: HTMLImageElement, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, rect: IRect): IGambar;
        loadImage: (url: string) => Promise<HTMLImageElement>;
        resetImageRect(img: IGambar): void;
        rectToImageTransform(image: IGambar, x: number, y: number): void;
    }
    export var image: Image;
    export {};
}
/**
 * IMAGE
 */
declare const BuatGambar: (w?: number, h?: number, frameW?: number, frameH?: number) => IGambar;
declare const CopyGambar: (src: IGambar) => IGambar;
declare const TaruhGambar: (gbr: IGambar, x?: number, y?: number, frame?: number) => void;
declare const GrabGambar: (gbr: IGambar, x?: number, y?: number) => void;
declare const PosisiHandleGambar: (gbr: IGambar, x?: number, y?: number) => void;
declare const PanjangGambar: (gbr: IGambar) => number;
declare const LebarGambar: (gbr: IGambar) => number;
declare const HandleXGambar: (gbr: IGambar) => number;
declare const HandleYGambar: (gbr: IGambar) => number;
declare const GambarOverlap: (gbr1: IGambar, x1: number, y1: number, gbr2: IGambar, x2: number, y2: number) => void;
declare const GambarTabrakan: (gbr1: IGambar, x1: number, y1: number, gbr2: IGambar, x2: number, y2: number) => boolean;
declare const DotDidalamGambar: (gbr1: IGambar, x1: number, y1: number, x2: number, y2: number) => boolean;
declare const HandleTengah: (gbr: IGambar) => void;
declare const MuatGambar: (url: string) => Promise<IGambar>;
declare const MuatGambarAnimasi: (url: string, fw?: number, fh?: number) => Promise<IGambar>;
declare const GambarUbin: (gbr: IGambar, x?: number, y?: number, frame?: number) => void;
declare const ResizeGambar: (gbr: IGambar, w?: number, h?: number) => void;
declare const PutarGambar: (gbr: IGambar, sudut?: number) => void;
declare const SkalaGambar: (gbr: IGambar, skalaX?: number, skalaY?: number) => void;
declare const AmbilPiksel: (x?: number, y?: number) => number[];
declare const SetWarna: (r?: number, g?: number, b?: number, a?: number) => void;
declare const SetPikel: (x?: number, y?: number) => void;
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
declare const BackBuffer: () => void;
declare const Color: (r?: number, g?: number, b?: number, a?: number) => void;
declare const WarnaMerah: () => void;
declare const ColorBlue: () => void;
declare const ColorGreen: () => void;
declare const ClsColor: () => void;
declare const CopyPixel: () => void;
declare const CopyRect: () => void;
declare const FrontBuffer: () => void;
declare const GetColor: () => void;
declare const Grafis: (width?: number, height?: number, gl?: boolean, pixel?: boolean) => void;
declare const GraphicsBuffer: () => void;
declare const Garis: (x1: number, y1: number, x2: number, y2: number) => void;
declare const Origin: () => void;
declare const Oval: () => void;
declare const Kotak: (x1: number, y1: number, x2: number, y2: number) => void;
declare const SetBuffer: (buffer: IGambar) => void;
declare const WritePixel: () => void;
declare const ReadPixel: () => void;
declare const Plot: () => void;
/** BLITZ-SPRITE.TS */
declare const BuatSprite: (gbr: IGambar, dragable?: boolean) => ISprite;
declare const MuatSprite: (url: string, dragable?: boolean) => Promise<ISprite>;
declare const PosisiSprite: (sprite: ISprite, x?: number, y?: number) => void;
declare const PosisiPolarSprite: (sprite: ISprite, sudut: number, jarak: number, x2: number, y2: number) => void;
declare const PosisiJarakSprite: () => void;
declare const TaruhSprite: (sprite: ISprite, frame?: number) => void;
declare const TaruhSemuaSprite: () => void;
declare const PosisiXSprite: (spr: ISprite, x?: number) => number;
declare const PosisiYSprite: (spr: ISprite, y?: number) => number;
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
        get dragable(): boolean;
        set dragable(value: boolean);
        static buat(image: IGambar, dragable?: boolean): ISprite;
        static inputDown(pos: any): void;
        static inputMove(pos: any): void;
        static inputUp(): void;
        static gambar(sprite: ISprite): void;
        static positionOrbitSprite(sprite: ISprite, sudut: number, jarak: number, x2: number, y2: number): void;
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
