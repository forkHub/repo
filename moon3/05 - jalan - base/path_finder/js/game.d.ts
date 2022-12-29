/// <reference path="easel.d.ts" />
declare namespace fg {
    class Game {
        private pf;
        private _map;
        private stage;
        private posAwal;
        private pathCont;
        private sedangJalan;
        private ruteJalan;
        private jalanIdx;
        constructor();
        initStage(): void;
        stageOnClick(evt: createjs.MouseEvent): void;
        update(evt: createjs.TickerEvent): void;
        initPathFinding(): void;
        initMap(): void;
        drawWall(): void;
        drawChar(): void;
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
