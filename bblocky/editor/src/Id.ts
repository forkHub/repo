namespace ha.blockly {
    export class Id {
        private static _id: number = Date.now();
        private static prefix: string = (Math.floor(Math.random() * 8000) + 1000) + '';

        static get id(): string {
            this._id++;
            return this.prefix + this._id + '';
        }
    }
}