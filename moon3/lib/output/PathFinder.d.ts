export declare class PathFinder {
    /**
     * aksi yang diambil saat jalan terblock
     * 1. berhenti
     * 2. cari posisi terdekat dan ganti target ke posisi tersebut
     */
    static readonly BL_STOP: number;
    static readonly BL_TERDEKAT: number;
    private _cells;
    private _maxCells;
    private _checkCanMoveToPos;
    private _checkSampai;
    private _flBlocked;
    private _flDiagonal;
    constructor();
    private getCellTerdekatKeTarget;
    private buildPath;
    private cellCreate;
    private resToArray;
    cari(sx: number, sy: number, tx: number, ty: number): Array<any>;
    private checkSampaiTujuan;
    private getOpenCell;
    private cellOpen;
    private getPath;
    private cellExistsAtPos;
    private cellPosPossible;
    set checkCanMoveToPos(f: Function);
    get maxCells(): number;
    set maxCells(value: number);
    set flBlocked(value: number);
    get flDiagonal(): boolean;
    set flDiagonal(value: boolean);
    set checkSampai(value: (charX: number, charY: number, tx: number, ty: number) => boolean);
}
