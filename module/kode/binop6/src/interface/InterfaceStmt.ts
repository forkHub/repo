interface IStmt extends IData {
	stmtType: string;
}

interface IPanggilFungsi extends IStmt {
	refId: number;
	param: number[]
}

interface IDekFungsi extends IData {
	paramAr: IParam[],
	varAr: number[],
	stmtAr: number[],
}

interface IIf extends IData {
	expId: number,
	stmtAr: number[],
}

interface IParam extends IData {

}


