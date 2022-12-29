declare const CELL_IDX: number;
declare const CELL_X: number;
declare const CELL_Y: number;
declare const CELL_BUKA: number;
declare const CELL_PARENT_IDX: number;
declare const CELL_JARAK: number;
declare let _cells: Array<Array<number>>;
declare let _callMax: number;
declare let _peta: Array<string>;
declare function pfTelusur(cell: Array<number>, res: Array<Array<Number>>): void;
declare function pfBuatCell(parent: Array<number>, i: number, j: number, targetX: number, targetY: number): Array<number>;
declare function pfRes2Array(res: Array<Array<number>>): Array<any>;
declare function pfCariJalan(sx: number, sy: number, tx: number, ty: number): Array<any>;
declare function pfCheckSampaiTujuan(i: number, j: number, tx: number, ty: number): Boolean;
declare function pfCariCellTerbuka(): Array<number>;
declare function pfBukaCell(cellCr: Array<number>, tx: number, ty: number): void;
declare function pfCariJalan2(sx: number, sy: number, tx: number, ty: number): Array<Array<number>>;
declare function pfCheckCellAda(ix: number, jx: number): boolean;
declare function pfBisaJalan(x: number, y: number): boolean;
declare function pfPosBisa(ix: number, jx: number): Boolean;
declare let peta: Array<string>;
declare function mulai(): void;
declare function initPeta(): void;
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
