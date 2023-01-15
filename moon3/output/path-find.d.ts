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
        get dist(): number;
        set dist(value: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get idx(): number;
        set idx(value: number);
        get open(): Boolean;
        set open(value: Boolean);
        get parent(): PFCell;
        set parent(value: PFCell);
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
        get cellWidth(): number;
        set cellWidth(value: number);
        get cellHeight(): number;
        set cellHeight(value: number);
        get langkahTotal(): number;
        set langkahTotal(value: number);
        get pos(): Point;
        set pos(value: Point);
        get sedangJalan(): Boolean;
        get arah(): number;
        set arah(value: number);
        get updateArahCallBack(): Function;
        set updateArahCallBack(value: Function);
    }
}
declare namespace fg {
    class PathFinder {
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
        set checkSampai(value: Function);
    }
}
declare namespace fg {
    class Point {
        x: number;
        y: number;
        constructor(i?: number, j?: number);
    }
}
