namespace ha.bbjs {
    export const konf = {
        useStroke: false
    }

    export class Konf {
        static useStroke(b: boolean = false) {
            konf.useStroke = b;
        }
    }
}