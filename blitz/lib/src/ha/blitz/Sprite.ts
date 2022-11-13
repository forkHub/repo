/** SPRITE.TS */
namespace ha_blitz {
    export class Sprite implements ISprite {
        static readonly daftar: ISprite[] = [];

        private _buffer: IGambar;
        private _x: number = 0;
        private _y: number = 0;
        private _dragged: boolean = false;
        private _down: boolean = false;
        private _hit: number = 0;
        private _dragStartY: number = 0;
        private _dragStartX: number = 0;
        private _dragable: boolean = false;

        constructor(buffer: IGambar, dragable: boolean = false) {
            this.buffer = buffer;
            this.dragable = dragable;
        }

        public get dragable(): boolean {
            return this._dragable;
        }
        public set dragable(value: boolean) {
            this._dragable = value;
        }

        static buat(image: IGambar, dragable: boolean = false): ISprite {
            let hasil: ISprite;

            hasil = new Sprite(image, dragable);
            this.daftar.push(hasil);

            console.log('buat sprite');

            return hasil;
        }

        static inputDown(pos: any): void {
            ha_blitz.Sprite.daftar.forEach((item: ISprite) => {
                item.down = false;
            });

            //sprite down
            for (let i: number = ha_blitz.Sprite.daftar.length - 1; i >= 0; i--) {
                let item: ISprite;

                item = ha_blitz.Sprite.daftar[i];

                if (DotDidalamGambar(item.buffer, item.x, item.y, pos.x, pos.y)) {
                    item.down = true;
                    item.dragStartX = pos.x - item.x;
                    item.dragStartY = pos.y - item.y
                    return;
                }
            }
        }

        static inputMove(pos: any): void {
            ha_blitz.Sprite.daftar.forEach((item: ISprite) => {

                if (item.down && item.dragable) {
                    item.dragged = true;
                    item.x = pos.x - item.dragStartX
                    item.y = pos.y - item.dragStartY
                }
            });
        }

        static inputUp(): void {
            ha_blitz.Sprite.daftar.forEach((item: ISprite) => {
                if (item.down) {
                    item.hit++;
                }

                item.down = false;
                item.dragged = false;
            });
        }

        static gambar(sprite: ISprite): void {
            TaruhGambar(sprite.buffer, sprite.x, sprite.y);
        }

        static positionOrbitSprite(sprite: ISprite, sudut: number, jarak: number, x2: number, y2: number): void {
            let p: IPoint2D = ha.Point.posPolar(jarak, sudut, x2, y2);
            sprite.x = p.x;
            sprite.y = p.y;
        }

        public get dragStartX(): number {
            return this._dragStartX;
        }
        public set dragStartX(value: number) {
            this._dragStartX = value;
        }
        public get dragStartY(): number {
            return this._dragStartY;
        }
        public set dragStartY(value: number) {
            this._dragStartY = value;
        }

        public get dragged(): boolean {
            return this._dragged;
        }
        public set dragged(value: boolean) {
            this._dragged = value;
        }
        public get buffer(): IGambar {
            return this._buffer;
        }
        public set buffer(value: IGambar) {
            this._buffer = value;
        }
        public get x(): number {
            return this._x;
        }
        public set x(value: number) {
            this._x = value;
        }
        public get y(): number {
            return this._y;
        }
        public set y(value: number) {
            this._y = value;
        }

        public get hit(): number {
            return this._hit;
        }
        public set hit(value: number) {
            this._hit = value;
        }
        public get down(): boolean {
            return this._down;
        }
        public set down(value: boolean) {
            this._down = value;
        }


    }


}

interface ISprite {
    buffer: IGambar,
    x: number,
    y: number,
    dragable: boolean
    dragged: boolean
    down: boolean
    hit: number
    dragStartX: number
    dragStartY: number
}