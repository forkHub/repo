///<reference path="./comp/BaseComponent.ts"/>

/**
 * Form untuk edit exp property
 */
class ExpForm extends ha.comp.BaseComponent {
	readonly terima: string[] = [];
	private _tipeArg: string;
	private _value: string;
	private _refVarId: number;
	private _binopId: number;
	private exp: IExp;
	// private binop

	public get binopId(): number {
		return this._binopId;
	}

	private _selesai: () => void;

	public set selesai(value: () => void) {
		this._selesai = value;
	}

	public get ref(): number {
		return this._refVarId;
	}

	public get value(): string {
		return this._value;
	}
	public set value(value: string) {
		this._value = value;
	}

	public get tipeArg(): string {
		return this._tipeArg;
	}
	public set tipeArg(value: string) {
		this._tipeArg = value;
	}

	constructor() {
		super();

		this._template = `
			<div class="edit-arg edit-exp pos-abs top-0 left-0 back-color-white padding-8">
				<form class='padding border'>
					<div>
						<div>Type exp:</div>
						<div class='padding'></div>
						<div class='lit-cont'>
							<div class='padding-4'>
								<input type="radio" name="tipe_arg" class="" value="${ARG_VALUE}" checked> <label>literal</label>&nbsp;<br />
							</div>
							<div class="padding-4">
								<input type="text" name="literal" class='padding' placeholder="0">
							</div>
						</div>

						<div class='var-cont'>
							<div class='padding-4'>
								<input type="radio" name="tipe_arg" class="" value="${ARG_REF_VAR}"> <label>ref var</label><br />
							</div>
							<div class="padding-4">
								<input type="text" name="ref" class='padding' placeholder="0">
								<button type='button' class="browse">browse</button>
							</div>
						</div>

						<div class='fung-cont'>
							<div class='padding-4'>
								<input type="radio" name="tipe_arg" class="" value="${ARG_REF_FUNGSI}"> <label>ref fungsi</label><br />
							</div>
							<div class="fung-fragment-cont">
							</div>
						</div>

						<div class='binop-cont'>
							<div class='padding-4'>
								<input type="radio" name="tipe_arg" class="" value="${ARG_BINOP}"> <label>binop</label><br />
							</div>
							<div class="binop-fragment-cont">
							</div>
						</div>

					</div>
					<div class='padding'></div>

					<div class=''>
						<button type="submit" class="ok">ok</button>
						<button type="button" class="batal">batal</button>
					</div>
				</form>		
			</div>
		`;

		this.build();

		this.form.onsubmit = (e: Event) => {
			e.preventDefault();
			e.stopPropagation();
			try {
				this._tipeArg = this.tipeInputHtml.value;

				if (this._tipeArg == ARG_VALUE) {
					this._value = this.literalHtml.value;
					this.exp.value = this.literalHtml.value;
					this.exp.tipeExp = ARG_VALUE;
				}
				else if (this._tipeArg == ARG_REF_VAR) {
					this.exp.varId = this._refVarId;
					this.exp.tipeExp = ARG_REF_VAR;
				}
				else if (this._tipeArg == ARG_REF_FUNGSI) {
					//TODO: ref fungsi 
				}
				else if (this._tipeArg == ARG_BINOP) {
					// console.log('binop')
				}
				else {
					throw Error('')
				}

				this.detach();

				//bersihkan object tidak dipakai

				console.group('form on submit:');
				console.log('tipe: ' + this._tipeArg);
				console.log('value: ' + this._value);
				console.log('input value: ' + this.literalHtml.value);
				console.groupEnd();

				this._selesai();
			}
			catch (e) {
				console.error(e);
			}

			return false;
		}

		//browse variable
		this.browseVarTbl.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			console.log('browse click');
			dlgPilihVariable.finish = () => {
				this._refVarId = dlgPilihVariable.varDipilih;
				this.refHtml.value = Variable.nama(dlgPilihVariable.varDipilih);

				console.log('pilih var finish: ' + dlgPilihVariable.varDipilih);
				console.log(this.literalHtml);
				console.log('value: ' + this.literalHtml.value);
				console.log('text: ' + this.literalHtml.innerText);
				console.log('this.value: ' + this._value);
				console.log('nama var: ' + Variable.nama(dlgPilihVariable.varDipilih));
			}
			dlgPilihVariable.tampil();
		}

		(this.getEl('button.batal') as HTMLButtonElement).onclick = (e: MouseEvent) => {
			e.stopPropagation();
			//TODO: hapus object gak dipakai
			this.detach();
		};

		binopEd.attach(this.getEl('div.binop-fragment-cont'));
	}


	tampil(f: () => void, p: HTMLElement, terima: string[], exp: IExp): void {
		this.exp = exp;

		while (this.terima.length > 0) {
			this.terima.pop();
		}

		this.litCont.style.display = 'none';
		this.varCont.style.display = 'none';
		this.fungsiCont.style.display = 'none';
		this.binopCont.style.display = 'none';

		terima.forEach((item: string) => {
			this.terima.push(item);
		});

		this.terima.forEach((item: string) => {
			if (ARG_VALUE == item) {
				this.litCont.style.display = 'block';
			}
			else if (ARG_BINOP == item) {
				this.binopCont.style.display = 'block';
			}
			else if (ARG_REF_FUNGSI == item) {
				this.fungsiCont.style.display = 'block';
			}
			else if (ARG_REF_VAR == item) {
				this.varCont.style.display = 'block';
			}
			else {
				throw Error('terima value error: ' + item);
			}
		})

		this._selesai = f;
		this.attach(p);
	}

	private get litCont(): HTMLElement {
		return this.getEl('div.lit-cont');
	}

	private get varCont(): HTMLElement {
		return this.getEl('div.var-cont');
	}

	private get fungsiCont(): HTMLElement {
		return this.getEl('div.fung-cont');
	}

	private get binopCont(): HTMLElement {
		return this.getEl('div.binop-cont');
	}

	private get form(): HTMLFormElement {
		return this.getEl('form') as HTMLFormElement;
	}

	private get tipeInputHtml(): HTMLInputElement {
		return this.getEl('input[name=tipe_arg]') as HTMLInputElement;
	}

	private get literalHtml(): HTMLInputElement {
		return this.getEl('input[name=literal]') as HTMLInputElement;
	}

	private get refHtml(): HTMLInputElement {
		return this.getEl('input.ref') as HTMLInputElement;
	}

	private get browseVarTbl(): HTMLButtonElement {
		return this.getEl('button.browse') as HTMLButtonElement;
	}

}