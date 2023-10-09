declare namespace ha.bbjs {
    class Debug {
        static Obj(n: number): void;
        static Stop(): void;
        static Play(): void;
    }
}
declare namespace ha.bbjs {
    class General {
        static Graphics: (width?: number, height?: number, canvas?: HTMLCanvasElement, fullScreen?: boolean, handleInput?: boolean) => void;
        static SetBuffer: typeof be.Main.Kontek;
        static GetColor: typeof be.Image.AmbilPiksel;
        static ColorRed: typeof be.Main.Merah;
        static ColorGreen: typeof be.Main.Hijau;
        static ColorBlue: typeof be.Main.Biru;
        static WritePixel: typeof be.Image.SetPiksel;
        static GraphicsBuffer: typeof be.Main.Kontek;
        static Color: typeof be.Main.Warna;
        static Cls: typeof be.Main.Bersih;
        static Plot: typeof be.Image.SetPiksel;
        static Line: typeof be.Main.Garis;
        static Rect: typeof be.Main.Kotak;
        static Update(): void;
    }
}
declare namespace ha.bbjs {
    class Id {
        private static _id;
        static getId(): number;
    }
}
declare namespace ha.bbjs {
    const konf: {
        useStroke: boolean;
    };
    class Konf {
        static useStroke(b?: boolean): void;
    }
}
declare namespace ha.bbjs {
    type Obj = {
        id: number;
        obj: any;
        type: string;
    };
    export class List {
        static readonly list: Obj[];
        static TambahSprite(obj: any): number;
        static Ambil(id: number): any;
        static AmbilSprite(id: number): ha.be.Sprite;
    }
    export {};
}
declare namespace ha.bbjs {
    class ProsessObj {
        private _state;
        get state(): number;
        set state(value: number);
        private _mulai;
        get mulai(): () => void;
        set mulai(value: () => void);
        private _proses;
        get proses(): () => void;
        set proses(value: () => void);
        private _selesai;
        get selesai(): () => void;
        set selesai(value: () => void);
    }
    class Proses {
        static readonly daftar: ProsessObj[];
        static create(): ProsessObj;
        static update(): void;
    }
}
declare namespace ha.bbjs {
    class Sprite {
        static LoadSprite: (url: string, mode?: number) => number;
        static getDragMode(n: number): number;
        static setDragMode(n: number, mode: number): void;
        static LoadAnimSprite: (url: string, frameWidth?: number, frameHeight?: number) => number;
        static DrawSprite: (n: number, x?: number, y?: number, frame?: number) => void;
        static DrawAllSprite(): void;
        static Position: (n: number, x: number, y: number) => void;
        static GetPositionX: (n: number) => number;
        static GetPositionY: (n: number) => number;
        static Handle: (n: number, x: number, y: number) => void;
        static GetRotation: (n: number) => number;
        static RotateSprite: (n: number, rot: number) => void;
        static ResizeSprite: (n: number, w: number, h: number) => void;
        static SpriteWidth: (n: number) => number;
        static SpriteHeight: (n: number) => number;
    }
}
declare namespace ha.bbjs {
    class SpriteAdv {
        static SpriteBuffer: (n: number) => CanvasRenderingContext2D;
        static CopySprite: (n: number) => number;
        static TileSprite: typeof be.Sprite.Ubin;
        static SpritesCollide: typeof be.Sprite.Tabrakan;
    }
}
/**
 * posisi xy => set [sprite] position [x] [y]
 * posisi jarak => dari posisi, dari sprite
 * posisi orbit
 * posisi mendekat
 * posisi menjauh
 * get posisi
 */ 
declare namespace ha.bbjs {
    class SpriteMovAdv {
    }
}
/**
 * posisi xy => set [sprite] position [x] [y]
 *
 * posisi jarak => dari posisi, dari sprite
 * posisi orbit
 * posisi mendekat
 * posisi menjauh
 * get posisi
 *
 * sudut mendekat
 * sudut menjauh
 * sudut literal
 * sudut putar n derajat
 *
 * gerak maju
 * gerak mundur
 * gerak kiri
 * gerak kanan
 * gerak sudut => putar relative, maju, putar relative balik
 *
 */
declare namespace ha.bbjs {
    class Text {
        static Text(x?: number, y?: number, teks?: string): void;
    }
}
interface ISprite2 extends ISprite {
    tween: number;
    parent: number;
    tile: boolean;
}
declare namespace ha.bbjs {
    class Util {
        static checkParam(p: any[]): boolean;
    }
}
