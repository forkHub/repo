namespace ha.geom {

    export class BoundObj implements IBound {
        private _v1: IPoint2D = Point.buat();
        private _v2: IPoint2D = Point.buat();

        public get v1(): IPoint2D {
            return this._v1;
        }
        public set v1(value: IPoint2D) {
            this._v1 = value;
        }
        public get v2(): IPoint2D {
            return this._v2;
        }
        public set v2(value: IPoint2D) {
            this._v2 = value;
        }

    }

    export class Bound {

        static create() {

        }

        static render(ctx: CanvasRenderingContext2D, b: BoundObj) {
            ctx.beginPath();
            ctx.moveTo(b.v1.x, b.v1.y);
            ctx.rect(b.v1.x, b.v1.y, b.v2.x - b.v1.x, b.v2.y - b.v1.y);
            ctx.stroke();
        }

        static copy(b: BoundObj, b2: BoundObj) {
            b2.v1.x = b.v1.x;
            b2.v1.y = b.v2.y;
            b2.v2.x = b.v2.x;
            b2.v2.y = b.v2.y;
        }

        static clone(b: BoundObj): BoundObj {
            let h = new BoundObj();

            h.v1 = Point.clone(b.v1);
            h.v2 = Point.clone(b.v2)

            return h;
        }
    }

}