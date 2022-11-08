/** BLITZ-SPRITE.TS */
const CreateSprite = (image: IBuffer, dragable = false): ha.blitz.ISprite => {
    return ha.blitz.Sprite.buat(image, dragable);
}

const DrawSprite = (sprite: ha.blitz.ISprite, frame: number = 0) => {
    DrawImage(sprite.buffer, sprite.x, sprite.y, frame)
}

