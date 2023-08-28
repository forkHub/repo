// Print
// Write
// Locate
// Text

// LoadFont
// SetFont
// FreeFont
// FontWidth
// FontHeight
// StringWidth
// StringHeight

namespace ha.bbjs {
    export class Text {
        static Text(x: number = 0, y: number = 0, teks: string = "Hello"): void {
            let ctx = ha.be.Main.Kontek();
            if (konf.useStroke) {
                ctx.strokeText(teks, x, y);
            }
            else {
                ctx.fillText(teks, x, y);
            }
        }
    }
}