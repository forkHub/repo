namespace ha.blockly {
    export class Id {
        private static _id: number = Date.now();
        static get id(): string {
            this._id++;
            return this._id + '';
        }
    }
}