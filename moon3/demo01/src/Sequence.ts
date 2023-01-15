class Sequence {
    readonly frames: number[] = [];

    private _frameIdx: number = 0;
    public get frameIdx(): number {
        return this._frameIdx;
    }
    public set frameIdx(value: number) {
        this._frameIdx = value;
    }

    private _aktif: boolean = false;
    public get aktif(): boolean {
        return this._aktif;
    }
    public set aktif(value: boolean) {
        this._aktif = value;
    }

    private _finish: () => void;
    public get finish(): () => void {
        return this._finish;
    }
    public set finish(value: () => void) {
        this._finish = value;
    }

    update(): void {
        if (this.aktif) {
            this.frameIdx++;
            if (this.frameIdx >= this.frames.length - 1) {
                this.frameIdx = this.frames.length - 1;
                if (this.finish) {
                    this.finish();
                }
            }
        }
    }

}