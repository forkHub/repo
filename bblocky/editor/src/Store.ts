namespace ha.blockly {
    export class Store {
        private static _idFile: string = '';
        private static _projectId: string = '';
        private static _defWSpace: string = '';
        private static _demo: any[] = [];
        private static _selectedId: string = '';
        private static _devMode: boolean = false;
        private static _tutMode: boolean = false;

        public static get tutMode(): boolean {
            return Store._tutMode;
        }
        public static set tutMode(value: boolean) {
            Store._tutMode = value;
        }

        public static get devMode(): boolean {
            return Store._devMode;
        }
        public static set devMode(value: boolean) {
            Store._devMode = value;
        }

        public static get selectedId(): string {
            return Store._selectedId;
        }
        public static set selectedId(value: string) {
            Store._selectedId = value;
        }

        public static get demo(): any[] {
            return Store._demo;
        }
        public static set demo(value: any[]) {
            Store._demo = value;
        }


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

    Store.defWSpace = "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"ha.be.Be.Start\",\"id\":\"ttDi6Y1piNqKi!GKH=;f\",\"x\":249,\"y\":198,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"!n`U},x?W~b8S2S9fc;-\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"(i=R@FswM^]Ps$?-8bzQ\",\"fields\":{\"NUM\":240}}},\"statementst\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}},{\"type\":\"ha.be.Be.Update\",\"id\":\"D!_p@;(TK|!Jb;q9U}?k\",\"x\":389,\"y\":333,\"inputs\":{\"statementst\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"TKi]Pbe|YLS%b}yYe+1L\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Oxp^k?rAe(XG%z7DGmrI\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"iR^9X(~I02#.l.kt.[;:\",\"fields\":{\"NUM\":120}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Sn*[t/Kt[]3J~cg5t9-K\",\"fields\":{\"NUM\":100}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"

}

