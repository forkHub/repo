///<reference path="../../ha/comp/BaseComponent.ts"/>

class BinopEd extends ha.comp.BaseComponent {
	private binop: IBinop;
	private menu: ha.comp.MenuPopup;

	constructor(binop: IBinop) {
		super();
		this._template = `
			<div class='binop padding-4'>
				<div class='disp-table'>

					<div class='exp1-cont disp-cell padding-kanan'>
						
					</div>

					<div class='opr disp-cell padding-kanan'>
						+
					</div>

					<div class='exp2-cont disp-cell'>
						
					</div>
				</div>
			</div>`;
		this.build();
		this.binop = binop;

		this.menu = new ha.comp.MenuPopup();

		this.setExp(this.exp1Div, this.binop.exp1Id);
		this.setExp(this.exp2Div, this.binop.exp2Id);
		this.setupMenu();
	}

	setupMenu(): void {
		this.menu.buatTombol({
			label: 'hapus',
			f: () => {
				Binop.hapus(this.binop.id);
				this.destroy();
			}
		});

		this._elHtml.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			this.menu.view.attach(document.body);
		}
	}

	setExp(cont: HTMLElement, id: number): void {
		let exp: IExp = Exp.get(id);
		let expEd: ExpEd2 = new ExpEd2(exp);

		expEd.attach(cont);
	}

	get exp1Div(): HTMLElement {
		return this.getEl('div.exp1-cont');
	}

	get exp2Div(): HTMLElement {
		return this.getEl('div.exp2-cont');
	}

	// get opr(): HTMLSelectElement {
	// 	return this.getEl('select.opr') as HTMLSelectElement;
	// }

}
// const binopEd: BinopEditorFragment = new BinopEditorFragment();