/** SPRITE.TS */
namespace ha_blitz {
    export class Sprite implements ISprite {
        static readonly daftar: ISprite[] = [];

        private _buffer: IBuffer;
        private _x: number = 0;
        private _y: number = 0;
        private _dragged: boolean = false;
        private _down: boolean = false;
        private _hit: number = 0;
        private _dragStartY: number = 0;
        private _dragStartX: number = 0;
        private _dragable: boolean = false;

        constructor(buffer: IBuffer, dragable: boolean = false) {
            this.buffer = buffer;
            this.dragable = dragable;
        }

        public get dragable(): boolean {
            return this._dragable;
        }
        public set dragable(value: boolean) {
            this._dragable = value;
        }

        static buat(image: IBuffer, dragable: boolean = false): ISprite {
            let hasil: ISprite;

            hasil = new Sprite(image, dragable);
            this.daftar.push(hasil);

            console.log('buat sprite');

            return hasil;
        }

        static gambar(sprite: ISprite): void {
            DrawImage(sprite.buffer, sprite.x, sprite.y);
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
        public get buffer(): IBuffer {
            return this._buffer;
        }
        public set buffer(value: IBuffer) {
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

    export interface ISprite {
        buffer: IBuffer,
        x: number,
        y: number,
        dragable: boolean
        dragged: boolean
        down: boolean
        hit: number
        dragStartX: number
        dragStartY: number
    }
}