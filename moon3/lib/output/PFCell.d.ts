export declare class PFCell {
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
