namespace ha.modul {
    class IdGen {
        private id: number = 0;

        buatId(): number {
            this.id++;
            return this.id;
        }
    }

    export var idGen = new IdGen();
}