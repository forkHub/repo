namespace ha.blockly {
    export class Store {
        // private static _namaProject: string = '';
        private static _idFile: string = '';
        private static _projectId: string = '';

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
}