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
    class Sprite {
        static LoadSprite: (url: string, mode?: number) => number;
        static getDragMode(n: number): number;
        static setDragMode(n: number, mode: number): void;
        static CopySprite: (n: number) => number;
        static LoadAnimSprite: (url: string, frameWidth?: number, frameHeight?: number) => number;
        static SpriteBuffer: (n: number) => CanvasRenderingContext2D;
        static DrawSprite: (n: number, x?: number, y?: number, frame?: number) => void;
        static TileSprite: typeof be.Sprite.Ubin;
        static HandleSprite: typeof be.Sprite.Handle;
        static ResizeSprite: typeof be.Sprite.Ukuran;
        static RotateSprite: typeof be.Sprite.Rotasi;
        static SpriteWidth: typeof be.Sprite.Panjang;
        static SpriteHeight: typeof be.Sprite.Lebar;
        static SpritesCollide: typeof be.Sprite.Tabrakan;
    }
}
/**
 * posisi jarak
 * posisi orbit
 * posisi mendekat
 * posisi menjauh
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
 *
 */ 
declare namespace ha.bbjs {
    class List {
        private static readonly list;
        static TambahSprite(obj: any): number;
        static Ambil(id: number): any;
        static AmbilSprite(id: number): ha.be.Sprite;
    }
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
