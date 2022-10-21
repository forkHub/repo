var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Kons {
            static ANGKA = 'angka';
            static TEKS = 'teks';
            static EXP = 'exp';
            static OPR = 'opr';
            static BINOP = 'binop';
            static MIN = 'min';
            static KATA = 'kata';
            static KATA_CADANGAN = '_kata_cadangan_';
            static KURUNG = '()';
            static AKSES_ARRAY = 'kata[]';
            //stmt
            static STMT2 = 'stmt_stmt';
            static STMT = 'stmt';
            static RETURN_STMT = 'return_stmt';
            static WHILE = 'while_stmt';
            static IF = 'if{}';
            static IF_ELSE = 'if_else{}';
            static ELSE_IF = 'else_if{}';
            static ELSE_IF2 = 'else_if{}2';
            static ELSE_IF_ELSE = 'else_if{}else{}';
            static ELSE = 'else{}';
            static DEK_VAR = 'var_a';
            static DEK_FUNGSI1 = 'dek_fungsi1';
            static DEK_FUNGSI = 'dek_fungsi';
            static VAR_ISI = 'a=b';
            static FOR_STMT = 'for_stmt';
            static ARG1 = 'arg1';
            static ARG2 = 'arg2';
            static ARG = 'arg'; //argument secara umum
            kataCadangan = [];
            binopOpr = [];
            static _dataStr = '';
            static get dataStr() {
                return this._dataStr;
            }
            static set dataStr(value) {
                this._dataStr = value;
            }
        }
        parse.Kons = Kons;
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
