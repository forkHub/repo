//var isi
function testVariIsi(): void {
	let varisi: IVarIsi;
	let varisiEd: VarIsiEd;

	buatContohVar();

	varisi = VarIsi.buatDef(0);
	varisiEd = new VarIsiEd(varisi, true);
	varisiEd.attach(document.body);
}

function testExpEd(): void {
	let expObj: IExp;
	let expEd: ExpEd2;
	// let valueObj: IValue;

	window.localStorage.clear();

	buatContohVar();

	// valueObj = value.buat(0);
	expObj = Exp.buatDef(0);
	expEd = new ExpEd2(expObj);

	expEd.attach(document.body);
}

function testExpEd2(): void {
	let exp: IExp;
	let expEd: ExpEd2;

	window.localStorage.clear();

	buatContohVar();

	exp = Exp.buatDef(0);
	expEd = new ExpEd2(exp);

	expEd.attach(document.body);
}

//binop
function testBinop(): void {
	let binopObj: IBinop;
	let binopEd: BinopEd;

	buatContohVar();

	binopObj = Binop.buatDef(0);

	binopEd = new BinopEd(binopObj);
	binopEd.attach(document.body);
}

//fungsi
function testPanggilFungsi(): void {
	let fEd: PanggilFungsiEd;
	let f: IPanggilFungsi;
	let fd: IDekFungsi;
	let paramAr: IParam[];

	buatContohFungsi();
	buatContohVar();

	paramAr = buatParam();
	fd = DekFungsi.buatParam('fungsi1', 0, paramAr);
	f = PanggilFungsi.buat(0, fd);

	// console.log('panggil fungsi:');
	// console.log(f);

	fEd = new PanggilFungsiEd(f);
	fEd.attach(document.body);
}

function testPilihFungsi(): void {
	buatContohFungsi();

	pilihFungsi.finish = () => { }
	pilihFungsi.tampil(DekFungsi.daftar());
}

function testFor(): void {
	let ed: ForNextEd;
	let forObj: IFor;

	forObj = ForNext.buat(0);

	ed = new ForNextEd(forObj);
	ed.attach(document.body);
}

//data gen
function buatContohFungsi(): void {
	let paramAr: IParam[];

	paramAr = buatParam();

	DekFungsi.buatParam('fungsi1', 0, paramAr);
}

function buatContohVar(): void {
	Variable.buatVarObj('test1', 0);
	Variable.buatVarObj('test2', 0);
	Variable.buatVarObj('test3', 0);
}

function buatParam(): IParam[] {
	let paramAr: IParam[];

	paramAr = [
		param.buat(0, 'param1'),
		// param.buat(0, 'param2'),
		// param.buat(0, 'param3'),
		// param.buat(0, 'param4'),
		// param.buat(0, 'param5'),
	]

	return paramAr;
}

interface IObj {
	_x: number,
	_y: number,
	x: number,
	y: number,
	f: () => void
}

function testObj(): void {
	let obj: IObj = {
		_x: 0,
		_y: 0,

		set x(v: number) {
			this._x = v;
		},

		set y(v: number) {
			this._y = v;
		},

		f: () => {
			console.log("this.x");
		}
	}

	obj.x = 5;
	obj._x = 8;

	console.log(obj);
	console.log(JSON.stringify(obj));
}