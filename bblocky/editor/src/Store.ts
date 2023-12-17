namespace ha.blockly {
    export class Store {
        // private static _namaProject: string = '';
        private static _idFile: string = '';
        private static _projectId: string = '';
        private static _defWSpace: string = '';

        public static get defWSpace(): string {
            return Store._defWSpace;
        }
        public static set defWSpace(value: string) {
            Store._defWSpace = value;
        }

        public static get projectId(): string {
            return Store._projectId;
        }
        public static set projectId(value: string) {
            Store._projectId = value;
        }

        public static get idFile(): string {
            return Store._idFile;
        }
        public static set idFile(value: string) {
            Store._idFile = value;
        }

        // public static get namaProject(): string {
        //     return Store._namaProject;
        // }
        // public static set namaProject(value: string) {
        //     Store._namaProject = value;
        // }
    }

    Store.defWSpace = "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"TKi]Pbe|YLS%b}yYe+1L\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Oxp^k?rAe(XG%z7DGmrI\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"iR^9X(~I02#.l.kt.[;:\",\"fields\":{\"NUM\":120}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Sn*[t/Kt[]3J~cg5t9-K\",\"fields\":{\"NUM\":100}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":187,\"y\":160,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"P=3%M?Ud(^qXZB;*oeeA\",\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}";
}