"use strict";
class Binop {
    static baru(id, indukId, exp1Id, exp2Id) {
        let obj = {
            id: id,
            indukId: indukId,
            ket: '',
            nama: '',
            type: TY_STMT,
            exp1Id: exp1Id,
            exp2Id: exp2Id
        };
        this.daftar.push(obj);
        return obj;
    }
}
Binop.daftar = [];
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class BaseComponent {
            constructor() {
                this._template = '';
                this._elHtml = document.createElement('div');
            }
            static buat(temp) {
                let view = new BaseComponent();
                view.build(temp);
                return view;
            }
            async loadTemplate(f) {
                let http = await comp.Util.Ajax('get', f, '');
                if (200 == http.status) {
                    return http.responseText;
                }
                else {
                    throw new Error(http.responseText);
                }
            }
            destroy() {
                this.detach();
                while (this._elHtml.firstChild) {
                    this._elHtml.removeChild(this._elHtml.firstChild);
                }
                this._elHtml = null;
            }
            attach(parent) {
                parent.appendChild(this._elHtml);
                this._parent = parent;
            }
            detach() {
                if (this._elHtml.parentElement) {
                    this._elHtml.parentElement.removeChild(this._elHtml);
                    return true;
                }
                return false;
            }
            getEl(query) {
                let el;
                el = this._elHtml.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(this._elHtml);
                    console.log(query);
                    throw new Error('query not found ');
                }
            }
            build(temp = '') {
                let div = document.createElement('div');
                let el;
                if (temp && temp != '') {
                    this._template = temp;
                }
                div.innerHTML = this._template;
                el = div.firstElementChild;
                this._elHtml = el;
                if (!this._elHtml) {
                    console.log(div);
                    console.log(this._template);
                    throw new Error('');
                }
            }
            getTemplate(query) {
                try {
                    let template = document.body.querySelector('template').content;
                    return template.querySelector(query).cloneNode(true);
                }
                catch (e) {
                    console.log('template:' + query);
                    throw Error(e);
                }
            }
            get elHtml() {
                return this._elHtml;
            }
        }
        comp.BaseComponent = BaseComponent;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
class BinopEditorFragment extends ha.comp.BaseComponent {
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
        this.exp1Div.onclick = (e) => {
            e.stopPropagation();
            let expForm = new ExpForm();
            expForm.tampil(() => {
                this.exp1.tipeExp = expForm.tipeArg;
                if (ARG_VALUE == this.exp1.tipeExp) {
                    this.exp1.value = expForm.value;
                }
                else if (ARG_BINOP == this.exp1.tipeExp) {
                    this.exp1.binopId = expForm.binopId;
                }
                else {
                }
            }, document.body, [
                ARG_VALUE,
                ARG_REF_VAR
            ], this.exp1);
        };
    }
    get exp2() {
        return this._exp2;
    }
    get exp1() {
        return this._exp1;
    }
    get oprValue() {
        let value = this.getEl('select.opr').value;
        debugger;
        return value;
    }
    get okTbl() {
        return this.getEl('button.ok');
    }
    get batalTbl() {
        return this.getEl('button.batal');
    }
    get exp1Div() {
        return this.getEl('div.exp1');
    }
    get exp2Div() {
        return this.getEl('div.exp2');
    }
}
const binopEd = new BinopEditorFragment();
class Data {
    static deleteVarIsi(id) {
        for (let i = 0; i < Stmt.daftar.length; i++) {
            if (Stmt.daftar[i].id == id) {
                Stmt.daftar.splice(i, 1);
                return;
            }
        }
    }
    static getArg(id) {
        let hasil;
        dataObj.argAr.forEach((item) => {
            if (item.id == id) {
                hasil = item;
            }
        });
        if (!hasil) {
            throw new Error('');
        }
        return hasil;
    }
    static buatArg(type, indukId) {
        let argObj;
        argObj = {
            id: Id.id,
            refParamId: 0,
            indukId: indukId,
            nama: '',
            type: TY_ARG,
            tipeArg: type,
            value: '0',
            ket: ''
        };
        if (type == ARG_REF_VAR) {
            argObj.value = '-1';
        }
        dataObj.argAr.push(argObj);
        dataObj.simpan();
        return argObj;
    }
}
class DataObj {
    constructor() {
        this.paramAr = [];
        this.argAr = [];
    }
    get halModul() {
        return this._halModul;
    }
    get halFungsi() {
        return this._halFungsi;
    }
    hapus() {
        window.localStorage.clear();
    }
    initHalaman() {
        this._halFungsi = new DekFungsiEditor();
        this._halModul = new HalModule();
    }
    simpan() {
        let str = '';
        let simpan;
        simpan = {
            var: Variable.daftar,
            dekFung: DekFungsi.daftar,
            modul: Modul.daftar,
            param: this.paramAr,
            stmt: Stmt.daftar,
            value: [],
            arg: this.argAr
        };
        str = JSON.stringify(simpan);
        window.localStorage.setItem('ha.binop', str);
    }
    load() {
        try {
            let str;
            str = window.localStorage.getItem('ha.binop');
            if (str) {
                let muatObj;
                muatObj = JSON.parse(str);
                if (!muatObj.stmt)
                    muatObj.stmt = [];
                Stmt.muat(muatObj);
                while (Variable.daftar.length > 0) {
                    Variable.daftar.pop();
                }
                while (DekFungsi.daftar.length > 0) {
                    DekFungsi.daftar.pop();
                }
                while (this.paramAr.length > 0) {
                    this.paramAr.pop();
                }
                while (this.argAr.length > 0) {
                    this.argAr.pop();
                }
                muatObj.var.forEach((item) => {
                    Variable.daftar.push({
                        id: item.id,
                        indukId: item.indukId,
                        nama: item.nama,
                        type: item.type,
                        nilai: item.nilai,
                        ket: item.ket
                    });
                });
                Modul.muat(muatObj);
                muatObj.dekFung.forEach((item) => {
                    DekFungsi.daftar.push({
                        id: item.id,
                        indukId: item.indukId,
                        nama: item.nama,
                        type: item.type,
                        stmtAr: item.stmtAr,
                        varAr: item.varAr,
                        ket: item.ket
                    });
                });
                muatObj.param.forEach((item) => {
                    this.paramAr.push({
                        id: item.id,
                        indukId: item.indukId,
                        nama: item.nama,
                        type: item.type,
                        prevIdx: item.prevIdx,
                        ket: item.ket
                    });
                });
                muatObj.arg.forEach((item) => {
                    this.argAr.push({
                        id: item.id,
                        indukId: item.indukId,
                        nama: item.nama,
                        type: item.type,
                        refParamId: item.refParamId,
                        tipeArg: item.tipeArg,
                        value: item.value,
                        ket: item.ket
                    });
                });
            }
            else {
            }
        }
        catch (e) {
            console.error(e);
        }
    }
}
let dataObj = new DataObj();
class DekFungsi {
    static buat(nama, indukId) {
        let hasil;
        hasil = {
            id: Id.id,
            indukId: indukId,
            nama: nama,
            type: TY_DEK_FUNGSI,
            stmtAr: [],
            varAr: [],
            ket: ''
        };
        this.daftar.push(hasil);
        dataObj.simpan();
        return hasil;
    }
    static get(id) {
        for (let i = 0; i < this.daftar.length; i++) {
            let item = this.daftar[i];
            if (item.id == id)
                return item;
        }
        throw Error('');
    }
    static terj(item) {
        let hasil = '';
        hasil += 'function ' + item.nama;
        hasil += "(";
        hasil += ") ";
        hasil += "{\n";
        item.varAr.forEach((id) => {
            hasil += Variable.terj(Variable.getVar(id)) + "\n";
        });
        item.stmtAr.forEach((id) => {
            let stmt;
            stmt = Stmt.get(id);
            if (stmt.stmtType == STMT_VAR_ISI) {
                hasil += VarIsi.terj(stmt);
                hasil += "\n";
            }
            else {
                throw Error();
            }
        });
        hasil += "}\n";
        return hasil;
    }
    static validasi(item) {
        let varAr = Variable.getByIndukId(item.id);
        if (varAr.length != item.varAr.length) {
            console.log(varAr);
            console.log(item.varAr);
            throw new Error('array tidak sama');
        }
    }
}
DekFungsi.daftar = [];
class DekFungsiEditor extends ha.comp.BaseComponent {
    constructor() {
        super();
        this.menu = new ha.comp.MenuPopup();
        this.pilihStmt = new ha.comp.MenuPopup();
        this._elHtml = this.getTemplate("div.hal-fungsi-dek");
        this.menuTbl.onclick = (e) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        };
        this.setupMenu();
        this.setupMenuPilihStmt();
    }
    buatParamObj(nama, indukId, prevIdx) {
        let hasil;
        hasil = {
            id: Id.id,
            nama: nama,
            indukId: indukId,
            type: TY_PARAM,
            prevIdx: prevIdx,
            ket: ''
        };
        return hasil;
    }
    setBack() {
        Path.back = () => {
            this.detach();
            dataObj.halModul.attach(document.body);
            dataObj.halModul.tampil(Modul.getModul(this._item.indukId));
        };
    }
    tampil(item) {
        this._item = item;
        item.varAr.forEach((id) => {
            let varObj = Variable.getVar(id);
            if (varObj.indukId == this._item.id) {
                let varView;
                varView = new VariableItem(varObj);
                varView.attach(this.daftarVar);
            }
        });
        dataObj.paramAr.forEach((item) => {
            if (item.indukId == this._item.id) {
                let itemView;
                itemView = new ParamView(item);
                itemView.attach(this.daftarParam);
            }
        });
        for (let i = 0; i < item.stmtAr.length; i++) {
            let idx = item.stmtAr[i];
            let stmt = Stmt.get(idx);
            if (stmt.stmtType == STMT_VAR_ISI) {
                console.log('var isi:');
                let view = new VarisiViewItem(stmt);
                view.attach(this.daftarStmt);
            }
            else {
                console.warn('');
            }
        }
        this.setBack();
    }
    setupMenuPilihStmt() {
        this.pilihStmt.buatTombol({
            label: 'name (arg1, arg2)',
            f: () => {
                let obj = {
                    id: Id.id,
                    indukId: this._item.id,
                    nama: 'fungsi',
                    prevIdx: 0,
                    refFungsiIdx: 0,
                    stmtType: STMT_PANGGIL_FUNGSI,
                    type: TY_STMT,
                    ket: ''
                };
                obj;
            }
        });
        this.pilihStmt.buatTombol({
            label: 'nama = exp',
            f: () => {
                let obj = VarIsi.buatVarIsi(this._item.id);
                let view = new VarisiViewItem(obj);
                this._item.stmtAr.push(obj.id);
                view.attach(this.daftarStmt);
                dataObj.simpan();
                DekFungsi.validasi(this._item);
            }
        });
    }
    setupMenu() {
        this.menu.buatTombol({
            label: 'var',
            f: () => {
                let nama;
                nama = window.prompt('Nama variable: ', 'var 1');
                if (nama) {
                    let varObj = Variable.buatVarObj(nama, this._item.id);
                    let view;
                    this._item.varAr.push(varObj.id);
                    view = new VariableItem(varObj);
                    view.attach(this.daftarVar);
                    dataObj.simpan();
                }
            }
        });
        this.menu.buatTombol({
            label: 'param',
            f: () => {
                let nama = window.prompt('nama parameter:');
                if (nama) {
                    let paramObj = this.buatParamObj(nama, this._item.id, 0);
                    let paramView = new ParamView(paramObj);
                    paramView.attach(this.daftarParam);
                    dataObj.paramAr.push(paramObj);
                    dataObj.simpan();
                }
            }
        });
        this.menu.buatTombol({
            label: 'stmt',
            f: () => {
                this.menu.view.detach();
                this.pilihStmt.view.attach(document.body);
            }
        });
    }
    get daftarParam() {
        return this.getEl('div.daftar-param');
    }
    get daftarVar() {
        return this.getEl('div.daftar-var');
    }
    get daftarStmt() {
        return this.getEl('div.daftar-stmt');
    }
    get menuTbl() {
        return this.getEl('div.menu button');
    }
}
class DekFungsiItemView extends ha.comp.BaseComponent {
    constructor(item) {
        super();
        this._template = `
            <div class='comp var-item disp-flex'>
                <div class='nama flex-grow-1'></div>
                <div class='menu'>
                    <button>|||</button>
                </div>
            </div>
        `;
        this.build();
        this._item = item;
        this.namaDiv.innerText = 'fung: ' + item.nama;
        this.setupMenu();
        this.menuTbl.onclick = (e) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        };
    }
    get item() {
        return this._item;
    }
    setupMenu() {
        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol({
            label: 'rename',
            f: () => {
                let nama;
                nama = window.prompt('Nama Dek Fungsi: ', this._item.nama);
                if (nama) {
                    this.gantiNama(nama);
                    dataObj.simpan();
                }
            }
        });
        this.menu.buatTombol({
            label: 'hapus',
            f: () => {
                for (let i = 0; i < DekFungsi.daftar.length; i++) {
                    if (DekFungsi.daftar[i].id == this._item.id) {
                        DekFungsi.daftar.splice(i, 1);
                        break;
                    }
                }
                this.destroy();
                dataObj.simpan();
            }
        });
        this.menu.buatTombol({
            label: 'edit',
            f: () => {
                console.log('edit dek fungsi');
                dataObj.halModul.detach();
                dataObj.halFungsi.attach(document.body);
                dataObj.halFungsi.tampil(this._item);
            }
        });
    }
    gantiNama(nama) {
        this._item.nama = nama;
        this.namaDiv.innerText = 'fung: ' + nama;
    }
    destroy() {
        super.destroy();
        this._item = null;
    }
    get namaDiv() {
        return this.getEl('div.nama');
    }
    get menuTbl() {
        return this.getEl('div.menu button');
    }
}
class PilihVariableItem extends ha.comp.BaseComponent {
    constructor(variable) {
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
        this._elHtml.onclick = (e) => {
            e.stopPropagation();
            console.log('klik variable item: ');
            this.destroy();
            this._finish();
        };
    }
    get finish() {
        return this._finish;
    }
    set finish(value) {
        this._finish = value;
    }
    get nama() {
        return this.getEl('span.nama');
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
        this.batalTbl.onclick = (e) => {
            e.stopPropagation();
            this.detach();
        };
    }
    get daftar() {
        return this.getEl('div.daftar');
    }
    get batalTbl() {
        return this.getEl('button.batal');
    }
    get judul() {
        return this.getEl('div.judul');
    }
}
class DlgPilihVariable {
    constructor() {
        this.view = new PilihVariableView();
    }
    get varDipilih() {
        return this._varDipilih;
    }
    set varDipilih(value) {
        this._varDipilih = value;
    }
    get finish() {
        return this._finish;
    }
    set finish(value) {
        this._finish = value;
    }
    tampil() {
        while (this.view.daftar.firstChild) {
            this.view.daftar.removeChild(this.view.daftar.firstChild);
        }
        Variable.daftar.forEach((item) => {
            let view;
            view = new PilihVariableItem(item);
            view.finish = () => {
                console.log('variable dipilih ' + item.id);
                this._varDipilih = item.id;
                this.view.detach();
                this._finish();
            };
            view.attach(this.view.daftar);
        });
        this.view.attach(document.body);
        this.view.batalTbl.onclick = (e) => {
            e.stopPropagation();
            this.view.detach();
        };
    }
}
const dlgPilihVariable = new DlgPilihVariable();
class Exp {
    constructor() {
        this.daftar = [];
    }
    buat(indukId, simpan) {
        let hasil;
        hasil = {
            id: Id.id,
            binopId: 0,
            fungId: 0,
            indukId: indukId,
            ket: '',
            nama: '',
            type: TY_EXP,
            value: '',
            varId: 0,
            tipeExp: ARG_VALUE
        };
        if (simpan) {
            this.daftar.push(hasil);
        }
        return hasil;
    }
}
const exp = new Exp();
class ExpForm extends ha.comp.BaseComponent {
    constructor() {
        super();
        this.terima = [];
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
        this.form.onsubmit = (e) => {
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
                }
                else if (this._tipeArg == ARG_BINOP) {
                }
                else {
                    throw Error('');
                }
                this.detach();
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
        };
        this.browseVarTbl.onclick = (e) => {
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
            };
            dlgPilihVariable.tampil();
        };
        this.getEl('button.batal').onclick = (e) => {
            e.stopPropagation();
            this.detach();
        };
        binopEd.attach(this.getEl('div.binop-fragment-cont'));
    }
    get binopId() {
        return this._binopId;
    }
    set selesai(value) {
        this._selesai = value;
    }
    get ref() {
        return this._refVarId;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get tipeArg() {
        return this._tipeArg;
    }
    set tipeArg(value) {
        this._tipeArg = value;
    }
    tampil(f, p, terima, exp) {
        this.exp = exp;
        while (this.terima.length > 0) {
            this.terima.pop();
        }
        this.litCont.style.display = 'none';
        this.varCont.style.display = 'none';
        this.fungsiCont.style.display = 'none';
        this.binopCont.style.display = 'none';
        terima.forEach((item) => {
            this.terima.push(item);
        });
        this.terima.forEach((item) => {
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
        });
        this._selesai = f;
        this.attach(p);
    }
    get litCont() {
        return this.getEl('div.lit-cont');
    }
    get varCont() {
        return this.getEl('div.var-cont');
    }
    get fungsiCont() {
        return this.getEl('div.fung-cont');
    }
    get binopCont() {
        return this.getEl('div.binop-cont');
    }
    get form() {
        return this.getEl('form');
    }
    get tipeInputHtml() {
        return this.getEl('input[name=tipe_arg]');
    }
    get literalHtml() {
        return this.getEl('input[name=literal]');
    }
    get refHtml() {
        return this.getEl('input.ref');
    }
    get browseVarTbl() {
        return this.getEl('button.browse');
    }
}
class Id {
    static get id() {
        if (this._base <= 0) {
            this._base = ha.comp.Util.id();
        }
        this._base++;
        return this._base;
    }
}
Id._base = 0;
function init() {
    Path.view.attach(document.body);
    dataObj.load();
    let modul;
    modul = Modul.getAwal();
    if (!modul) {
        modul = Modul.buatModulObj('awal', 0);
        dataObj.simpan();
    }
    dataObj.initHalaman();
    dataObj.halModul.attach(document.body);
    dataObj.halModul.tampil(modul);
}
function test() {
    window.localStorage.clear();
    let expForm = new ExpForm();
    let expObj;
    expObj = exp.buat(0, true);
    expForm.tampil(() => {
        console.log('exp form selesai');
    }, document.body, [
        ARG_VALUE,
        ARG_BINOP,
        ARG_REF_VAR,
        ARG_REF_FUNGSI
    ], expObj);
}
window.onload = () => {
    test();
};
class PanggilFungsi extends ha.comp.BaseComponent {
    constructor() {
        super();
        this.paramAR = [];
        this._template = `
			<div class='panggil-fungsi'>
				<div class='nama'></div>
				<div class='arg'></div>
			</div>
		`;
        this.build();
        this.populateParam();
    }
    get item() {
        return this._item;
    }
    set item(value) {
        this._item = value;
    }
    get fungsi() {
        return this._fungsi;
    }
    set fungsi(value) {
        this._fungsi = value;
    }
    renderParam() {
        this.paramAR.forEach(() => {
        });
    }
    populateParam() {
        while (this.paramAR.length > 0) {
            this.paramAR.pop();
        }
        dataObj.paramAr.forEach((item) => {
            if (item.indukId == this._item.id) {
                this.paramAR.push(item);
            }
        });
    }
}
const TY_MODUL = 'modul';
const TY_VARIABLE = 'variable';
const TY_DEK_FUNGSI = 'dek-fungsi';
const TY_NAMA = 'nama';
const TY_PARAM = 'param';
const TY_ARG = 'arg';
const TY_STMT = 'stmt';
const TY_VALUE = 'value';
const TY_EXP = 'exp';
const STMT_VAR_ISI = 'var isi';
const STMT_VAR_ISI_BINOP = 'var isi binop';
const STMT_VAR_ISI_PANGGIL_FUNGSI = 'var isi panggil fungsi';
const STMT_PANGGIL_FUNGSI = 'panggil fungsi';
const ARG_VALUE = 'arg value';
const ARG_BINOP = 'arg binop';
const ARG_REF_VAR = 'arg var ref';
const ARG_REF_FUNGSI = 'arg fungsi ref';
class Modul {
    static get daftar() {
        return this._daftar.slice();
    }
    static buatModulObj(nama, indukId) {
        let modul;
        modul = {
            id: Id.id,
            indukId: indukId,
            nama: nama,
            type: TY_MODUL,
            fungAr: [],
            modulAr: [],
            varAr: [],
            ket: ''
        };
        this._daftar.push(modul);
        dataObj.simpan();
        return modul;
    }
    static getModul(id) {
        for (let i = 0; i < this._daftar.length; i++) {
            let item = this._daftar[i];
            if (item.id == id)
                return item;
        }
        throw Error('id ' + id);
    }
    static getAwal() {
        for (let i = 0; i < this._daftar.length; i++) {
            let item = this._daftar[i];
            if (item.indukId == 0)
                return item;
        }
        return null;
    }
    static terj(modul) {
        let hasil = '';
        modul.modulAr.forEach((id) => {
            hasil += Modul.terj(Modul.getModul(id));
        });
        modul.varAr.forEach((id) => {
            let item = Variable.getVar(id);
            hasil += Variable.terj(item);
            hasil += "\n";
        });
        modul.fungAr.forEach((id) => {
            let item = DekFungsi.get(id);
            hasil += DekFungsi.terj(item);
            hasil += "\n";
        });
        return hasil;
    }
    static hapus(id) {
        for (let i = 0; i < Modul._daftar.length; i++) {
            if (Modul._daftar[i].id == id) {
                Modul._daftar.splice(i, 1);
                dataObj.simpan();
                break;
            }
        }
        throw Error('id: ' + id);
    }
    static muat(muatObj) {
        while (Modul._daftar.length > 0) {
            Modul._daftar.pop();
        }
        muatObj.modul.forEach((item) => {
            Modul._daftar.push({
                id: item.id,
                indukId: item.indukId,
                nama: item.nama,
                type: item.type,
                fungAr: item.fungAr,
                modulAr: item.modulAr,
                varAr: item.varAr,
                ket: item.ket
            });
        });
    }
}
Modul._daftar = [];
class OpEditor extends ha.comp.BaseComponent {
    constructor() {
        super();
        this._template = `
        `;
    }
}
const opEditor = new OpEditor();
class ParamView extends ha.comp.BaseComponent {
    constructor(item) {
        super();
        this._template = `
            <div class='comp item-param disp-flex'>
                <div class='nama flex-grow-1'></div>
                <div class='menu'>
                    <button>|||</button>
                </div>
            </div>
        `;
        this.build();
        this._item = item;
        this.namaDiv.innerText = 'param: ' + item.nama;
        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol({
            label: 'rename',
            f: () => {
                let nama = window.prompt('Nama param: ', this._item.nama);
                if (nama) {
                    this.gantiNama(nama);
                    dataObj.simpan();
                }
            }
        });
        this.menu.buatTombol({
            label: 'hapus',
            f: () => {
                for (let i = 0; i < dataObj.paramAr.length; i++) {
                    if (dataObj.paramAr[i].id == this._item.id) {
                        dataObj.paramAr.splice(i, 1);
                    }
                }
                this.destroy();
                dataObj.simpan();
            }
        });
        this.menuTbl.onclick = (e) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        };
    }
    gantiNama(nama) {
        this._item.nama = nama;
        this.namaDiv.innerText = 'param: ' + nama;
    }
    destroy() {
        super.destroy();
        this._item = null;
    }
    get namaDiv() {
        return this.getEl('div.nama');
    }
    get menuTbl() {
        return this.getEl('div.menu button');
    }
}
class Path {
    static get view() {
        if (!this._view) {
            this._view = ha.comp.BaseComponent.buat(this.temp);
            ha.comp.Util.getEl('button.kembali', this._view.elHtml).onclick = (e) => {
                e.stopPropagation();
                this._back();
            };
        }
        return this._view;
    }
    static set back(f) {
        this._back = f;
    }
}
Path.temp = `
        <div class='path padding-4'>
            <div class='padding border wspace-nowrap'>
                <button class='kembali'>◀</button>
                <div class='disp-inline-block padding'></div>
            </div>
        </div>
    `;
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class MenuPopup {
            constructor() {
                this.view = new View();
            }
            destroy() {
                this.view.destroy();
            }
            buatTombol2(t) {
                t.forEach((item) => {
                    this.buatTombol(item);
                });
            }
            buatTombol(t) {
                let button = document.createElement('button');
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.style.display = 'block';
                button.style.margin = 'auto';
                button.style.marginBottom = '8px';
                button.textContent = t.label;
                button.onclick = (e) => {
                    e.stopPropagation();
                    this.view.detach();
                    t.f();
                };
                this.view.box.appendChild(button);
            }
        }
        comp.MenuPopup = MenuPopup;
        class View extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='menu-popup' style="position:fixed; top:0px; left:0px; right:0px; bottom:0px; z-index:1000; background-color: rgba(0,0,0,.3)">
					<div class='box cont' style="position:fixed; bottom:0px; left:0px; right:0px">
					</div>
				</div>
			`;
                this.build();
                this.box.style.backgroundColor = 'white';
                this.box.style.padding = '8px';
                this.box.style.textAlign = 'center';
                this._elHtml.onclick = () => {
                    this.detach();
                };
            }
            get box() {
                return this.getEl('div.box.cont');
            }
        }
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
class Project {
    constructor() {
        Project.setupMenu();
    }
    static get view() {
        if (!this._view) {
            this._view = ha.comp.Util.build(Project.template);
        }
        return this._view;
    }
    static get contentHtml() {
        return ha.comp.Util.getEl('div.content', this.view);
    }
    static terj() {
        let modul = Modul.getAwal();
        let hasilStr = '';
        if (modul) {
            hasilStr = Modul.terj(modul);
        }
        else {
            throw Error('');
        }
        console.log(hasilStr);
        return hasilStr;
    }
    static setupMenu() {
        this.menu.buatTombol({
            label: 'translate',
            f: () => {
                let modul = Modul.getAwal();
                let hasilStr = '';
                if (modul) {
                    hasilStr = Modul.terj(modul);
                }
                return hasilStr;
            }
        });
    }
}
Project.template = `
        <div class='project'>
            <div class='header'>
                <button class='disp-inline-block'>|||</button>
                <span class='judul disp-inline-block'>
                </span>
            </div>
            <div class='content'>
            </div>
        </div>
    `;
Project.menu = new ha.comp.MenuPopup();
class Stmt {
    static get(id) {
        for (let i = 0; i < this.daftar.length; i++) {
            let item = this.daftar[i];
            if (item.id == id)
                return item;
        }
        throw Error('');
    }
    static muat(muatObj) {
        while (this.daftar.length > 0) {
            this.daftar.pop();
        }
        VarIsi.muat(muatObj);
    }
}
Stmt.daftar = [];
class VarIsi {
    static varRef(obj, value) {
        ha.comp.Util.stackTrace();
        obj.varId = value;
    }
    static muat(muatObj) {
        muatObj.stmt.forEach((item) => {
            if (item.stmtType == STMT_VAR_ISI) {
                let varIsi = item;
                let obj = {
                    id: varIsi.id,
                    indukId: varIsi.indukId,
                    nama: varIsi.nama,
                    prevIdx: varIsi.prevIdx,
                    expId: varIsi.expId,
                    varId: varIsi.varId,
                    stmtType: varIsi.stmtType,
                    type: varIsi.type,
                    expTipe: varIsi.expTipe,
                    expValue: varIsi.expValue,
                    ket: item.ket
                };
                Stmt.daftar.push(obj);
            }
        });
    }
    static buatVarIsi(indukId) {
        let obj;
        obj = {
            id: Id.id,
            indukId: indukId,
            nama: '',
            prevIdx: 0,
            varId: -1,
            expId: -1,
            stmtType: STMT_VAR_ISI,
            type: TY_STMT,
            expTipe: ARG_VALUE,
            expValue: '0',
            ket: ''
        };
        Stmt.daftar.push(obj);
        dataObj.simpan();
        this.validasi(obj);
        return obj;
    }
    static terj(obj) {
        let hasil = Variable.nama(obj.varId) + " = ";
        if (obj.expTipe == ARG_REF_VAR) {
            hasil += Variable.nama(obj.expId);
        }
        else if (obj.expTipe == ARG_VALUE) {
            hasil += obj.expValue;
        }
        else {
            throw Error('');
        }
        return hasil;
    }
    static validasi(obj) {
        if (obj.indukId > 0) {
        }
        if (obj.expId > 0) {
        }
        if (obj.varId > 0) {
            Variable.getVar(obj.varId);
        }
    }
}
class VarisiViewItem extends ha.comp.BaseComponent {
    constructor(item) {
        super();
        this._template = `
			<div class='var-isi padding-4'>
				<div class='border padding-4 wbreak-keep-all wspace-nowrap'>

					<div class='padding disp-inline-block'>
						<button class='menu'>|||</button>
					</div>

					<div class='padding disp-inline-block wspace-nowrap'>
						<div class='var-cont disp-inline-block'>
						</div>
						<div class='sama-dengan disp-inline-block padding'>=
						</div>
						<div class='exp-cont disp-inline-block'>
						</div>
					</div>

					<div class="debug disp-none"></div>

					</div>

				</div>
			</div>
		`;
        this.build();
        this._elHtml.setAttribute('id', item.id + '');
        this._item = item;
        this.varCont = this.getEl('div.var-cont');
        this.expCont = this.getEl('div.exp-cont');
        this.debug();
        this.init();
        this.getEl('button.menu').onclick = (e) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        };
        this.expCont.onclick = (e) => {
            e.stopPropagation();
            let expForm = new ExpForm();
            expForm.attach(document.body);
            expForm.selesai = () => {
                if (expForm.tipeArg == ARG_REF_VAR) {
                    this.varCont.innerText = Variable.nama((expForm.ref));
                    this._item.varId = expForm.ref;
                    this._item.expTipe = ARG_REF_VAR;
                }
                else if (expForm.tipeArg == ARG_VALUE) {
                    this.varCont.innerText = expForm.value;
                    this._item.expTipe = ARG_VALUE;
                    this._item.expValue = expForm.value;
                }
                else {
                    throw new Error(expForm.tipeArg);
                }
                dataObj.simpan();
            };
        };
        this.varCont.onclick = (e) => {
            e.stopPropagation();
            dlgPilihVariable.view.attach(document.body);
            dlgPilihVariable.tampil();
            dlgPilihVariable.finish = () => {
                this.varCont.innerText = Variable.nama(dlgPilihVariable.varDipilih);
                this._item.varId = dlgPilihVariable.varDipilih;
                dataObj.simpan();
            };
        };
    }
    debug() {
        this.getEl('div.debug').innerText = JSON.stringify(this._item);
        if (this._item.varId > 0) {
            this.getEl('div.debug').innerText += "-----";
            this.getEl('div.debug').innerText += JSON.stringify(Variable.getVar(this._item.varId));
        }
    }
    destroy() {
        super.destroy();
        this._item = null;
        this.menu.destroy();
    }
    setupMenu() {
        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol({
            label: 'delete',
            f: () => {
                Data.deleteVarIsi(this._item.id);
                this.destroy();
                dataObj.simpan();
            }
        });
    }
    init() {
        this.setupVar();
        this.setupExp();
        this.setupMenu();
    }
    setupExp() {
        if (this._item.expTipe == ARG_VALUE) {
            this.expCont.innerText = this._item.expValue;
        }
        else if (this._item.expTipe == ARG_REF_VAR) {
            this.expCont.innerText = Variable.nama(this._item.expId);
        }
        else {
            throw Error('');
        }
        console.log('this._item.expTipe: ' + this._item.expTipe);
        console.log('this._item.expValue: ' + this._item.expValue);
        console.log('this.expCont.innerText ' + this.expCont.innerText);
    }
    setupVar() {
        console.log('setup var:');
        console.log('this._item.varId: ' + this._item.varId);
        if (this._item.varId > 0) {
            this.varCont.innerText = Variable.nama(this._item.varId);
        }
        else {
            this.varCont.innerText = '---';
        }
    }
}
class Variable {
    static nama(id) {
        for (let i = 0; i < this.daftar.length; i++) {
            if (this.daftar[i].id == id) {
                return this.daftar[i].nama;
            }
        }
        throw Error('id: ' + id);
    }
    static getByIndukId(id) {
        let hasil = [];
        for (let i = 0; i < this.daftar.length; i++) {
            if (this.daftar[i].indukId == id) {
                hasil.push(this.daftar[i]);
            }
        }
        return hasil;
    }
    static getVar(id) {
        for (let i = 0; i < this.daftar.length; i++) {
            if (this.daftar[i].id == id) {
                return this.daftar[i];
            }
        }
        throw Error('id: ' + id);
    }
    static buatVarObj(nama, indukId) {
        let hasil;
        hasil = {
            id: Id.id,
            nama: nama,
            indukId: indukId,
            type: TY_VARIABLE,
            nilai: '',
            ket: ''
        };
        this.daftar.push(hasil);
        dataObj.simpan();
        return hasil;
    }
    static terj(obj) {
        return "let " + obj.nama + "= ''";
    }
}
Variable.daftar = [];
class VariableItem extends ha.comp.BaseComponent {
    constructor(item) {
        super();
        this._template = `
            <div class='comp var-item padding-4'>
				<div class='border padding disp-flex'>
					<div class='menu'>
						<button>|||</button>
					</div>
					<div class='nama'></div>
				</div>
            </div>
        `;
        this.build();
        this._item = item;
        this.namaDiv.innerText = 'var: ' + item.nama;
        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol({
            label: 'rename',
            f: () => {
                let nama = window.prompt('Nama var: ', this._item.nama);
                if (nama) {
                    this.gantiNama(nama);
                    dataObj.simpan();
                }
            }
        });
        this.menu.buatTombol({
            label: 'hapus',
            f: () => {
                for (let i = 0; i < Variable.daftar.length; i++) {
                    if (Variable.daftar[i].id == this._item.id) {
                        Variable.daftar.splice(i, 1);
                    }
                }
                this.destroy();
                dataObj.simpan();
            }
        });
        this.menuTbl.onclick = (e) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        };
    }
    gantiNama(nama) {
        this._item.nama = nama;
        this.namaDiv.innerText = 'var: ' + nama;
    }
    destroy() {
        super.destroy();
        this._item = null;
    }
    get namaDiv() {
        return this.getEl('div.nama');
    }
    get menuTbl() {
        return this.getEl('div.menu button');
    }
}
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Dialog extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='comp dialog'>
					<div class='box'>
						<p class='deskripsi'>Contoh dialog </p>
						<button class="btn btn-primary ok">OK</button>
					</div>
				</div>
				`;
                this.build();
            }
            init() {
                this.detach();
            }
            tampil(pesan = '', def = true) {
                ha.comp.Util.stackTrace();
                this.p.innerHTML = pesan;
                if (def) {
                    this.okTbl.onclick = () => {
                        this.detach();
                    };
                }
                this.attach(document.body);
                this._elHtml.style.display = 'block';
            }
            get okTbl() {
                return this.getEl('button.ok');
            }
            get p() {
                return this.getEl('p');
            }
        }
        comp.dialog = new Dialog();
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Loading extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='loading'>
					<div class='box'>
						<img src=''/>
						<p>Memuat</p> 
					</div>
				</div>
			`;
                this.build();
            }
            tampil() {
                console.log('loading tampil');
                this.attach(document.body);
            }
        }
        comp.loading = new Loading();
        console.log('exporting loading: ' + comp.loading);
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class MenuKontek {
            constructor() {
                this.view = new View();
            }
            buatTombol(t) {
                let button = document.createElement('button');
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.style.display = 'inline-block';
                button.style.margin = 'auto';
                button.style.marginBottom = '8px';
                button.textContent = t.label;
                button.onclick = (e) => {
                    e.stopPropagation();
                    this.view.detach();
                    t.f();
                };
                this.view.elHtml.appendChild(button);
            }
        }
        comp.MenuKontek = MenuKontek;
        class View extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='menu-context'>
				</div>
			`;
                this.build();
                this._elHtml.style.wordBreak = 'no-wrap';
            }
        }
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Util {
            static createEl(str) {
                let div = document.createElement('div');
                let el;
                div.innerHTML = str;
                el = div.firstElementChild;
                if (!el) {
                    console.log(div);
                    console.log(str);
                    throw new Error('');
                }
                return el;
            }
            static getTemplate(query) {
                try {
                    let template = document.body.querySelector('template').content;
                    return template.querySelector(query).cloneNode(true);
                }
                catch (e) {
                    console.log('template:' + query);
                    throw Error(e);
                }
            }
            static getEl(query, parent = null, err = true) {
                let el;
                if (!parent)
                    parent = document.body;
                el = parent.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(parent);
                    console.log(query);
                    if (err) {
                        throw new Error('query not found ');
                    }
                    else {
                        return null;
                    }
                }
            }
            static id() {
                return Date.now();
            }
            static async delay(m = 10) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, m);
                });
            }
            static stackTrace() {
                try {
                    throw Error('');
                }
                catch (e) {
                    console.error(e);
                }
            }
            static bersihDiv(div) {
                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }
            }
            static error(e) {
                console.error(e);
                comp.dialog.tampil(e.message);
            }
            static kirimWa(teks) {
                return "whatsapp://send?text=" + teks;
            }
            static getUrl(url, params) {
                let urlHasil = url;
                console.group('get url');
                console.log('url: ' + url);
                console.log('params: ' + JSON.stringify(params));
                params.forEach((item) => {
                    console.log('reg: ' + urlHasil.search(/\:[a-zA-Z_0-9]+/));
                    urlHasil = urlHasil.replace(/\:[a-zA-Z_0-9]+/, item + '');
                    console.log('item: ' + item);
                    console.log('url: ' + urlHasil);
                });
                console.log('url hasil: ' + urlHasil);
                console.groupEnd();
                return urlHasil;
            }
            static build(temp) {
                let div = document.createElement('div');
                let el;
                div.innerHTML = temp;
                el = div.firstElementChild;
                if (!el) {
                    console.log(div);
                    console.log(temp);
                    throw new Error('');
                }
                return el;
            }
            static async AjaxLogin(type, urlServer, dataStr, loginUrl, pf = null) {
                let xml;
                xml = await this.Ajax(type, urlServer, dataStr, pf);
                if (401 == xml.status) {
                    window.top.location.href = loginUrl;
                    return null;
                }
                else {
                    return xml;
                }
            }
            static async Ajax2(type, url, dataStr, pf = null) {
                let x = await this.Ajax(type, url, dataStr, pf);
                if (x.status == 200 || x.status == 0) {
                    return x.responseText;
                }
                console.log('error status code: ' + x.status);
                throw Error(x.responseText);
            }
            static async Ajax(type, url, dataStr, pf = null) {
                return new Promise((resolve, reject) => {
                    try {
                        console.group('send data');
                        console.log("type " + type);
                        comp.loading.attach(document.body);
                        let xhr = new XMLHttpRequest();
                        xhr.onload = () => {
                            comp.loading.detach();
                            resolve(xhr);
                        };
                        xhr.onerror = (e) => {
                            console.log('xhr error');
                            console.log(e);
                            comp.loading.detach();
                            reject(new Error(e.message));
                        };
                        xhr.onprogress = (p) => {
                            if (pf) {
                                pf(p);
                            }
                        };
                        xhr.open(type, url + "", true);
                        xhr.setRequestHeader('Content-type', 'application/json');
                        xhr.send(dataStr);
                        console.groupEnd();
                    }
                    catch (e) {
                        console.log('Util error');
                        console.log(e);
                        comp.loading.detach();
                        reject(new Error(e.message));
                    }
                });
            }
        }
        Util.sUserId = 'user_id';
        Util.sLevel = 'level';
        Util.sFilter = 'filter';
        Util.storageId = 'xyz.hagarden.tugas';
        comp.Util = Util;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
class HalModule extends ha.comp.BaseComponent {
    constructor() {
        super();
        this._elHtml = this.getTemplate('div.modul-cont div.hal-modul');
        this.setupTombol();
        this.setupMenu();
    }
    setBack() {
        Path.back = () => {
            if (this._modul.indukId == 0) {
                console.log('modul awal');
            }
            else {
                let pModul = Modul.getModul(this._modul.indukId);
                dataObj.halModul.tampil(pModul);
            }
        };
    }
    tampil(modul) {
        console.log('tampil');
        this._modul = modul;
        ha.comp.Util.bersihDiv(this.varCont);
        ha.comp.Util.bersihDiv(this.modulCont);
        ha.comp.Util.bersihDiv(this.fungCont);
        this._modul.varAr.forEach((id) => {
            let item;
            item = Variable.getVar(id);
            this.renderVar(item);
        });
        this._modul.modulAr.forEach((id) => {
            let item = Modul.getModul(id);
            this.renderModul(item);
        });
        this._modul.fungAr.forEach((id) => {
            let item = DekFungsi.get(id);
            this.renderDekFungsi(item);
        });
        this.setBack();
    }
    setupMenu() {
        this.menu = new ha.comp.MenuPopup();
        let tombol = [
            {
                label: 'terjemah',
                f: () => {
                    Project.terj();
                }
            },
            {
                label: '+ var',
                f: () => {
                    let nama;
                    nama = window.prompt('Nama:');
                    if (nama) {
                        let variable;
                        variable = Variable.buatVarObj(nama, 0);
                        this.renderVar(variable);
                        this._modul.varAr.push(variable.id);
                        dataObj.simpan();
                    }
                }
            },
            {
                label: '+ modul',
                f: () => {
                    let nama = window.prompt('Nama Modul', 'modul');
                    if (nama) {
                        let modulObj = Modul.buatModulObj(nama, this._modul.id);
                        this.renderModul(modulObj);
                        this._modul.modulAr.push(modulObj.id);
                        dataObj.simpan();
                    }
                }
            },
            {
                label: '+ fungsi',
                f: () => {
                    let nama = window.prompt('Nama Fungsi', 'fungsi');
                    if (nama) {
                        let fungObj = DekFungsi.buat(nama, this._modul.id);
                        this.renderDekFungsi(fungObj);
                        this._modul.fungAr.push(fungObj.id);
                        dataObj.simpan();
                    }
                }
            }
        ];
        this.menu.buatTombol2(tombol);
    }
    setupTombol() {
        this.menuTbl.onclick = (e) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        };
    }
    renderVar(variable) {
        let view;
        view = new VariableItem(variable);
        view.attach(this.varCont);
    }
    renderModul(modul) {
        let view;
        view = new ItemModul(modul);
        view.attach(this.modulCont);
    }
    renderDekFungsi(fung) {
        let view;
        view = new DekFungsiItemView(fung);
        view.attach(this.fungCont);
    }
    get menuTbl() {
        return this.getEl('div.menu button');
    }
    get modulCont() {
        return this.getEl('div.modul');
    }
    get varCont() {
        return this.getEl('div.var');
    }
    get fungCont() {
        return this.getEl('div.dek-fung');
    }
}
class ItemModul extends ha.comp.BaseComponent {
    constructor(item) {
        super();
        this._template = `
            <div class='comp var-item disp-flex'>
                <div class='nama flex-grow-1'></div>
                <div class='menu'>
                    <button>|||</button>
                </div>
            </div>
        `;
        this.build();
        this._item = item;
        this.gantiNama(item.nama);
        this.setupMenu();
        this.menuTbl.onclick = (e) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        };
    }
    get item() {
        return this._item;
    }
    destroy() {
        super.destroy();
        this._item = null;
    }
    setupMenu() {
        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol({
            label: 'rename',
            f: () => {
                let nama = window.prompt('Nama Modul: ', this._item.nama);
                if (nama) {
                    this.gantiNama(nama);
                    dataObj.simpan();
                }
            }
        });
        this.menu.buatTombol({
            label: 'edit',
            f: () => {
                console.log('edit modul');
                dataObj.halModul.tampil(this._item);
            }
        });
        this.menu.buatTombol({
            label: 'hapus',
            f: () => {
                Modul.hapus(this._item.id);
                this.destroy();
                dataObj.simpan();
            }
        });
    }
    gantiNama(nama) {
        this._item.nama = nama;
        this.namaDiv.innerText = 'mod: ' + nama;
    }
    get namaDiv() {
        return this.getEl('div.nama');
    }
    get menuTbl() {
        return this.getEl('div.menu button');
    }
}
let view = {
    el: {},
    template: `
        <div class='dialog'>
            <span class='test'></span>
            <button>test</button>
        </div>
    `,
    tombol: () => {
        return ha.comp.Util.getEl('button', view.el);
    }
};
view.el = ha.comp.Util.createEl(view.template);
view.tombol().onclick = () => {
    console.log('tombol on click');
};
document.body.appendChild(view.el);
