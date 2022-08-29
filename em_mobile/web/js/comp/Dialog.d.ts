declare namespace ha.comp {
    class Dialog extends BaseComponent {
        constructor();
        init(): void;
        tampil(pesan?: string, def?: boolean): void;
        get okTbl(): HTMLButtonElement;
        get p(): HTMLParagraphElement;
    }
    export var dialog: Dialog;
    export {};
}
