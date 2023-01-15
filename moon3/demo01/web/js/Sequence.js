class Sequence {
    frames = [];
    _frameIdx = 0;
    get frameIdx() {
        return this._frameIdx;
    }
    set frameIdx(value) {
        this._frameIdx = value;
    }
    _aktif = false;
    get aktif() {
        return this._aktif;
    }
    set aktif(value) {
        this._aktif = value;
    }
    _finish;
    get finish() {
        return this._finish;
    }
    set finish(value) {
        this._finish = value;
    }
    update() {
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
