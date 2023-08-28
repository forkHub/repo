namespace ha.bbjs {
    export class SpriteAdv {
        static SpriteBuffer = (n: number): CanvasRenderingContext2D => {
            return SpriteKontek(List.AmbilSprite(n) as ha.be.Sprite)
        }

        static CopySprite = (n: number): number => {
            let spr: ha.bbjs.Sprite = ha.be.Sprite.Copy(List.AmbilSprite(n) as ha.be.Sprite);
            return List.TambahSprite(spr);
        }

        static TileSprite = Ubin;
        static SpritesCollide = Tabrakan;

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