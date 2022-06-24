namespace ha.binop {
	class Binop {
		private opr1: HTMLInputElement = ha.comp.Util.getEl('binop form input.opr1') as HTMLInputElement;
		private opr2: HTMLInputElement = ha.comp.Util.getEl('binop form input.opr2') as HTMLInputElement;
		private opr: HTMLInputElement = ha.comp.Util.getEl('binop form input.opr') as HTMLInputElement;
		private tblUpdate: HTMLButtonElement = ha.comp.Util.getEl('binop menu button.update') as HTMLButtonElement;
		private elAktif: string = 'opr1';

		init(): void {
			this.opr1.onclick = () => {
				console.log('opr1 on click');
				this.elAktif = 'opr1';
			}

			this.opr2.onclick = () => {
				console.log('opr2 click');
				this.elAktif = 'opr2';
			}

			this.opr.onclick = () => {
				console.log('opr click');
				this.elAktif = 'opr';
			}

			this.tblUpdate.onclick = () => {
				if (this.elAktif == 'opr1') {
					let value: string = window.prompt("value");
					binopObj.opr1.value = value;
					this.opr1.value = value;
				}
				else if (this.elAktif == 'opr') {
					let value: string = window.prompt("value");
					binopObj.opr = value;
					this.opr.value = value;
				}
				else if (this.elAktif == 'opr2') {
					let value: string = window.prompt("value");
					binopObj.opr2.value = value;
					this.opr2.value = value;
				}
				else {
					console.log('tidak ada element dipilih');
				}
			}
		}
	}

	export var binop: Binop = new Binop();
}

//
interface IBinop {
	opr1: IOperand
	opr2: IOperand
	opr: string
}

interface IOperand {
	value: string
	type: string
}

//global var
let binopObj: IBinop = {
	opr1: {
		value: "",
		type: "literal"
	},
	opr: "==",
	opr2: {
		value: "",
		type: "literal"
	}
}

window.onload = () => {
	ha.binop.binop.init();
}