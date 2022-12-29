/// <reference path="easel.d.ts" />
declare var Data: any;
declare namespace fg {
    class Game {
        private stage;
        private mainChar;
        private _map;
        constructor();
        initStage(): void;
        stageOnClick(evt: createjs.MouseEvent): void;
        update(evt: createjs.TickerEvent): void;
        drawWall(): void;
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
        isPassable(x: number, y: number): Boolean;
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
    class PathFinder {
        _cells: Array<fg.PFCell>;
        _maxCells: number;
        _checkCanMoveToPos: Function;
        constructor();
        getCellTerdekatKeTarget(cells: Array<PFCell>, tx: number, ty: number): fg.PFCell;
        buildPath(cell: PFCell, res: Array<PFCell>): void;
        cellCreate(parent: PFCell, i: number, j: number, targetX: number, targetY: number): PFCell;
        resToArray(res: Array<PFCell>): Array<any>;
        find(sx: number, sy: number, tx: number, ty: number): Array<any>;
        checkSampaiTujuan(i: number, j: number, tx: number, ty: number): Boolean;
        getOpenCell(): PFCell;
        cellOpen(cellCr: PFCell, tx: number, ty: number): void;
        getPath(sx: number, sy: number, tx: number, ty: number): Array<PFCell>;
        cellExistsAtPos(ix: number, jx: number, cells: Array<PFCell>): boolean;
        cellPosPossible(ix: number, jx: number, cells: Array<PFCell>): Boolean;
        checkCanMoveToPos: Function;
        maxCells: number;
    }
}
declare namespace fg {
    class PFHelper {
        static readonly ATAS: number;
        static readonly KANAN: number;
        static readonly BAWAH: number;
        static readonly KIRI: number;
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
    class Point {
        x: number;
        y: number;
        constructor(i?: number, j?: number);
    }
}
