namespace fg {
    export class Assert {
        static assertTrue(b: boolean, msg?: string): void {
            if (!b) {
                throw new Error(msg);
            }
            else {
                console.log("assert true");
            }
        }
    }
}