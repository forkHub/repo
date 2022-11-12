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
declare const FlushKeys: () => void;
declare const GetKey: () => string;
declare const KeyIsDown: (key?: string) => boolean;
declare const KeyHit: (key?: string) => number;
declare const WaitKey: (kode?: string) => Promise<void>;
declare const GetMouse: () => number;
declare const MouseHit: (button?: number) => number;
declare const MouseDown: (key: string) => boolean;
declare const WaitMouse: () => void;
declare const MouseX: () => number;
declare const MouseY: () => number;
declare const MouseZ: () => number;
declare const FlushMouse: () => void;
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
declare const Delay: (m?: number) => Promise<void>;
declare const FPS: (n: number) => void;
declare const Dim: (...args: any[]) => any[];
declare const Millisecs: () => number;
