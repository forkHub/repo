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

    }
}