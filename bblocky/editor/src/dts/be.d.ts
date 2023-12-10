/**
 *  @namespace ha
 */
/**
 *  @namespace be
 *  @memberof ha
 */
declare namespace ha.be {
    /**
     * @memberof ha.be
     */
    class Be {
        private static _canvasAr;
        private static _canvasAktif;
        private static _skalaOtomatis;
        private static _merah;
        private static _hijau;
        private static _biru;
        private static _transparan;
        private static warnaBackup;
        /**
         * Handle saat window di resize
         * @private
         */
        private static windowResize;
        /**
         * mengeset/mengembalikan Kontek yang sedang aktif
         *
         * @param ctx (CanvasRenderingContext2D) | null
         * @returns CanvasRenderingContext2D
         */
        static Kontek(ctx?: CanvasRenderingContext2D): CanvasRenderingContext2D;
        static buatCanvas(canvasEl: HTMLCanvasElement): IGambar;
        static init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void;
        static backupWarna(): void;
        static restoreWarna(): void;
        /**
         *
         * @param merah {angka} warna merah, optional default = 0
         * @param hijau
         * @param biru
         * @param transparan
         */
        static Bersih(merah?: number, hijau?: number, biru?: number, transparan?: number): void;
        static Warna(r?: number, g?: number, b?: number, a?: number): void;
        private static updateStyleWarna;
        /**
         * Mengembalikan warna merah dari perintah AmbilPixel terakhir
         * @returns (number) warna merah
         */
        static Hijau(): number;
        static Merah(): number;
        /**
         * Mengembalikan warna biru dari perintah AmbilPixel terakhir
         * @returns (number) warna biru
         */
        static Biru(): number;
        /**
         *
         * @returns
         */
        static Transparan(): number;
        /**
         *
         * @returns
         */
        static Kanvas(): HTMLCanvasElement;
        static Grafis(panjang?: number, lebar?: number, canvas?: HTMLCanvasElement, fullScreen?: boolean, input?: boolean): void;
        /**
         * @private
         * helper method
         * */
        private static Grafis2;
        /**
         *
         * @param x1
         * @param y1
         * @param x2
         * @param y2
         */
        static Garis(x1: number, y1: number, x2: number, y2: number): void;
        /**
         *
         * @param x1
         * @param y1
         * @param x2
         * @param y2
         * @param isi
         * @param garis
         * @param rotasi
         */
        static Kotak(x1: number, y1: number, x2: number, y2: number, isi?: boolean, garis?: boolean, rotasi?: number): void;
        /**
         * Menggambar Oval
         * @param x posisi x
         * @param y posisi y
         * @param radius radius
         * @param skalaX skala horizontal
         * @param skalaY skala vertikal
         * @param rotasi sudut oval
         */
        static Oval(x: number, y: number, radius: number, skalaX?: number, skalaY?: number, rotasi?: number): void;
        static get canvasAktif(): IGambar;
        static set canvasAktif(value: IGambar);
        static get canvasAr(): IGambar[];
        static set canvasAr(value: IGambar[]);
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
declare namespace ha.be {
    class Image {
        static buatBagiCanvas(canvas: HTMLCanvasElement, w?: number, h?: number, frameW?: number, frameH?: number): IGambar;
        static panjang(gbr: IGambar, pj?: number): number;
        static lebar(gbr: IGambar, lb?: number): number;
        static tabrakan(gbr1: IGambar, x1: number, y1: number, gbr2: IGambar, x2: number, y2: number): boolean;
        static dotDidalamGambar(gbr1: IGambar, x1: number, y1: number, x2: number, y2: number): boolean;
        static muatAnimAsync(url: string, fw: number, fh: number): IGambar;
        static muatAnimAsyncCanvas(url: string, fw: number, fh: number, canvas: HTMLCanvasElement): IGambar;
        static muatAsync(url: string, onload: () => void): IGambar;
        static muatAsyncKanvas(url: string, canvas: HTMLCanvasElement, onload: () => void): IGambar;
        static gambarUbin(gbr: IGambar, x?: number, y?: number, frame?: number): void;
        /**
         * mengambil pixel di layar
         * @param x posisi x
         * @param y posisi y
         * @returns (Uint8ClampedArray)
         */
        static AmbilPiksel(x?: number, y?: number): number[];
        /**
         *
         * @param x
         * @param y
         */
        static SetPiksel(x?: number, y?: number): void;
        static gambar(gbr: IGambar, x?: number, y?: number, frame?: number): void;
        /**
         * Ubah Ukuran Gambar
         * @param gbr
         * @param w
         * @param h
         */
        static ukuran(gbr: IGambar, w?: number, h?: number): void;
        static resetRect(img: IGambar): void;
        static rectToImageTransform(image: IGambar, x: number, y: number): void;
    }
}
declare namespace ha.be {
    class Sprite implements ISprite {
        static readonly daftar: ISprite[];
        private static _ctrDraw;
        static get ctrDraw(): number;
        static set ctrDraw(value: number);
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
        private _tipeDrag;
        private _sudutTekanAwal;
        private _sudutAwal;
        private _inputId;
        get inputId(): number;
        set inputId(value: number);
        constructor(buffer: IGambar, dragable?: boolean);
        /**
         *
         * @param spr
         * @returns
         */
        static kontek(spr: ISprite): CanvasRenderingContext2D;
        /**
         *
         * @param sprS {ISprite} sprite
         * @param onload {() => void} optional, fungsi yang dipanggil sprite selesai dimuat
         * @returns
         */
        static Copy(sprS: ISprite, onload?: () => void): ISprite;
        /**
         *
         * @param spr
         * @returns
         */
        static Dimuat(spr: ISprite): boolean;
        /**
         *
         * @param spr
         * @returns
         */
        static StatusDrag(spr: ISprite): boolean;
        /**
         *
         * @param spr
         * @param pj
         * @returns
         */
        static Panjang(spr: ISprite, pj?: number): number;
        /**
         *
         * @param spr
         * @param lb
         * @returns
         */
        static Lebar(spr: ISprite, lb?: number): number;
        /**
         *
         * @param spr
         * @param alpha
         * @returns
         */
        static Alpha(spr: ISprite, alpha?: number): number;
        /**
         *
         * @param spr
         * @param sudut
         * @returns
         */
        static Rotasi(spr: ISprite, sudut?: number): number;
        /**
         *
         * @param spr
         * @param x
         * @param y
         */
        static Posisi(spr: ISprite, x?: number, y?: number): void;
        /**
         *
         * @param spr
         * @param x
         * @returns
         */
        static PosisiX(spr: ISprite, x?: number | null | undefined): number;
        /**
         *
         * @param spr
         * @param y
         * @returns
         */
        static PosisiY(spr: ISprite, y?: number | null | undefined): number;
        /**
         *
         * @param spr
         * @returns
         */
        static Bound(spr: ISprite): IKotak;
        /**
         *
         * @param spr
         * @param x
         * @param y
         * @returns
         */
        static Handle(spr: ISprite, x?: number, y?: number): void;
        /**
         *
         */
        static GambarSemua(): void;
        /**
         *
         * @param spr
         * @param spr2
         * @returns
         */
        static Tabrakan(spr: ISprite, spr2: ISprite): boolean;
        private static muatAnimasiAsyncKanvas;
        /**
         *
         * @param url
         * @param pf
         * @param lf
         * @param bisaDiDrag
         * @param tipeDrag
         * @returns
         */
        static MuatAnimasi(url: string, pf: number, lf: number, bisaDiDrag?: boolean, tipeDrag?: number): ISprite;
        private static muatAsyncBerbagiKanvas;
        /**
         *
         * @param url
         * @param bisaDiDrag
         * @param tipeDrag
         * @returns
         */
        static MuatAsync(url: string, bisaDiDrag?: boolean, tipeDrag?: number): Promise<ISprite>;
        /**
         *
         * @param url (string) url gambar
         * @param bisaDiDrag
         * @param tipeDrag
         * @param onload
         * @returns
         */
        static Muat(url: string, bisaDiDrag?: boolean, tipeDrag?: number, onload?: () => void): ISprite;
        /**
         *
         * @param gbr
         * @param w
         * @param h
         */
        static Ukuran(gbr: ISprite, w: number, h: number): void;
        private static buatPrivate;
        /**
         * Menggambar sprite ke layar
         * @param sprite
         * @param frame
         */
        static Gambar(sprite: ISprite, frame?: number): void;
        /**
         *
         * @param sprite
         * @param x
         * @param y
         * @param frame
         * @returns
         */
        static GambarXY(sprite: ISprite, x: number, y: number, frame?: number): void;
        /**
         *
         * @param sprite
         * @param sudut
         * @param jarak
         * @param x2
         * @param y2
         * @param skalaX
         * @param skalaY
         */
        static posisiPolar(sprite: ISprite, sudut: number, jarak: number, x2: number, y2: number, skalaX?: number, skalaY?: number): void;
        /**
         *
         * @param spr
         * @param x
         * @param y
         * @param frame
         */
        static Ubin(spr: ISprite, x?: number, y?: number, frame?: number): void;
        /**
         *
         * @param spr
         * @returns
         */
        static StatusMuat(spr?: ISprite): boolean;
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
        get sudutAwal(): number;
        set sudutAwal(value: number);
        get sudutTekanAwal(): number;
        set sudutTekanAwal(value: number);
        get tipeDrag(): number;
        set tipeDrag(value: number);
        get url(): string;
        set url(value: string);
    }
}
declare enum EInput {
    TOUCH = "touch",
    MOUSE = "mouse",
    KEYB = "keyb",
    DEF = ""
}
declare namespace ha.be {
    class EventHandler {
        move(input: IInput, buffer: IGambar, e: PointerEvent): void;
        down(input: IInput, key: string, type: EInput, pos: IV2D): void;
        up(input: IInput): void;
        private checkTap;
    }
    export class Input {
        private static _inputs;
        private static _debug;
        static get debug(): boolean;
        static set debug(value: boolean);
        private static _inputGlobal;
        private static _event;
        constructor();
        /**
         * berapa kali tap terjadi sejak pemanggilan terakhir kali
         * @returns (number)
         */
        static JmlTap(): number;
        /**
         * berapa kali pointer diangkat  sejak pemanggilan terakhir kali
         * @returns (number)
         */
        static JmlUp(): number;
        /**
         * berapa jumlah drag selesai sejak pemanggilan terakhir kali
         * @returns
         */
        static JmlDragSelesai(): number;
        /**
         * (depecreated) type input dari event terkhir
         * @returns (EInput)
         */
        static InputType(): EInput;
        /**
         * berapa kali pointer di tekan sejak terakhir kali perintah dipanggil
         * @returns (number)
         */
        static InputHit(): number;
        /**
         * posisi x awal drag
         * @returns (number)
         *
         * */
        static InputXAwal(): number;
        /**
         * posisi y awal drag
         * @returns (number)
         */
        static InputYAwal(): number;
        /**
         * posisi x pointer
         * @returns (number)
         */
        static InputX(): number;
        /**
         * posisi y pointer
         * @returns
         */
        static InputY(): number;
        /**
         * berapa jauh pointer digeser sejajar sumbu x
         * @returns (number)
         */
        static GeserX(): number;
        /**
         * berapa jauh pointer di drag sejajar sumbu y
         * @returns (number)
         */
        static GeserY(): number;
        /**
         * menghapus data input
         */
        static FlushInput(): void;
        /**
         * berapa kali drag dimulai sejak pemanggilan terakhir
         *
         */
        static JmlDragMulai(): number;
        /**
         * mengecek apakah pointer sedang ditekan
         * @returns (boolean)
         */
        static Pencet(): boolean;
        /**
         * mengecheck apakah pointer sedang di drag
         * @returns (boolean)
         */
        static Geser(): boolean;
        private static getMouseKeyId;
        static init(buffer: IGambar): void;
        private static buatInputDefault;
        private static flush;
        private static flushByInput;
        private static getInput;
        private static baru;
        static pos: (cx: number, cy: number, buffer: IGambar) => {
            x: number;
            y: number;
        };
        static get inputs(): IInput[];
        static get event(): EventHandler;
        static get inputGlobal(): IInput;
    }
    export {};
}
declare namespace ha.be {
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
declare namespace ha.be {
    class Kotak {
        static buat(x1?: number, y1?: number, x2?: number, y2?: number): IKotak;
        private static copy;
        private static copyInfo;
        private static collideBound;
        static collide(r1: IKotak, r2: IKotak): boolean;
        private static collideDotBound;
        static collideDot(r: IKotak, x: number, y: number): boolean;
        static minX(r: IKotak): number;
        static maxX(r: IKotak): number;
        static minY(r: IKotak): number;
        static maxY(r: IKotak): number;
        static translate(rect: IKotak, x: number, y: number): void;
        static rotate(r: IKotak, deg: number, xc: number, yc: number, copy?: boolean): IKotak;
    }
}
declare namespace ha.be {
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
declare namespace ha.be {
    class Transform {
        static readonly RAD2DEG: number;
        static readonly DEG2RAD: number;
        private static _lastX;
        private static _lastY;
        static get lastX(): number;
        static get lastY(): number;
        static equal(n1: number, n2: number, toleransi?: number): boolean;
        private static quadDeg2;
        /**
         * Menghitung sudut dari posisi relative ke posisi 0,0
         * @param x posisi x
         * @param y posisi y
         * @returns sudut relative ke posisi 0,0
         */
        static sudut(x: number, y: number): number;
        private static normalizeDeg;
        static degDistMax(angleS: number, angleT: number): number;
        static degDistMin(angleS: number, angleT: number): number;
        static jarak(x: number, y: number, xt: number, yt: number): number;
        static rotateRel(x?: number, y?: number, xt?: number, yt?: number, deg?: number): void;
    }
}
declare namespace ha.be {
    class Teks {
        private static get ctx();
        /**
         *
         * @param font
         */
        static Font(font?: string): void;
        /**
         *
         * @param rata (string) "center" | "end" | "left" | "right" | "start"
         */
        static Rata(rata?: CanvasTextAlign): void;
        /**
         * menulis teks di kanvas
         * @param teks (string)
         * @param x (number)
         * @param y (number)
         * @param warna (boolean=true) apakah akan mengisi teks dengan warna
         * @param garis (boolean=false) apakah akan menggunakan outline
         */
        static Tulis(teks: string, x: number, y: number, warna?: boolean, garis?: boolean): void;
    }
}
declare namespace ha.be {
    /**
     * Handle interaksi sprite
     */
    class SpriteInteraksi {
        inputDown(pos: any, id: number): void;
        inputMove(pos: any, pointerId: number): void;
        inputUp(): void;
    }
    export const sprInteraksi: SpriteInteraksi;
    export {};
}
declare namespace ha.be {
    class Cache {
        private files;
        getGbr(url: string): HTMLImageElement;
        setFile(url: string, img: HTMLImageElement): void;
    }
    export const cache: Cache;
    export {};
}
declare namespace ha.be {
    class Mat {
        /**
         * Menghitung sudut dari posisi relative ke posisi 0,0
         * @param x posisi x
         * @param y posisi y
         * @returns sudut relative ke posisi 0,0
         */
        static Sudut(x: number, y: number): number;
    }
}
/**
 * INTERFACE
*/
interface IKotak {
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
    type: EInput;
    timerStart: number;
    timerEnd: number;
    id: number;
    dragJml: number;
    dragSelesaiJml: number;
    tapJml: number;
    upJml: number;
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
    rect: IKotak;
    load: boolean;
    ctrIdx: number;
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
