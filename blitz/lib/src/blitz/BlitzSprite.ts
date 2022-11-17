///<reference path="../ha/blitz/Sprite.ts"/>

/** BLITZ-SPRITE.TS */
const Buat = ha_blitz.Sprite.buat;
const Muat = ha_blitz.Sprite.muat;
const Posisi = ha_blitz.Sprite.posisi;
const Ukuran = ha_blitz.Sprite.ukuranGambar;
const HandleTengah = ha_blitz.Sprite.handleTengah;
const PosisiPolar = ha_blitz.Sprite.posisiPolar;
const Gambar = ha_blitz.Sprite.gambar;
const GambarSemua = ha_blitz.Sprite.gambarSemua;
const PosisiX = (spr: ISprite, x: number | null | undefined = null): number => {
	if (typeof (x) == 'number') {
		spr.x = x;
	}

	return spr.x;
}
const PosisiY = (spr: ISprite, y: number | null | undefined = null): number => {
	if (typeof (y) == 'number') {
		spr.y = y;
	}

	return spr.y;
}

const PosisiJarakSprite = () => { }
