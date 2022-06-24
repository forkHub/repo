class PilihVariableItem extends ha.comp.BaseComponent {
	private _finish: () => void;
	public get finish(): () => void {
		return this._finish;
	}
	public set finish(value: () => void) {
		this._finish = value;
	}

	constructor(arg: IArg, variable: IVar) {
		super();
		this._template = `
			<div class='item-var'>
				<span class='nama'></span>
			</div>
		`;
		this.build();

		this.nama.innerText = variable.nama;

		// this.item = item;

		this._elHtml.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			console.log('pilih variable: ');
			console.log(variable);

			arg.value = variable.id + '';
			this._finish();
		}
	}

	get nama(): HTMLSpanElement {
		return this.getEl('span.nama') as HTMLSpanElement;
	}
}

class PilihVariableView extends ha.comp.BaseComponent {
	constructor() {
		super();
		this._template = `
			<div class='pilih variable'>
				<div class='judul'>Pilih Variable</div>
				<div class='daftar'>
				</div>
				<div>
					<button class='batal'>batal</button>
				</div>
			</div>
		`;
		this.build();
	}

	get daftar(): HTMLDivElement {
		return this.getEl('div.daftar') as HTMLDivElement;
	}

	get batalTbl(): HTMLButtonElement {
		return this.getEl('button.batal') as HTMLButtonElement;
	}

	get judul(): HTMLDivElement {
		return this.getEl('div.judul') as HTMLDivElement;
	}
}

/**
 * pilih variable untuk diberikan ke argument
 */
class PilihVariable {
	readonly view: PilihVariableView = new PilihVariableView();
	private _finish: () => void;
	public get finish(): () => void {
		return this._finish;
	}
	public set finish(value: () => void) {
		this._finish = value;
	}

	constructor() {

	}

	tampil(arg: IArg): void {
		// this.arg = arg;

		data.variableAr.forEach((item: IVar) => {
			let view: PilihVariableItem;
			view = new PilihVariableItem(arg, item);
			view.finish = () => {
				this._finish();
			}
			view.attach(this.view.daftar);
			this.view.attach(document.body);
		});
	}
}
const pilihVariable: PilihVariable = new PilihVariable();