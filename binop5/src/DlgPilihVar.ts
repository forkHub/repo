///<reference path="./comp/BaseComponent.ts"/>
class PilihVariableItem extends ha.comp.BaseComponent {
	private _finish: () => void;
	public get finish(): () => void {
		return this._finish;
	}
	public set finish(value: () => void) {
		this._finish = value;
	}

	constructor(variable: IVar) {
		super();
		this._template = `
			<div class='item-var padding-4'>
				<div class='border padding'>
					<span class='nama disp-inline-block'></span>
				</div>
			</div>
		`;
		this.build();

		this.nama.innerText = variable.nama;

		this._elHtml.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			console.log('klik variable item: ');

			this.destroy();
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
			<div class='pilih variable padding pos-abs top-0 left-0 back-color-white'>
				<div class="padding border">
					<div class="padding border">
						<div class='judul'>Pilih Variable</div>
					</div>
					<div class='padding-4'></div>
					<div class="padding border">
						<div class='daftar'>

						</div>
					</div>
					<div class='padding'>
						<button class='batal'>batal</button>
					</div>
				</div>
			</div>
		`;
		this.build();

		this.batalTbl.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			this.detach();
		}
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

//TODO: bisa dibuat static
class DlgPilihVariable {
	readonly view: PilihVariableView = new PilihVariableView();
	private _finish: () => void;
	private _varDipilih: number;

	public get varDipilih(): number {
		return this._varDipilih;
	}
	public set varDipilih(value: number) {
		this._varDipilih = value;
	}

	public get finish(): () => void {
		return this._finish;
	}
	public set finish(value: () => void) {
		this._finish = value;
	}

	tampil(): void {

		while (this.view.daftar.firstChild) {
			this.view.daftar.removeChild(this.view.daftar.firstChild);
		}

		Variable.daftar.forEach((item: IVar) => {
			let view: PilihVariableItem;
			view = new PilihVariableItem(item);
			view.finish = () => {
				console.log('variable dipilih ' + item.id);
				this._varDipilih = item.id;
				this.view.detach();
				this._finish();
			}

			view.attach(this.view.daftar);
		});

		this.view.attach(document.body);
		this.view.batalTbl.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			this.view.detach();
		}

	}
}
const dlgPilihVariable: DlgPilihVariable = new DlgPilihVariable();