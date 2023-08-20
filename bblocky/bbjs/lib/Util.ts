namespace ha.bbjs {
    export class Util {
        static checkParam(p: any[]): boolean {
            for (let i = 0; i < p.length; i++) {
                let item = p[i];
                if (item == undefined) return false;
            }

            return true;
        }
    }
}