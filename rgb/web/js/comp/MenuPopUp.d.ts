declare namespace ha.comp {
    export class MenuPopup {
        private view;
        constructor();
        tampil(tombol: ITombol[]): void;
        buatClass(label: string): string;
        buatTombol(t: ITombol): void;
    }
    interface ITombol {
        label: string;
        f: Function;
    }
    export {};
}
