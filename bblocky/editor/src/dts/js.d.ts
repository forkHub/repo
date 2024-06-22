/**
 * JS Wrapper for blockly
 */
declare namespace ha.js {
    class List {
        static push(l: any[], v: any): void;
        static pop(l: any[]): any;
    }
    class Grid {
        static create(w: number, h: number): any[][];
        static setV(g: any[][], x: number, y: number, v: any): void;
        static getV(g: any[][], x: number, y: number): any;
    }
}
