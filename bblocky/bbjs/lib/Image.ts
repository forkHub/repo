namespace ha.bbjs {
    export class Sprite {

        //load biasa
        //load dragable
        //load rotasi
        static LoadSprite = (url: string, mode: number = 0): number => {
            let spr = Muat(url);
            let n = List.TambahSprite(spr);
            this.setDragMode(n, mode);

            return n;
        }

        static getDragMode(n: number) {
            let spr = List.Ambil(n) as ha.be.Sprite;
            return spr.tipeDrag
        }

        static setDragMode(n: number, mode: number) {
            let spr = List.Ambil(n) as ha.be.Sprite;
            if (0 == mode) {
                spr.dragable = false;
                spr.tipeDrag = 0;
            }
            else {
                spr.tipeDrag = mode;
                spr.dragable = true;
            }


        }

        static CopySprite = (n: number): number => {
            let spr: ISprite = Copy(List.AmbilSprite(n));
            return List.TambahSprite(spr);
        }

        static LoadAnimSprite = (url: string, frameWidth = 32, frameHeight = 32): number => {
            let spr = MuatAnimasi(url, frameWidth, frameHeight, false, 0);
            return List.TambahSprite(spr);
        }

        static SpriteBuffer = (n: number): CanvasRenderingContext2D => {
            return SpriteKontek(List.AmbilSprite(n))
        }

        /*
         * DrawSprite(n)
         * DrawSprite(n, frame)
         * DrawSprite(n, x, y)
         */
        static DrawSprite = (n: number, x?: number, y?: number, frame?: number) => {
            let spr = List.AmbilSprite(n);

            //n,x,y
            if (Util.checkParam([n, x, y])) {
                Posisi(spr, x, y);
            }

            //n, frame
            if (Util.checkParam([n, x])) {
                frame = 0;
            }

            Gambar(List.AmbilSprite(n), frame);
        }

        static TileSprite = Ubin;
        static HandleSprite = Handle;
        static ResizeSprite = Ukuran;
        static RotateSprite = Rotasi;
        static SpriteWidth = Panjang;
        static SpriteHeight = Lebar;
        static SpritesCollide = Tabrakan;

        // static SpritesOverlap = Tabrakan;
        // static RectsOverlap = Tabrakan
        // static SpriteRectOverlap = Tabrakan;
        // static SpriteRectCollide = Tabrakan;
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