declare namespace ha.blitz {
    class General {
        static Graphics: (width?: number, height?: number, canvas?: HTMLCanvasElement, fullScreen?: boolean, handleInput?: boolean) => void;
        static SetBuffer: (context?: CanvasRenderingContext2D) => void;
        static GetColor: (x?: number, y?: number) => void;
        static ColorRed: () => number;
        static ColorGreen: () => number;
        static ColorBlue: typeof be.Main.Biru;
        static WritePixel: typeof be.Image.SetPiksel;
        static GraphicsBuffer: typeof be.Main.Kontek;
        static Color: typeof be.Main.Warna;
        static Cls: typeof be.Main.Bersih;
        static Plot: typeof be.Image.SetPiksel;
        static Line: typeof be.Main.Garis;
        static Rect: typeof be.Main.Kotak;
    }
}
declare namespace ha.blitz {
    class Id {
        private static _id;
        static getId(): number;
    }
}
declare namespace ha.blitz {
    class Sprite {
        static LoadSprite: (url: string, dragable?: boolean, mode?: number) => void;
        static getDragMode(n: number): number;
        static setDragMode(n: number, mode: number): void;
        static CopySprite: typeof be.Sprite.Copy;
        static LoadAnimSprite: typeof be.Sprite.MuatAnimasi;
        static SpriteBuffer: typeof be.Sprite.kontek;
        static DrawSprite: typeof be.Sprite.Gambar;
        static TileSprite: typeof be.Sprite.Ubin;
        static HandleSprite: typeof be.Sprite.Handle;
        static ResizeSprite: typeof be.Sprite.Ukuran;
        static RotateSprite: typeof be.Sprite.Rotasi;
        static SpriteWidth: typeof be.Sprite.Panjang;
        static SpriteHeight: typeof be.Sprite.Lebar;
        static SpritesOverlap: typeof be.Sprite.Tabrakan;
        static SpritesCollide: typeof be.Sprite.Tabrakan;
        static RectsOverlap: typeof be.Sprite.Tabrakan;
        static SpriteRectOverlap: typeof be.Sprite.Tabrakan;
        static SpriteRectCollide: typeof be.Sprite.Tabrakan;
    }
}
declare namespace ha.blitz {
    class List {
        private static readonly list;
        static Tambah(obj: any): any;
        static Ambil(id: number): any;
        static AmbilSprite(id: number): ha.be.Sprite;
    }
}
