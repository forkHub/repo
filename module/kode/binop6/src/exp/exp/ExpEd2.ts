///<reference path="../../ha/comp/BaseComponent.ts"/>

class ExpEd2 extends ha.comp.BaseComponent {
    private exp: IExp;
    private menu: ha.comp.MenuPopup;

    constructor(exp: IExp) {
        super();
        this._template = `
            <div class='exp border text-align-center user-select-none cursor-pointer'>
                
            </div>
        `;
        this.build();
        this.exp = exp;
        this._elHtml.style.minWidth = '36px';
        this._elHtml.style.minHeight = '36px';

        //TODO:
        //render rekursif bila exp tidak kosong

        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol(
            {
                label: 'value',
                f: () => {
                    this.tambahValue();
                },
            }
        );

        this.menu.buatTombol(
            {
                label: 'var',
                f: () => {
                    this.tambahVar();
                },
            }
        );

        this.menu.buatTombol(
            {
                label: 'binop',
                f: () => {
                    this.tambahBinop();
                },
            }
        );

        this._elHtml.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        }
    }

    renderRek(): void {
        if (this.exp.refId == 0) return;

        let ty: string;

        ty = dataObj.getType(this.exp.refId);

        if (TY_VALUE == ty) {
            let value: IValue;
            let valueEd: ValueEd;

            value = Value.get(this.exp.refId);
            valueEd = new ValueEd(value);
            valueEd.attach(this._elHtml);
        }
        else if (TY_BINOP == ty) {
            let binop: IBinop;
            let binopEd: BinopEd;

            binop = Binop.get(this.exp.refId);
            binopEd = new BinopEd(binop);

            binopEd.attach(this._elHtml);
        }
        else if (TY_PANGGIL_FUNGSI == ty) {

        }
        else if (TY_VAR_REF == ty) {
            let editVar: VarRefEd;
            let varRef: IVarRef;

            varRef = VarRef.get(this.exp.refId);
            editVar = new VarRefEd(varRef, true)
            editVar.attach(this._elHtml);
        }
        else {
            console.log('ty: ' + ty);
            throw Error();
        }

    }

    tambahBinop(): void {
        let binop: IBinop;
        let binopEd: BinopEd;

        binop = Binop.buatDef(0);
        binopEd = new BinopEd(binop);

        binopEd.attach(this._elHtml);
    }

    tambahVar(): void {
        let editVar: VarRefEd;
        let varRef: IVarRef;

        varRef = VarRef.buat(this.exp.id);
        editVar = new VarRefEd(varRef, true)
        editVar.attach(this._elHtml);
    }

    tambahValue(): void {
        let value: IValue = Value.buat(this.exp.id);
        let valueEd: ValueEd;

        this.exp.refId = value.id;
        valueEd = new ValueEd(value);
        valueEd.attach(this._elHtml);
    }

    //TODO: tambah panggil fungsi





}