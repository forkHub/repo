class ProgressBar {
    static strEl = `
		<div class='progress-bar'>
			<div class='counter'>
			</div>
		</div>
	`;
    _el;
    get el() {
        return this._el;
    }
    progressEl;
    constructor() {
        this._el = ha.comp.Util.createEl(ProgressBar.strEl);
        this.progressEl = this._el.querySelector('div.counter');
    }
    progress(n) {
        this.progressEl.style.width = `${n}%`;
        console.log('progress ' + n);
    }
}
