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

        static LoadAnimSprite = (url: string, frameWidth = 32, frameHeight = 32): number => {
            let spr = MuatAnimasi(url, frameWidth, frameHeight, false, 0);
            return List.TambahSprite(spr);
        }

        /* 
         * INTERNAL
         * DrawSprite(n)
         * DrawSprite(n, frame)
         * DrawSprite(n, x, y)
         */
        static DrawSprite = (n: number, x?: number, y?: number, frame?: number) => {
            let spr = List.AmbilSprite(n);

            //n,x,y
            if (Util.checkParam([n, x, y])) {
                ha.be.Sprite.Posisi(spr as ha.be.Sprite, x, y);
            }

            //n, frame
            if (Util.checkParam([n, x])) {
                frame = 0;
            }

            ha.be.Sprite.Gambar(spr as ha.be.Sprite, frame);
        }

        static DrawAllSprite(): void {
            List.list.forEach((item, idx) => {
                if (item.type == 'sprite') {
                    Sprite.DrawSprite(idx)
                }
            })
        }

        static Position = (n: number, x: number, y: number) => {
            ha.be.Sprite.Posisi(List.AmbilSprite(n), x, y);
        }

        static GetPositionX = (n: number) => {
            return List.AmbilSprite(n).x;
        }

        static GetPositionY = (n: number) => {
            return List.AmbilSprite(n).y;
        }

        static Handle = (n: number, x: number, y: number) => {
            ha.be.Sprite.Handle(List.AmbilSprite(n), x, y);
        }

        static GetRotation = (n: number): number => {
            return ha.be.Sprite.Rotasi(List.AmbilSprite(n));
        }

        static RotateSprite = (n: number, rot: number) => {
            ha.be.Sprite.Rotasi(List.AmbilSprite(n), rot);
        }

        static ResizeSprite = (n: number, w: number, h: number) => {
            ha.be.Sprite.Ukuran(List.AmbilSprite(n), w, h);
        }

        static SpriteWidth = (n: number): number => {
            return ha.be.Sprite.Panjang(List.AmbilSprite(n));
        }//Panjang;

        // static SpriteHeight = Lebar;
        static SpriteHeight = (n: number): number => {
            return ha.be.Sprite.Lebar(List.AmbilSprite(n));
        }
    }
}

