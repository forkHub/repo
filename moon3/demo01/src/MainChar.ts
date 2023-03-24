///<reference path="../dts/PathFinder.d.ts"/>

import { PathFinder } from "../dts/PathFinder";

//@ts-ignore Import module

const pf: PathFinder = await import("https://forkhub.github.io/js/pf/PathFinder.js");

export class MainChar {

    static readonly BERDIRI: number = 1;
    static readonly JALAN: number = 2;

    readonly pf: PathFinder = new pf();
    readonly pfHelper: PFHelper = new fg.PFHelper();
    readonly pos: fg.Point = new fg.Point();



    private ruteJalan: Array<any> = [];

    private _map: Map = new fg.Map();
    public get map(): Map {
        return this._map;
    }
    public set map(value: Map) {
        this._map = value;
    }

    readonly view: ISprite = MuatAnimasi('./gbr/jln.png', 32, 32);

    private state: number = 1;

    constructor() {
        this.initPathFinder();
        this.pf.
    }

    initPathFinder() {
        this.pf.flBlocked = PathFinder.BL_TERDEKAT;
        this.pfHelper.langkahTotal = 10;
        // this.pfHelper.

        this.pf.checkCanMoveToPos = (x: number, y: number): boolean => {
            return this.map.isPassable(x, y);
        }

        this.pf.checkSampai = (i: number, j: number, tx: number, ty: number): boolean => {
            var jrkX: number;
            var jrkY: number;

            jrkX = Math.abs(tx - i);
            jrkY = Math.abs(ty - j);

            if (jrkX == 0) {
                if (jrkY <= 1) {

                    return true;
                }
            }

            if (jrkY == 0) {
                if (jrkX <= 1) {
                    return true;
                }
            }

            return false;
        }
    }

    jalanKePos(i: number, j: number): void {
        if (!this.pfHelper.sedangJalan) {
            this.ruteJalan = this.pf.cari(Math.floor(this.pos.x / 32), Math.floor(this.pos.y / 32), i, j);
            if (this.ruteJalan.length > 0) {
                this.pfHelper.start(this.ruteJalan);
                // this.updateAnim();
                this.state = MainChar.JALAN;
            }
        }
    }

    updateView(): void {
        this.view.x = this.pos.x;
        this.view.y = this.pos.y;
    }

    update(): void {
        if (this.state == MainChar.BERDIRI) {
            //kosong
        }
        else {
            this.pfHelper.update();
            this.pos.x = this.pfHelper.pos.x;
            this.pos.y = this.pfHelper.pos.y;

            if (!this.pfHelper.sedangJalan) {
                this.state = MainChar.BERDIRI;
            }
        }

        this.updateView();
    }

}
}
