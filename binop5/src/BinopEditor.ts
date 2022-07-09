///<reference path="./comp/BaseComponent.ts"/>

class BinopEditorFragment extends ha.comp.BaseComponent {
	private _exp1: IExp;
	private _exp2: IExp;

	public get exp2(): IExp {
		return this._exp2;
	}
	public get exp1(): IExp {
		return this._exp1;
	}

	constructor() {
		super();
		this._template = `
			<div class='binop padding-4'>
				<div class='padding border'>
					<div class='wspace-nowrap'>
						<div class='exp1 border padding disp-inline-block'>
							
						</div>
						<div class='opr border padding disp-inline-block'>
							<select class='opr'>
								<option value='+'>+</option>
								<option value='-'>-</option>
								<option value='*'>*</option>
								<option value='/'>/</option>
							</select>
						</div>
						<div class='exp2 border padding disp-inline-block'>

						</div>
					</div>

				</div>

			</div>`;
		this.build();

		this.exp1Div.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			expForm.tampil(() => {
				this.exp1.tipeExp = expForm.tipeArg;
				if (ARG_VALUE == this.exp1.tipeExp) {
					this.exp1.value = expForm.value;
				}
				else if (ARG_BINOP == this.exp1.tipeExp) {
					this.exp1.binopId = expForm.binop;
				}
				else {
					//TODO:
				}
			}, document.body, [
				ARG_VALUE,
				ARG_REF_VAR
			]);
		}
	}

	get oprValue(): string {
		let value: string = (this.getEl('select.opr') as HTMLSelectElement).value;
		debugger;
		return value;
	}

	get okTbl(): HTMLButtonElement {
		return this.getEl('button.ok') as HTMLButtonElement;
	}

	get batalTbl(): HTMLButtonElement {
		return this.getEl('button.batal') as HTMLButtonElement;
	}

	get exp1Div(): HTMLElement {
		return this.getEl('div.exp1');
	}

	get exp2Div(): HTMLElement {
		return this.getEl('div.exp2');
	}

}
const binopEd: BinopEditorFragment = new BinopEditorFragment();