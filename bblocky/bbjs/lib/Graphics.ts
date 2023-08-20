namespace ha.bbjs {
    export class General {
        static Graphics = (width: number = 240, height: number = 320, canvas: HTMLCanvasElement = null, fullScreen: boolean = true, handleInput: boolean = true): void => {
            Grafis(width, height, canvas, fullScreen, handleInput);
        };

        static SetBuffer = Kontek
        static GetColor = AmbilPiksel
        static ColorRed = Merah
        static ColorGreen = Hijau
        static ColorBlue = Biru;
        static WritePixel = SetPiksel;
        static GraphicsBuffer = Kontek;
        static Color = Warna;
        static Cls = Bersih;
        static Plot = SetPiksel;
        static Line = Garis;
        static Rect = Kotak;

        static Update() {
            //TODO: next update all sprite based on its state, moving, animation, etc
        }
    }
}
