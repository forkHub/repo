class ProgressBar {
	private static readonly strEl: string = `
		<div class='progress-bar'>
			<div class='counter'>
			</div>
		</div>
	`;
	private _el: HTMLElement;
	public get el(): HTMLElement {
		return this._el;
	}

	private progressEl: HTMLElement;

	constructor() {
		this._el = ha.comp.Util.createEl(ProgressBar.strEl);
		this.progressEl = this._el.querySelector('div.counter');
	}

	progress(n: number): void {
		this.progressEl.style.width = `${n}%`;
		console.log('progress ' + n);
	}



}