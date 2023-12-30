namespace ha.be {
    export class Id {
        private static _id: number = Date.now();

        static id(): string {
            Id._id++;
            return Id._id + '';
        }
    }
}