namespace ha.be {

    export class Mat {

        /**
         * Menghitung sudut dari posisi relative ke posisi 0,0
         * @param x posisi x
         * @param y posisi y
         * @returns sudut relative ke posisi 0,0
         */
        static Sudut(x: number, y: number): number {
            return Transform.sudut(x, y);
        }

        static Pi(): number { return Math.PI }
        static Int(n: string): number { return parseInt(n) }
        static Float(n: string): number { return parseFloat(n) }
        static Floor(n: number): number { return Math.floor(n) }
        static Ceil(n: number): number { return Math.ceil(n) }
        static Sgn(n: number): number {
            if (n > 0) return 1;
            if (n < 0) return -1;
            return 0;
        }
        static Abs(n: number): number { return Math.abs(n) };
        static Mod(a: number, b: number) { return a % b }
        static Sqr(n: number) { return Math.sqrt(n) }
        static Sin(n: number) { return Math.sin(n * Math.PI / 180) }
        static Cos(n: number) { return Math.cos(n * Math.PI / 180) }
        static Tan(n: number) { return Math.tan(n * Math.PI / 180) }

        // ASin
        // ACos
        // ATan
        // ATan2

        // Exp
        // Log
        // Log10

        // Xor
        // Shl
        // Shr
        // Sar

        // Rnd
        // Rand
        // SeedRnd
        // RndSeed
    }
}


