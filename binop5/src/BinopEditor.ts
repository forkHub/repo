class BinopEditor {
	private static readonly template: string = `
        <div class='binop padding-4'>
            <div class='padding border wspace-nowrap'>
                <div class='exp1 border padding disp-inline-block'>
                </div>
                <div class='opr border padding disp-inline-block'>
                </div>
                <div class='exp2 border padding disp-inline-block'>
                </div>
            </div>
        </div>
    `;
	private static _view: HTMLElement;
	private static exp1El: HTMLElement;
	private static exp2El: HTMLElement;
	private static op: HTMLElement;

	private static _binopExp1Value: string;
	public static get binopExp1Value(): string {
		return BinopEditor._binopExp1Value;
	}
	public static set binopExp1Value(value: string) {
		BinopEditor._binopExp1Value = value;
	}
	private static _binopExp1Tipe: string;   //ref
	public static get binopExp1Tipe(): string {
		return BinopEditor._binopExp1Tipe;
	}
	public static set binopExp1Tipe(value: string) {
		BinopEditor._binopExp1Tipe = value;
	}
	private static _binopExp2Value: string;
	public static get binopExp2Value(): string {
		return BinopEditor._binopExp2Value;
	}
	public static set binopExp2Value(value: string) {
		BinopEditor._binopExp2Value = value;
	}
	private static _binopExp2Tipe: string;   //ref
	public static get binopExp2Tipe(): string {
		return BinopEditor._binopExp2Tipe;
	}
	public static set binopExp2Tipe(value: string) {
		BinopEditor._binopExp2Tipe = value;
	}

	private static get view(): HTMLElement {
		if (!this._view) {
			this._view = ha.comp.Util.build(this.template);
		}

		return this._view;
	}

	private static init(): void {
		if (!this.exp1El) {
			this.exp1El = ha.comp.Util.getEl('div.exp1', this.view);
			this.exp1El.onclick = (e: MouseEvent) => {
				e.stopPropagation();

				if (expForm.tipeArg == ARG_VALUE) {
					this.exp2El.innerText = expForm.value;
					this.binopExp1Value = expForm.value;
					this.binopExp1Tipe = expForm.tipeArg;

					// this.binop.exp1 = expForm.value;
					// this.binop.exp1Tipe = ARG_VALUE;
				}
				else if (expForm.tipeArg == ARG_REF) {
					this.exp2El.innerText = Variable.getVar(parseInt(expForm.ref)).nama;
					this.binopExp2Value = expForm.ref;
					this.binopExp2Tipe = expForm.tipeArg;
				}
				else {
					throw Error('');
				}
			}
		}

		if (!this.exp2El) {
			this.exp2El = ha.comp.Util.getEl('div.exp2', this.view);
			this.exp2El.onclick = (e: MouseEvent) => {
				e.stopPropagation();

				expForm.attach(document.body);
				expForm.selesai = () => {
					if (expForm.tipeArg == ARG_VALUE) {
						this.exp2El.innerText = expForm.value;
						this.binopExp2Value = expForm.value;
						this.binopExp2Tipe = ARG_VALUE;
					}
					else if (expForm.tipeArg == ARG_REF) {
						this.exp2El.innerText = Variable.getVar(parseInt(expForm.ref)).nama;
						this.binopExp2Value = expForm.ref;
						this.binopExp2Tipe = ARG_REF;
					}
					else {
						throw Error('');
					}
				}
			}
		}

		if (!this.op) {
			this.op = ha.comp.Util.getEl('div.opr', this.view);
			this.op.onclick = (e: MouseEvent) => {
				e.stopPropagation();
				//TODO:
				console.log('pilih op klik')
			}
		}
	}

	static attacth(p: HTMLElement): void {
		this.init();
		p.appendChild(this.view);
	}
}