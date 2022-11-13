/** BLITZ-SPRITE.TS */
const BuatSprite = (gbr: IGambar, dragable = false): ISprite => {
    return ha_blitz.Sprite.buat(gbr, dragable);
}

const MuatSprite = async (url: string, dragable = false): Promise<ISprite> => {
    let img: IGambar = await MuatGambar(url);
    return BuatSprite(img, dragable);
}

const PosisiSprite = (sprite: ISprite, x: number = 0, y: number = 0) => {
    sprite.x = x;
    sprite.y = y;
}

const PosisiPolarSprite = (sprite: ISprite, sudut: number, jarak: number, x2: number, y2: number) => {
    ha_blitz.Sprite.positionOrbitSprite(sprite, sudut, jarak, x2, y2);
}

const PosisiJarakSprite = () => { }

const TaruhSprite = (sprite: ISprite, frame: number = 0) => {
    TaruhGambar(sprite.buffer, sprite.x, sprite.y, frame);
}

const TaruhSemuaSprite = () => {
    ha_blitz.Sprite.daftar.forEach((item: ISprite) => {
        TaruhSprite(item);
    });
}

const PosisiXSprite = (spr: ISprite, x: number | null | undefined): number => {
    if (typeof (x) == 'number') {
        spr.x = x;
    }

    return spr.x;
}

const PosisiYSprite = (spr: ISprite, y: number | null | undefined): number => {
    if (typeof (y) == 'number') {
        spr.y = y;
    }

    return spr.y;
}
