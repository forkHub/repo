var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Kons {
            constructor() {
                this.kataCadangan = [];
                this.binopOpr = [];
            }
            static get dataStr() {
                return this._dataStr;
            }
            static set dataStr(value) {
                this._dataStr = value;
            }
        }
        Kons.ANGKA = 'angka';
        Kons.TEKS = 'teks';
        Kons.EXP = 'exp';
        Kons.OPR = 'opr';
        Kons.BINOP = 'binop';
        Kons.MIN = 'min';
        Kons.KATA = 'kata';
        Kons.KATA_CADANGAN = '_kata_cadangan_';
        Kons.KURUNG = '()';
        Kons.AKSES_ARRAY = 'kata[]';
        //stmt
        Kons.STMT2 = 'stmt_stmt';
        Kons.STMT = 'stmt';
        Kons.RETURN_STMT = 'return_stmt';
        Kons.WHILE = 'while_stmt';
        Kons.IF = 'if{}';
        Kons.IF_ELSE = 'if_else{}';
        Kons.ELSE_IF = 'else_if{}';
        Kons.ELSE_IF2 = 'else_if{}2';
        Kons.ELSE_IF_ELSE = 'else_if{}else{}';
        Kons.ELSE = 'else{}';
        Kons.DEK_VAR = 'var_a';
        Kons.DEK_FUNGSI1 = 'dek_fungsi1';
        Kons.DEK_FUNGSI = 'dek_fungsi';
        Kons.VAR_ISI = 'a=b';
        Kons.FOR_STMT = 'for_stmt';
        Kons.ARG1 = 'arg1';
        Kons.ARG2 = 'arg2';
        Kons.ARG = 'arg'; //argument secara umum
        Kons._dataStr = '';
        parse.Kons = Kons;
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
