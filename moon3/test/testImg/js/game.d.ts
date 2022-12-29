/// <reference path="easel.d.ts" />
declare var Data: any;
declare namespace fg {
    class Game {
        private stage;
        private y;
        constructor();
        loadImg(): void;
        initStage(): void;
        update(evt: createjs.TickerEvent): void;
    }
}
declare namespace fg {
    class MainChar {
        static readonly BERDIRI: number;
        static readonly JALAN: number;
        private pf;
        private pfHelper;
        private ruteJalan;
        private _pos;
        private _map;
        private _view;
        private animation;
        private state;
        constructor();
        initAnim(): void;
        initPathFinder(): void;
        updateAnim(): void;
        jalanKePos(i: number, j: number): void;
        updateView(): void;
        update(): void;
        pos: fg.Point;
        view: createjs.Container;
        map: Map;
    }
}
declare namespace fg {
    class Map {
        private _map;
        getCellValue(i: number, j: number): number;
        isPassable(x: number, y: number): boolean;
        readonly width: number;
        readonly height: number;
    }
}
declare namespace fg {
    class PFCell {
        protected _dist: number;
        protected _parent: PFCell;
        protected _x: number;
        protected _y: number;
        protected _idx: number;
        protected _open: Boolean;
        PFCell(): void;
        destroy(): void;
        toStringRef(): String;
        dist: number;
        x: number;
        y: number;
        idx: number;
        open: Boolean;
        parent: PFCell;
    }
}
declare namespace fg {
    class PFHelper {
        static readonly ATAS: number;
        static readonly KANAN: number;
        static readonly BAWAH: number;
        static readonly KIRI: number;
        static readonly KANAN_ATAS: number;
        static readonly KANAN_BAWAH: number;
        static readonly KIRI_ATAS: number;
        static readonly KIRI_BAWAH: number;
        private ruteJalan;
        private _cellWidth;
        private _cellHeight;
        private _langkahTotal;
        private _langkahIdx;
        private jalanIdx;
        private _pos;
        private posTemp;
        private _arah;
        private _updateArahCallBack;
        private _sedangJalan;
        constructor();
        reset(): void;
        start(data: Array<any>): void;
        updateArah(): void;
        updatePos(): void;
        gantiCell(): boolean;
        update(): void;
        cellWidth: number;
        cellHeight: number;
        langkahTotal: number;
        pos: Point;
        readonly sedangJalan: Boolean;
        arah: number;
        updateArahCallBack: Function;
    }
}
declare namespace fg {
    class PathFinder {
        /**
         * aksi yang diambil saat jalan terblock
         * 1. berhenti
         * 2. cari posisi terdekat dan ganti target ke posisi tersebut
         */
        static readonly BL_STOPPED: number;
        static readonly BL_TERDEKAT: number;
        private _cells;
        private _maxCells;
        private _checkCanMoveToPos;
        private _checkSampai;
        private _flBlocked;
        private _flDiagonal;
        constructor();
        getCellTerdekatKeTarget(tx: number, ty: number): fg.PFCell;
        buildPath(cell: PFCell, res: Array<PFCell>): void;
        cellCreate(parent: PFCell, i: number, j: number, targetX: number, targetY: number): PFCell;
        resToArray(res: Array<PFCell>): Array<any>;
        find(sx: number, sy: number, tx: number, ty: number): Array<any>;
        private checkSampaiTujuan;
        getOpenCell(): PFCell;
        cellOpen(cellCr: PFCell, tx: number, ty: number): void;
        getPath(sx: number, sy: number, tx: number, ty: number): Array<PFCell>;
        cellExistsAtPos(ix: number, jx: number): boolean;
        cellPosPossible(ix: number, jx: number): boolean;
        checkCanMoveToPos: Function;
        maxCells: number;
        flBlocked: number;
        flDiagonal: boolean;
        checkSampai: Function;
    }
}
declare namespace fg {
    class Point {
        x: number;
        y: number;
        constructor(i?: number, j?: number);
    }
}
