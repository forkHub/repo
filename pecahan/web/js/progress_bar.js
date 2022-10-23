class ProgressBar {
    constructor() {
        this._el = ha.comp.Util.createEl(ProgressBar.strEl);
        this.progressEl = this._el.querySelector('div.counter');
    }
    get el() {
        return this._el;
    }
    progress(n) {
        this.progressEl.style.width = `${n}%`;
        console.log('progress ' + n);
    }
}
ProgressBar.strEl = `
		<div class='progress-bar'>
			<div class='counter'>
			</div>
		</div>
	`;
