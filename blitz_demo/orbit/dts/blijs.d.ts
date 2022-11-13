declare namespace ha_blijs {
    class Blijs {
        init(canvas: HTMLCanvasElement): void;
        loop: () => Promise<void>;
        repeat: () => void;
        windowResize: () => void;
    }
    export var blijs: Blijs;
    export {};
}
