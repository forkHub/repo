declare namespace ha.parse {
    class Leksikal {
        readonly kataCadangan: string[];
        readonly binopOpr: string[];
        pecah(str: string): Promise<void>;
        private ambilKomentar;
        private ambilReg;
        private ambilStringQuoteSatu;
        private ambilCadangan;
        private checkSimbol;
        private checkHuruf;
        private ambilHuruf;
        private ambilString;
    }
    class Grammar {
        static check(): Promise<void>;
        private static check_grammar;
        private static tokenBaru;
        private static renderToken;
        /**
         * menambah array token
         * @param sumber
         * @param tambahan
         */
        private static tambah;
        private static check_rumus;
    }
    let tokenDataIdx: number;
    const leksikal: Leksikal;
}
declare namespace ha.parse {
    function pushCadangan(kata: string[]): void;
    function debugOn(): void;
    function debugOff(): void;
    function debugLog(msg: any, status?: boolean): void;
    function debugGroupCollapsed(msg: string, status?: boolean): void;
    function debugGroup(msg: string, status?: boolean): void;
    function debugGroupEnd(status?: boolean): void;
    function renderToken(token: IToken[]): string;
    function pushRumus(rumusAr: IRumus[]): void;
}
declare namespace ha.parse {
    const token: IToken[];
    const grammarAr: IRumus[];
}
interface IToken {
    nama: string;
    nilai: string[];
    token: IToken[];
}
interface IRumus {
    nama: string;
    rumus: string[][];
}
declare namespace ha.parse {
    class Kons {
        static readonly ANGKA: string;
        static readonly TEKS: string;
        static readonly EXP: string;
        static readonly OPR: string;
        static readonly BINOP: string;
        static readonly MIN: string;
        static readonly KATA: string;
        static readonly KATA_CADANGAN: string;
        static readonly KURUNG: string;
        static readonly AKSES_ARRAY: string;
        static readonly STMT2: string;
        static readonly STMT: string;
        static readonly RETURN_STMT: string;
        static readonly WHILE: string;
        static readonly IF: string;
        static readonly IF_ELSE: string;
        static readonly ELSE_IF: string;
        static readonly ELSE_IF2: string;
        static readonly ELSE_IF_ELSE: string;
        static readonly ELSE: string;
        static readonly DEK_VAR: string;
        static readonly DEK_FUNGSI1: string;
        static readonly DEK_FUNGSI: string;
        static readonly VAR_ISI: string;
        static readonly FOR_STMT: string;
        static readonly ARG1: string;
        static readonly ARG2: string;
        static readonly ARG: string;
        readonly kataCadangan: string[];
        readonly binopOpr: string[];
        private static _dataStr;
        static get dataStr(): string;
        static set dataStr(value: string);
    }
}
