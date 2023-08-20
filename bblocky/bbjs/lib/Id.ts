namespace ha.bbjs {
    export class Id {
        private static _id = Date.now();

        static getId(): number {
            Id._id++;
            return Id._id;
        }
    }
}