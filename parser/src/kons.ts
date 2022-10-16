class Kons {
	static readonly ANGKA: string = 'angka';
	static readonly TEKS: string = 'teks';
	static readonly EXP: string = 'exp';
	static readonly OPR: string = 'opr';
	static readonly BINOP: string = 'binop';
	static readonly MIN: string = 'min';
	static readonly KATA: string = 'kata';
	static readonly KATA_CADANGAN: string = '_kata_cadangan_';
	static readonly KURUNG: string = '()';
	static readonly AKSES_ARRAY: string = 'kata[]';

	//stmt
	static readonly STMT2: string = 'stmt_stmt';
	static readonly STMT: string = 'stmt';
	static readonly RETURN_STMT: string = 'return_stmt';
	static readonly WHILE: string = 'while_stmt';
	static readonly IF: string = 'if{}';
	static readonly IF_ELSE: string = 'if_else{}';
	static readonly ELSE_IF: string = 'else_if{}';
	static readonly ELSE_IF2: string = 'else_if{}2';
	static readonly ELSE_IF_ELSE: string = 'else_if{}else{}';
	static readonly ELSE: string = 'else{}';
	static readonly DEK_VAR: string = 'var_a';
	static readonly DEK_FUNGSI1: string = 'dek_fungsi1';
	static readonly DEK_FUNGSI: string = 'dek_fungsi';
	static readonly VAR_ISI: string = 'a=b';
	static readonly FOR_STMT: string = 'for_stmt';

	static readonly ARG1: string = 'arg1';
	static readonly ARG2: string = 'arg2';
	static readonly ARG: string = 'arg';	//argument secara umum

	readonly kataCadangan: string[] = [];
	readonly binopOpr: string[] = [];

	private static _dataStr: string = '';

	public static get dataStr(): string {
		return this._dataStr;
	}
	public static set dataStr(value: string) {
		this._dataStr = value;
	}
}