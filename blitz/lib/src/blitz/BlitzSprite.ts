/** BLITZ-SPRITE.TS */
const CreateSprite = (image: IBuffer, dragable = false): ha_blitz.ISprite => {
    return ha_blitz.Sprite.buat(image, dragable);
}

const PositionSprite = (sprite: ha_blitz.ISprite, x: number = 0, y: number = 0) => {
    sprite.x = x;
    sprite.y = y;
}

const PositionPolarSprite = () => { }
const PositionDistSprite = () => { }

const DrawSprite = (sprite: ha_blitz.ISprite, frame: number = 0) => {
    DrawImage(sprite.buffer, sprite.x, sprite.y, frame);
}

const DrawAllSprite = () => {
    ha_blitz.Sprite.daftar.forEach((item: ha_blitz.ISprite) => {
        DrawSprite(item);
    });
}

