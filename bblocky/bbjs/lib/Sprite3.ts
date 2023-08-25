namespace ha.bbjs {
    export class SpriteOp {

        static CopySprite = (n: number): number => {
            let spr: ha.bbjs.Sprite = ha.be.Sprite.Copy(List.AmbilSprite(n) as ha.be.Sprite);
            return List.TambahSprite(spr);
        }

    }
}