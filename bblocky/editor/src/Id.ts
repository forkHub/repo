namespace ha.blockly {
    export class Id {
        private static _id: number = Date.now();
        static get id(): number {
            this._id++;
            return this._id;
        }
    }
}