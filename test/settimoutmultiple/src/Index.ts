class Timeout {
    private fung: { (): void }[] = []
    private jln: boolean = false;

    tambah(f: () => void) {
        this.fung.push(f);
        this.jalan();
    }

    private jalan(): void {

        if (!this.jln) {
            this.jln = true;
            let f2: () => void = this.fung.shift();

            if (f2) {
                setTimeout(() => {
                    f2();
                    this.jalan();
                }, 0);
            }
            else {
                this.jln = false;
            }
        }
    }

}

let tm: Timeout = new Timeout();

