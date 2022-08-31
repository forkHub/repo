"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Baris {
            lines() {
                let idx = 100000;
                let idxTerakhir = 0;
                console.group('lines');
                while (idx >= 0) {
                    idx = this.getLineBreak(idxTerakhir);
                    console.log('line break ' + idx);
                    if (idx >= 0) {
                        let kiri = parse.ar.ambilTengah(parse.data.token, idxTerakhir, idx);
                        kiri = this.bersih(kiri);
                        if (kiri.length > 0) {
                            parse.data.barisAr.push({
                                n: 0,
                                token: kiri,
                                baris: parse.baris.renderLines(kiri)
                            });
                            this.renderLines(kiri);
                        }
                        idxTerakhir = idx + 1;
                    }
                }
                console.groupEnd();
            }
            bersih(tokenAr) {
                while ((tokenAr.length > 0) && tokenAr[0].type == parse.Kons.TY_BARIS) {
                    tokenAr = [];
                }
                while ((tokenAr.length > 0) && tokenAr[tokenAr.length - 1].type == parse.Kons.TY_BARIS) {
                    tokenAr = tokenAr.slice(0, tokenAr.length - 1);
                }
                let idx = -1;
                for (let i = 0; i < tokenAr.length; i++) {
                    if (tokenAr[i].value == ';') {
                        idx = i;
                        break;
                    }
                }
                if (idx >= 0) {
                    tokenAr = tokenAr.slice(0, idx);
                }
                if (!tokenAr)
                    tokenAr = [];
                return tokenAr;
            }
            valid(token) {
                token;
                return true;
            }
            renderLines(token) {
                let str = '';
                token.forEach((token) => {
                    str += token.value;
                });
                console.log(str);
                return str;
            }
            getLineBreak(idx) {
                for (let i = idx; i < parse.data.token.length; i++) {
                    if (parse.data.token[i].type == parse.Kons.TY_BARIS) {
                        return i;
                    }
                }
                return -1;
            }
        }
        parse.baris = new Baris();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Data {
            _dataStr = '';
            _token = [];
            _barisAr = [];
            _barisObj;
            config = new Config();
            get barisObj() {
                return this._barisObj;
            }
            set barisObj(value) {
                this._barisObj = value;
            }
            _kataKunci2 = [
                "If", "ElseIf", "EndIf", "Else", "Then",
                "For", "Next", "To", "step",
                "Function", "end function",
                "While", "Wend",
                "const", "global", "local",
                "type", "field", "end type", "new",
                "delete", "before", "after", "each", "last",
                "//",
            ];
            _op = [
                "+",
                "/",
                "*",
                "-",
                "==",
                "<=",
                ">=",
                "<>",
                ">",
                "<",
                "!=",
                ";",
                "&&",
                "||",
                "not"
            ];
            _symbol = [
                '"',
                ".",
                "[",
                "{",
                "}",
                "]",
                ",",
                "(",
                ")",
                ":",
                "\\",
                "=",
                "//",
                "?",
                "&",
                " "
            ];
            _cmd = [
                "Graphics3D",
                "Include",
                "Global"
            ];
            get symbol() {
                return this._symbol;
            }
            get dataStr() {
                return this._dataStr;
            }
            set dataStr(value) {
                this._dataStr = value;
            }
            get token() {
                return this._token;
            }
            get barisAr() {
                return this._barisAr;
            }
            get kataKunci2() {
                return this._kataKunci2;
            }
            get op() {
                return this._op;
            }
            set op(value) {
                this._op = value;
            }
            get cmd() {
                return this._cmd;
            }
            set cmd(value) {
                this._cmd = value;
            }
        }
        class Config {
            _awaitFl = true;
            get awaitFl() {
                return this._awaitFl;
            }
            set awaitFl(value) {
                this._awaitFl = value;
            }
        }
        parse.data = new Data();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Exp {
            isExp(token) {
                if (!token)
                    return false;
                if (token.type == parse.Kons.TY_EXP)
                    return true;
                if (token.type == parse.Kons.TY_ANGKA)
                    return true;
                if (token.type == parse.Kons.TY_MIN)
                    return true;
                if (token.type == parse.Kons.TY_TEKS)
                    return true;
                if (token.type == parse.Kons.TY_BINOP)
                    return true;
                if (token.type == parse.Kons.TY_KATA)
                    return true;
                if (token.type == parse.Kons.TY_PANGGIL_FUNGSI)
                    return true;
                if (token.type == parse.Kons.TY_KATA_DOT)
                    return true;
                if (token.type == parse.Kons.TY_KURUNG_ISI)
                    return true;
                if (token.type == parse.Kons.TY_ARRAY)
                    return true;
                if (token.value && token.value.toLowerCase() == "true")
                    return true;
                if (token.value && token.value.toLowerCase() == "false")
                    return true;
                return false;
            }
            exp2() {
                function check(t0, t1, t2) {
                    if (!t1)
                        return false;
                    let ar = [
                        parse.Kons.TY_ANGKA,
                        parse.Kons.TY_BINOP,
                        parse.Kons.TY_TEKS,
                        parse.Kons.TY_KATA,
                        parse.Kons.TY_MIN,
                        parse.Kons.TY_PANGGIL_FUNGSI,
                        parse.Kons.TY_KURUNG_SINGLE
                    ];
                    if (ar.indexOf(t1.type) < 0)
                        return false;
                    if (t1.type == parse.Kons.TY_KATA) {
                        if (t2) {
                            if (t2.valueLowerCase == '(') {
                                return false;
                            }
                            if (t2.type == parse.Kons.TY_KURUNG_ARG)
                                return false;
                            if (t2.type == parse.Kons.TY_KURUNG_ARG2)
                                return false;
                            if (t2.type == parse.Kons.TY_KURUNG_ISI)
                                return false;
                            if (t2.type == parse.Kons.TY_KURUNG_KOSONG)
                                return false;
                            if (t2.type == parse.Kons.TY_KURUNG_SINGLE)
                                return false;
                        }
                    }
                    if (t1.type == parse.Kons.TY_KURUNG_SINGLE) {
                        if (t0 && t0.type == parse.Kons.TY_KATA) {
                            return false;
                        }
                    }
                    if (t1.type == parse.Kons.TY_KATA) {
                        if (t2 && ("." == t2.valueLowerCase)) {
                            return false;
                        }
                    }
                    if ("return" == t1.valueLowerCase)
                        return false;
                    if (t2 && t2.valueLowerCase == '=')
                        return false;
                    let ar2 = [
                        parse.Kons.TY_KATA,
                        parse.Kons.TY_TEKS,
                        parse.Kons.TY_EXP,
                        parse.Kons.TY_ARGUMENT,
                        parse.Kons.TY_ARGUMENT2,
                        parse.Kons.TY_ANGKA,
                        parse.Kons.TY_PANGGIL_FUNGSI
                    ];
                    if (t2) {
                        if (ar2.indexOf(t2.type) >= 0)
                            return false;
                    }
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let token0 = parse.parse.getToken(i - 1, parse.grammar.barisObj.token);
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let tokenBaru;
                    if (check(token0, token1, token2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_EXP,
                            token: [token1]
                        };
                        console.log("exp");
                        console.log((tokenBaru));
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            exp3() {
                return true;
            }
            isOp(token) {
                if (token.value == "+")
                    return true;
                if (token.value == "-")
                    return true;
                if (token.value == "*")
                    return true;
                if (token.value == "/")
                    return true;
                if (token.value == "%")
                    return true;
                if (token.value && token.value.toLowerCase() == "mod")
                    return true;
                if (token.type == parse.Kons.TY_OP)
                    return true;
                return false;
            }
            kataDot() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    if (token1.type == parse.Kons.TY_KATA) {
                        if (token2.value == '.') {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_KATA_DOT
                            };
                            console.log("kata dot:");
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            kataDotChain() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    if (token1.type == parse.Kons.TY_KATA_DOT) {
                        if (token2.type == parse.Kons.TY_KATA_DOT) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_KATA_DOT
                            };
                            console.log("kata dot chain:");
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            checkKataDotFinal(token) {
                if (token) {
                    if (token.type == parse.Kons.TY_KATA_DOT) {
                        return false;
                    }
                    else if (token.value == '.') {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
            kataDotFinal() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    let token0 = parse.parse.getToken(i - 1, parse.grammar.barisObj.token);
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    if (token1.type == parse.Kons.TY_KATA_DOT) {
                        if (token2.type == parse.Kons.TY_KATA) {
                            if (this.checkKataDotFinal(token0)) {
                                let tokenBaru = {
                                    token: [token1, token2],
                                    type: parse.Kons.TY_KATA
                                };
                                console.log("kata dot final:");
                                console.log(tokenBaru);
                                parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
            kotak() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    if (token1 && token1.value == "[") {
                        if (token2 && token2.value == "]") {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_KOTAK
                            };
                            console.log("kotak:");
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            kotak2() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    if (token1 && token1.type == parse.Kons.TY_KOTAK) {
                        if (token2 && token2.type == parse.Kons.TY_KOTAK) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_KOTAK
                            };
                            console.log("kotak 2:");
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            kotak3() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    if (token1 && token1.value == "[") {
                        if (parse.exp.isExp(token2)) {
                            if (token3 && token3.value == "]") {
                                let tokenBaru = {
                                    token: [token1, token2, token3],
                                    type: parse.Kons.TY_KOTAK
                                };
                                console.log("kotak isi:");
                                console.log(tokenBaru);
                                parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 2, tokenBaru);
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
            array2() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    if (token1 && token1.type == parse.Kons.TY_KATA) {
                        if (token2 && token2.type == parse.Kons.TY_KOTAK) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_ARRAY
                            };
                            console.log("array:");
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            arrayDot() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    if (token1 && token1.type == parse.Kons.TY_ARRAY) {
                        if (token2 && token2.value == ".") {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_KATA_DOT
                            };
                            console.log("array:");
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            kurungKosong() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    if (token1.value == "(") {
                        if (token2.value == ")") {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_KURUNG_KOSONG
                            };
                            console.log("kurung kosong:");
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            kurungSingle() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.valueLowerCase != '(')
                        return false;
                    if (t3.valueLowerCase != ')')
                        return false;
                    if (t2.type != parse.Kons.TY_EXP)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    if (check(token1, token2, token3)) {
                        ada = true;
                        let tokenBaru = {
                            token: [token1, token2, token3],
                            type: parse.Kons.TY_KURUNG_SINGLE
                        };
                        console.log("kurung single:");
                        console.log(parse.parse.tokenToAr(tokenBaru));
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        i--;
                    }
                }
                return ada;
            }
            binopIf() {
                function check(t0, t1, t2, t3) {
                    if (!t0)
                        return false;
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    let ar = ['if', 'while', 'until'];
                    if (ar.indexOf(t0.valueLowerCase) < 0)
                        return false;
                    if (parse.exp.isExp(t1) == false)
                        return false;
                    if (t2.valueLowerCase != '=')
                        return false;
                    if (parse.exp.isExp(t3) == false)
                        return false;
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let token0 = parse.parse.getToken(i - 1, parse.grammar.barisObj.token);
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    let tokenBaru;
                    if (check(token0, token1, token2, token3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_BINOP,
                            token: [token1, token2, token3]
                        };
                        console.log("binop if/until/while:");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            binop() {
                let ada = false;
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 3; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    let token3 = parse.grammar.barisObj.token[i + 2];
                    let tokenBaru;
                    if (this.isExp(token1)) {
                        if (this.isOp(token2)) {
                            if (this.isExp(token3)) {
                                tokenBaru = {
                                    type: parse.Kons.TY_BINOP,
                                    token: []
                                };
                                let tokenIsi = tokenBaru.token;
                                tokenIsi.push(token1);
                                tokenIsi.push(token2);
                                tokenIsi.push(token3);
                                console.log("binop:");
                                console.log(tokenBaru);
                                parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 2, tokenBaru);
                                ada = true;
                            }
                        }
                    }
                }
                return ada;
            }
            not() {
                let ada = false;
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    let tokenBaru;
                    if (check(token1, token2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_BINOP,
                            token: [token1, token2]
                        };
                        console.log("binop not:");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_OP)
                        return false;
                    if (t1.value.toLowerCase() != "not")
                        return false;
                    if (!parse.exp.isExp(t2))
                        return false;
                    return true;
                }
            }
            min() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    let token0 = parse.parse.getToken(i - 1, parse.grammar.barisObj.token);
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    let token3 = parse.grammar.barisObj.token[i + 2];
                    let tokenBaru;
                    let ok = true;
                    if ((token1.value != '-') && (token1.value != '+')) {
                        ok = false;
                    }
                    if (!this.isExp(token2)) {
                        ok = false;
                    }
                    if (this.isExp(token2)) {
                        if (token3 && token3.value == "(") {
                            ok = false;
                        }
                        if (token3 && token3.type == parse.Kons.TY_KURUNG_KOSONG) {
                            ok = false;
                        }
                        if (token3 && token3.type == parse.Kons.TY_KURUNG_ISI) {
                            ok = false;
                        }
                    }
                    if (token0 && this.isExp(token0))
                        ok = false;
                    if (token0 && token0.value == ')')
                        ok = false;
                    if (token0 && token0.type == parse.Kons.TY_KURUNG_ISI)
                        ok = false;
                    if (ok) {
                        tokenBaru = {
                            type: parse.Kons.TY_MIN,
                            token: []
                        };
                        let tokenIsi = tokenBaru.token;
                        tokenIsi.push(token1);
                        tokenIsi.push(token2);
                        console.log("min:");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                        return true;
                    }
                }
                return false;
            }
            checkArgument(tokenAr) {
                if (!tokenAr[1])
                    return false;
                if (!tokenAr[2])
                    return false;
                if (!tokenAr[3])
                    return false;
                if (this.isExp(tokenAr[1]) == false) {
                    if (tokenAr[1].type != parse.Kons.TY_ARGUMENT) {
                        return false;
                    }
                }
                if (!(tokenAr[2].value == ','))
                    return false;
                if (this.isExp(tokenAr[3]) == false)
                    return false;
                if (tokenAr[4] && tokenAr[4].value == "(")
                    return false;
                return true;
            }
            argument(token) {
                for (let i = 0; i < token.length; i++) {
                    if (this.checkArgument([
                        parse.parse.getToken(i - 1, token),
                        parse.parse.getToken(i + 0, token),
                        parse.parse.getToken(i + 1, token),
                        parse.parse.getToken(i + 2, token),
                        parse.parse.getToken(i + 3, token),
                    ])) {
                        let tokenBaru = {
                            token: [
                                parse.parse.getToken(i, token),
                                parse.parse.getToken(i + 1, token),
                                parse.parse.getToken(i + 2, token)
                            ],
                            type: parse.Kons.TY_ARGUMENT
                        };
                        console.log("arg2:");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 2, tokenBaru);
                        return true;
                    }
                    ;
                }
                return false;
            }
            panggilfungsi() {
                let ada = false;
                function check(t0, t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_KATA)
                        return false;
                    if ('dim' == t1.valueLowerCase)
                        return false;
                    if (t3) {
                        if (t3.valueLowerCase == '=') {
                            let ifAr = [
                                'if', 'while', 'until'
                            ];
                            if (t0 && ifAr.indexOf(t0.valueLowerCase) < 0) {
                                return false;
                            }
                            if (!t0)
                                return false;
                        }
                    }
                    let kurung = [
                        parse.Kons.TY_KURUNG_ARG,
                        parse.Kons.TY_KURUNG_ARG2,
                        parse.Kons.TY_KURUNG_ISI,
                        parse.Kons.TY_KURUNG_KOSONG,
                        parse.Kons.TY_KURUNG_SINGLE
                    ];
                    if (kurung.indexOf(t2.type) < 0)
                        return false;
                    if (t0 && 'function' == t0.valueLowerCase) {
                        return false;
                    }
                    if (t0 && 'dim' == t0.valueLowerCase) {
                        return false;
                    }
                    return true;
                }
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let token0 = parse.parse.getToken(i - 1, parse.grammar.barisObj.token);
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    if (check(token0, token1, token2, token3)) {
                        ada = true;
                        let tokenBaru = {
                            token: [token1, token2],
                            type: parse.Kons.TY_PANGGIL_FUNGSI
                        };
                        console.log("fungsi exp:");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        i--;
                    }
                }
                if (ada) {
                    parse.exp.exp2();
                }
                return ada;
            }
            getQuote2(idx) {
                for (let i = idx; i < parse.grammar.barisObj.token.length; i++) {
                    let item = parse.grammar.barisObj.token[i];
                    if (item.value == "\"") {
                        if (i == idx) {
                            return i;
                        }
                        else {
                            let itemSebelum = parse.grammar.barisObj.token[i - 1];
                            if (itemSebelum.value.toString() != "\\") {
                                return i;
                            }
                        }
                    }
                }
                return -1;
            }
            teks() {
                let idx = 0;
                let idx2 = 0;
                let l = 0;
                idx = this.getQuote2(0);
                if (idx == -1) {
                    return false;
                }
                idx2 = this.getQuote2(idx + 1);
                if (idx2 == -1) {
                    return false;
                }
                l = idx2 - idx;
                l;
                let tokenBaru = {
                    token: [],
                    type: parse.Kons.TY_TEKS
                };
                tokenBaru.token = parse.ar.ambilTengah(parse.grammar.barisObj.token, idx, idx2);
                console.log("teks:");
                console.log(tokenBaru);
                parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, idx, idx2, tokenBaru);
                return true;
            }
        }
        parse.exp = new Exp();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Grammar {
            _barisObj;
            get barisObj() {
                return this._barisObj;
            }
            set barisObj(value) {
                this._barisObj = value;
            }
            isStmt(token) {
                if (token.type == parse.Kons.TY_VAR_ASSIGNMENT)
                    return true;
                return false;
            }
            hapusSpace() {
                for (let i = 0; i < this._barisObj.token.length; i++) {
                    if (this._barisObj.token[i].value == ' ') {
                        this._barisObj.token = parse.ar.hapus(this._barisObj.token, i);
                        return true;
                    }
                }
                return false;
            }
            grammar() {
                console.group('grammar');
                while (this._barisObj.token.length > 1) {
                    if (false) { }
                    else if (parse.exp.teks()) { }
                    else if (this.hapusSpace()) { }
                    else if (parse.exp.exp2()) { }
                    else if (parse.exp.kataDotFinal()) { }
                    else if (parse.exp.kataDot()) { }
                    else if (parse.exp.kataDotChain()) { }
                    else if (parse.exp.kurungKosong()) { }
                    else if (parse.exp.kurungSingle()) { }
                    else if (parse.exp.panggilfungsi()) { }
                    else if (parse.exp.min()) { }
                    else if (parse.exp.binopIf()) { }
                    else if (parse.exp.binop()) { }
                    else if (parse.exp.not()) { }
                    else if (parse.exp.argument(this._barisObj.token)) { }
                    else if (parse.stmt.modifier()) { }
                    else if (parse.stmt.return1()) { }
                    else if (parse.stmt.return2()) { }
                    else if (parse.stmt.new2()) { }
                    else if (parse.stmt.forPendek()) { }
                    else if (parse.stmt.forStep()) { }
                    else if (parse.stmt.varAssign()) { }
                    else if (parse.stmt.ifPendek()) { }
                    else if (parse.stmt.ifPendekThen()) { }
                    else if (parse.stmt.ifPendekPerintah()) { }
                    else if (parse.stmt.elseIf()) { }
                    else if (parse.stmt.funcDec()) { }
                    else if (parse.stmt.while2()) { }
                    else if (parse.stmt.perintah2()) { }
                    else if (parse.stmt.dimDec()) { }
                    else if (parse.stmt.dimAssign()) { }
                    else {
                        console.log("error:");
                        console.log(this._barisObj.token);
                        throw Error('');
                    }
                }
                console.groupEnd();
            }
        }
        parse.grammar = new Grammar();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Kons {
            static TY_ANGKA = 1;
            static TY_KATA = 2;
            static TY_BARIS = 3;
            static TY_TEKS = 4;
            static TY_RES_WORD = 5;
            static TY_OP = 6;
            static TY_SYMBOL = 7;
            static TY_ARGUMENT = 100;
            static TY_ARGUMENT2 = 101;
            static TY_MIN = 102;
            static TY_KURUNG_KOSONG = 153;
            static TY_KURUNG_ISI = 154;
            static TY_KURUNG_SINGLE = 155;
            static TY_KURUNG_ARG = 156;
            static TY_KURUNG_ARG2 = 157;
            static TY_KATA_DOT = 200;
            static TY_BINOP = 201;
            static TY_PANGGIL_FUNGSI = 202;
            static TY_EXP = 203;
            static TY_KOTAK = 203;
            static TY_ARRAY = 204;
            static TY_VAR_ASSIGNMENT = 300;
            static TY_PERINTAH = 301;
            static TY_IF = 302;
            static TY_IFP = 303;
            static TY_ELSEIF = 304;
            static TY_FOR = 305;
            static TY_WEND = 306;
            static TY_FUNC_DEC = 307;
            static TY_RETURN = 308;
            static TY_MOD = 309;
            static TY_DIM_ASSINMENT = 400;
            static TY_DIM_DEC = 401;
            static TY_DIM_DEC_VAR = 402;
        }
        parse.Kons = Kons;
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Lexer {
            lexer() {
                console.group('lexer start');
                while (parse.data.dataStr.length > 0) {
                    if (this.getKeyword2()) {
                    }
                    else if (this.getOp()) {
                    }
                    else if (this.getCmd()) {
                    }
                    else if (this.getId()) {
                    }
                    else if (this.getLineBreak()) {
                    }
                    else if (this.getNumber()) {
                    }
                    else if (this.getSymbol()) {
                    }
                    else {
                        console.group('found unknown character');
                        console.log(parse.data.dataStr.slice(0, 10));
                        console.log(parse.data.dataStr.charCodeAt(0));
                        console.log(parse.data.dataStr.charAt(0));
                        console.groupEnd();
                        throw Error('');
                    }
                }
                parse.data.token.forEach((token) => {
                    token.valueLowerCase = '';
                    if (token.value) {
                        token.valueLowerCase = token.value.toLocaleLowerCase();
                    }
                });
                console.groupEnd();
            }
            getOp() {
                for (let i = 0; i < parse.data.op.length; i++) {
                    let kata = parse.data.op[i];
                    if (parse.data.dataStr.slice(0, kata.length).toLowerCase() == kata) {
                        parse.data.token.push({
                            value: kata,
                            type: parse.Kons.TY_OP
                        });
                        parse.data.dataStr = parse.data.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getCmd() {
                for (let i = 0; i < parse.data.cmd.length; i++) {
                    let kata = parse.data.cmd[i];
                    if (parse.data.dataStr.slice(0, kata.length).toLowerCase() == kata.toLowerCase()) {
                        parse.data.token.push({
                            value: kata,
                            type: parse.Kons.TY_KATA
                        });
                        parse.data.dataStr = parse.data.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getNumber() {
                let id = /^[0-9]*\.?[0-9]+/;
                let hsl = (parse.data.dataStr.match(id));
                let value;
                if (hsl) {
                    value = hsl + '';
                    parse.data.dataStr = parse.data.dataStr.slice(value.length);
                    let token = {
                        value: value + '',
                        type: parse.Kons.TY_ANGKA
                    };
                    parse.data.token.push(token);
                    return true;
                }
                return false;
            }
            getComment() {
                if (parse.data.dataStr.slice(0, 2) == '//') {
                    parse.data.dataStr = '';
                    return true;
                }
                return false;
            }
            getKeyword2() {
                for (let i = 0; i < parse.data.kataKunci2.length; i++) {
                    let kata = parse.data.kataKunci2[i];
                    if (parse.data.dataStr.slice(0, kata.length).toLowerCase() == kata.toLowerCase()) {
                        parse.data.token.push({
                            value: kata,
                            type: parse.Kons.TY_RES_WORD
                        });
                        parse.data.dataStr = parse.data.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getSymbol() {
                for (let i = 0; i < parse.data.symbol.length; i++) {
                    let kata = parse.data.symbol[i];
                    if (parse.data.dataStr.slice(0, kata.length).toLowerCase() == kata) {
                        parse.data.token.push({
                            value: kata,
                            type: parse.Kons.TY_SYMBOL
                        });
                        parse.data.dataStr = parse.data.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getId() {
                let id = /^[a-zA-Z_][a-zA-Z0-9_$%#@]*/;
                let hsl = (parse.data.dataStr.match(id));
                let value = '';
                if (hsl) {
                    parse.data.dataStr = parse.data.dataStr.slice(hsl[0].length);
                    value = hsl + '';
                    if (value.charAt(value.length - 1) == "#") {
                        value = value.slice(0, value.length - 1);
                    }
                    parse.data.token.push({
                        value: value,
                        type: parse.Kons.TY_KATA
                    });
                    return true;
                }
                return false;
            }
            getLineBreak() {
                if (parse.data.dataStr.charCodeAt(0) == 13) {
                    parse.data.dataStr = parse.data.dataStr.slice(1, parse.data.dataStr.length);
                    parse.data.token.push({
                        value: '\n',
                        type: parse.Kons.TY_BARIS
                    });
                    return true;
                }
                if (parse.data.dataStr.charCodeAt(0) == 10) {
                    parse.data.dataStr = parse.data.dataStr.slice(1, parse.data.dataStr.length);
                    parse.data.token.push({
                        value: '\n',
                        type: parse.Kons.TY_BARIS
                    });
                    return true;
                }
                if (parse.data.dataStr.charCodeAt(0) == 9) {
                    parse.data.dataStr = parse.data.dataStr.slice(1, parse.data.dataStr.length);
                    parse.data.token.push({
                        value: '\n',
                        type: parse.Kons.TY_BARIS
                    });
                    return true;
                }
                return false;
            }
        }
        parse.lexer = new Lexer();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse_1) {
        class Blitz {
            async parse(str) {
                parse_1.data.dataStr = str;
                parse_1.data.dataStr += ";;";
                parse_1.data.dataStr += "\r\n";
                while (parse_1.data.barisAr.length > 0) {
                    parse_1.data.barisAr.pop();
                }
                while (parse_1.data.token.length > 0) {
                    parse_1.data.token.pop();
                }
                parse_1.lexer.lexer();
                parse_1.baris.lines();
                console.group("grammar");
                for (let i = 0; i < parse_1.data.barisAr.length; i++) {
                    let barisObj = parse_1.data.barisAr[i];
                    parse_1.grammar.barisObj = barisObj;
                    parse_1.baris.renderLines(barisObj.token);
                    parse_1.grammar.grammar();
                }
                console.groupEnd();
                console.group("hasil:");
                for (let i = 0; i < parse_1.data.barisAr.length; i++) {
                }
                console.groupEnd();
                console.log("finish");
                return ha.parse.parse.blijs();
            }
            blijs() {
                let hsl = '';
                console.log('blijs');
                hsl += "async function Start() {\n";
                parse_1.data.barisAr.forEach((barisObj) => {
                    hsl += barisObj.terjemah + "\n";
                });
                hsl += `
                if (Loop) {
                    window.Loop = async () => {
                        await Loop();
                    }
                }
                else {
                    console.log("Loop doesn't exists");
                }
            `;
                hsl += "}\n";
                return hsl;
            }
            getToken(idx, token) {
                if (idx < 0)
                    return null;
                if (idx >= token.length)
                    return null;
                return token[idx];
            }
            tokenToAr(token) {
                let ar = [];
                if (token.value) {
                    ar.push(token.valueLowerCase);
                }
                else if (token.token) {
                    token.token.forEach((token2) => {
                        ar.push(this.tokenToAr(token2));
                    });
                }
                return ar;
            }
        }
        class Arr {
            kiri(token, idx) {
                return token.slice(0, idx);
            }
            kanan(token, idx) {
                return token.slice(idx + 1);
            }
            ambilTengah(token, idx, idx2) {
                return token.slice(idx, idx2 + 1);
            }
            ganti(token, idx, idx2, token2) {
                let kiri = this.kiri(token, idx);
                let kanan = this.kanan(token, idx2);
                let hasil = kiri.concat(token2).concat(kanan);
                return hasil;
            }
            hapus(token, idx) {
                let hasil;
                let kiri;
                let kanan;
                kiri = this.kiri(token, idx);
                kanan = this.kanan(token, idx);
                hasil = kiri.concat(kanan);
                return hasil;
            }
        }
        parse_1.ar = new Arr();
        parse_1.parse = new Blitz();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Stmt {
            Baru() {
                return false;
            }
            dimAssign() {
                function check(t1, t2, t3, t4) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (!t4)
                        return false;
                    if (t1.type != parse.Kons.TY_KATA)
                        return false;
                    let ar = [parse.Kons.TY_KURUNG_SINGLE, parse.Kons.TY_KURUNG_ARG2];
                    if (ar.indexOf(t2.type) < 0)
                        return false;
                    if (t3.valueLowerCase != '=')
                        return false;
                    if (t4.type != parse.Kons.TY_EXP)
                        return false;
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    let t4 = parse.parse.getToken(i + 3, parse.grammar.barisObj.token);
                    if (check(t1, t2, t3, t4)) {
                        let tokenBaru;
                        tokenBaru = {
                            type: parse.Kons.TY_DIM_ASSINMENT,
                            token: [t1, t2, t3, t4]
                        };
                        console.log("dim assign");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            dimDec() {
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.valueLowerCase != 'dim')
                        return false;
                    if (t2.type != parse.Kons.TY_KATA)
                        return false;
                    let ar = [parse.Kons.TY_KURUNG_ARG2, parse.Kons.TY_KURUNG_SINGLE];
                    if (ar.indexOf(t3.type) < 0)
                        return false;
                    return true;
                }
                let ada = false;
                for (let i = 0; i <= parse.grammar.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    if (check(t1, t2, t3)) {
                        let tokenBaru = {
                            token: [
                                t1,
                                t2,
                                t3
                            ],
                            type: parse.Kons.TY_DIM_DEC
                        };
                        console.log('dim dec: ');
                        console.log(parse.parse.tokenToAr(tokenBaru));
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            forPendek() {
                let ada = false;
                function check(t1, t2, t3, t4) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (!t4)
                        return false;
                    if ("for" != t1.valueLowerCase)
                        return false;
                    if (parse.Kons.TY_VAR_ASSIGNMENT != t2.type)
                        return false;
                    if ("to" != t3.valueLowerCase)
                        return false;
                    if (parse.Kons.TY_EXP != t4.type)
                        return false;
                    return true;
                }
                for (let i = 0; i <= parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    let token4 = parse.parse.getToken(i + 3, parse.grammar.barisObj.token);
                    if (check(token1, token2, token3, token4)) {
                        let tokenBaru = {
                            token: [
                                token1,
                                token2,
                                token3,
                                token4,
                            ],
                            type: parse.Kons.TY_FOR
                        };
                        console.log('for: ');
                        console.log(parse.parse.tokenToAr(tokenBaru));
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            forStep() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (parse.Kons.TY_FOR != t1.type)
                        return false;
                    if ("step" != t2.valueLowerCase)
                        return false;
                    if (parse.Kons.TY_EXP != t3.type)
                        return false;
                    return true;
                }
                for (let i = 0; i <= parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    if (check(token1, token2, token3)) {
                        let tokenBaru = {
                            token: [
                                token1,
                                token2,
                                token3,
                            ],
                            type: parse.Kons.TY_FOR
                        };
                        console.log('for step: ');
                        console.log(parse.parse.tokenToAr(tokenBaru));
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            funcDec() {
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.valueLowerCase != 'function')
                        return false;
                    if (t2.type != parse.Kons.TY_KATA)
                        return false;
                    let kurungAr = [
                        parse.Kons.TY_KURUNG_ARG,
                        parse.Kons.TY_KURUNG_ARG2,
                        parse.Kons.TY_KURUNG_SINGLE,
                        parse.Kons.TY_KURUNG_KOSONG
                    ];
                    if (kurungAr.indexOf(t3.type) < 0)
                        return false;
                    return true;
                }
                let ada = false;
                for (let i = 0; i <= parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    if (check(token1, token2, token3)) {
                        let tokenBaru = {
                            token: [
                                token1,
                                token2,
                                token3
                            ],
                            type: parse.Kons.TY_FUNC_DEC
                        };
                        console.log('func dec: ');
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            elseIf() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    if (token1 && token1.value && token1.value.toLowerCase() == "elseif") {
                        if (parse.exp.isExp(token2)) {
                            if (token3 && token3.value && token3.value.toLowerCase() == "then") {
                                let tokenBaru = {
                                    token: [
                                        token1,
                                        token2,
                                        token3
                                    ],
                                    type: parse.Kons.TY_ELSEIF
                                };
                                console.log('else IF: ');
                                console.log(tokenBaru);
                                parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 2, tokenBaru);
                                return true;
                            }
                            else {
                            }
                        }
                        else {
                        }
                    }
                    else {
                    }
                }
                return false;
            }
            ifPendekPerintah() {
                let ada = false;
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    let tokenBaru;
                    if (check(token1, token2, token3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_IF,
                            token: [token1, token2]
                        };
                        console.log("if pendek + perintah:");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                        ada = true;
                        i--;
                    }
                }
                return ada;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t3)
                        return false;
                    if (t1.type != parse.Kons.TY_IF)
                        return false;
                    if (t2.type != parse.Kons.TY_PERINTAH) {
                        if (parse.exp.isExp(t2) == false) {
                            if (t2.value && (t2.value.toLowerCase()) != "return") {
                                return false;
                            }
                        }
                    }
                    return true;
                }
            }
            ifPendekThen() {
                let ada = false;
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    let tokenBaru;
                    if (check(token1, token2, token3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_IF,
                            token: [token1, token2]
                        };
                        console.log("if then:");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                        ada = true;
                        i--;
                    }
                }
                return ada;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_IF)
                        return false;
                    if (!t2.value)
                        return false;
                    if (t2.value.toLowerCase() != "then")
                        return false;
                    t3;
                    return true;
                }
            }
            ifPendek() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t1.value)
                        return false;
                    if (t1.value.toLowerCase() != "if")
                        return false;
                    if (t2.type != parse.Kons.TY_EXP)
                        return false;
                    t3;
                    if (t3) {
                        if (t3.valueLowerCase == '=')
                            return false;
                        console.log('t3 value lolos: ' + t3.valueLowerCase);
                        console.log(t3);
                    }
                    else {
                        console.debug('t3 null');
                    }
                    return true;
                }
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    let tokenBaru;
                    if (check(token1, token2, token3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_IF,
                            token: [token1, token2]
                        };
                        console.log("if pendek:");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                        ada = true;
                        i--;
                    }
                }
                return ada;
            }
            modifier() {
                let ada = false;
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    let modAr = [
                        "const",
                        "global",
                        "local"
                    ];
                    if (modAr.indexOf(t1.valueLowerCase) < 0)
                        return false;
                    if (t2.type != parse.Kons.TY_KATA)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    if (check(token1, token2)) {
                        let tokenBaru;
                        tokenBaru = {
                            type: parse.Kons.TY_MOD,
                            token: [token1, token2]
                        };
                        console.log("modifier");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            new2() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    if (token1.value && token1.value.toLowerCase() == "new") {
                        if (token2.type == parse.Kons.TY_KATA || (token2.type == parse.Kons.TY_PANGGIL_FUNGSI)) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_PERINTAH
                            };
                            console.log("new:");
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            perintah2() {
                function check(t0, t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t3)
                        return false;
                    if (t1.type != parse.Kons.TY_KATA)
                        return false;
                    if (t1.valueLowerCase == 'dim')
                        return false;
                    if (!parse.exp.isExp(t2)) {
                        if (t2.type != parse.Kons.TY_ARGUMENT) {
                            return false;
                        }
                    }
                    console.log('check t0 ' + t0);
                    if (t0) {
                        console.log('check type ' + t0.type);
                        console.log('check value ' + t0.valueLowerCase);
                        if (t0.type == parse.Kons.TY_EXP) {
                            return false;
                        }
                    }
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let t0 = parse.parse.getToken(i - 1, parse.grammar.barisObj.token);
                    let t1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    let tokenBaru;
                    if (check(t0, t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_PERINTAH,
                            token: [t1, t2]
                        };
                        console.log("perintah:");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                        ada = true;
                        i--;
                    }
                }
                return ada;
            }
            return2() {
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t3)
                        return false;
                    if (t1.valueLowerCase != "return")
                        return false;
                    if (parse.exp.isExp(t2) == false)
                        return false;
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    let tokenBaru;
                    if (check(token1, token2, token3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_RETURN,
                            token: [token1, token2]
                        };
                        console.log("return 2");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                        ada = true;
                        i--;
                    }
                }
                return ada;
            }
            return1() {
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (t2)
                        return false;
                    if (t1.valueLowerCase != "return")
                        return false;
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let tokenBaru;
                    if (check(token1, token2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_RETURN,
                            token: [token1]
                        };
                        console.log("return 1");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 0, tokenBaru);
                        ada = true;
                        i--;
                    }
                }
                return ada;
            }
            varAssign() {
                function check(t0, t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    let ar = [
                        parse.Kons.TY_MOD,
                        parse.Kons.TY_KATA
                    ];
                    if (ar.indexOf(t1.type) < 0)
                        return false;
                    if (t2.valueLowerCase != '=')
                        return false;
                    let ar2 = [
                        parse.Kons.TY_EXP,
                        parse.Kons.TY_DIM_DEC
                    ];
                    if (ar2.indexOf(t3.type) < 0)
                        return false;
                    if (t1.type == parse.Kons.TY_KATA) {
                        if (t0 && t0.valueLowerCase == 'global')
                            return false;
                        if (t0 && t0.valueLowerCase == 'const')
                            return false;
                        if (t0 && t0.valueLowerCase == 'local')
                            return false;
                    }
                    return true;
                }
                let ada = false;
                for (let i = 0; i <= parse.grammar.barisObj.token.length; i++) {
                    let t0 = parse.grammar.barisObj.token[i - 1];
                    let t1 = parse.grammar.barisObj.token[i + 0];
                    let t2 = parse.grammar.barisObj.token[i + 1];
                    let t3 = parse.grammar.barisObj.token[i + 2];
                    if (check(t0, t1, t2, t3)) {
                        let tokenBaru = {
                            token: [
                                t1,
                                t2,
                                t3
                            ],
                            type: parse.Kons.TY_VAR_ASSIGNMENT
                        };
                        console.log('var Assign:');
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            while2() {
                let ada = false;
                for (let i = 0; i < parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.grammar.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    let tokenBaru;
                    if (check(token1, token2, token3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_WEND,
                            token: [token1, token2]
                        };
                        console.log("while:");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                        ada = true;
                        i--;
                    }
                }
                return ada;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t3)
                        return false;
                    if (!t1.value)
                        return false;
                    if (t1.value.toLowerCase() != 'while')
                        return false;
                    if (parse.exp.isExp(t2) == false)
                        return false;
                    return true;
                }
            }
        }
        parse.stmt = new Stmt();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Terjemah {
            terjemah(token) {
                console.log("terjemah");
                console.log(token);
                if (false) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_VAR_ASSIGNMENT) {
                    return this.varAssign(token);
                }
                else if (token.type == parse.Kons.TY_ANGKA) {
                    return token.value;
                }
                else if (token.type == parse.Kons.TY_ARGUMENT) {
                    return this.terjemah(token.token[0]) + ',' + this.terjemah(token.token[2]);
                }
                else if (token.type == parse.Kons.TY_RES_WORD) {
                    if (token.value.toLowerCase() == "wend") {
                        return "}";
                    }
                    else if (token.value.toLowerCase() == "next") {
                        return "}";
                    }
                    else if (token.value.toLowerCase() == 'end function') {
                        return "}";
                    }
                    else if (token.value.toLowerCase() == "endif") {
                        return "}";
                    }
                    else if (token.value.toLowerCase() == "else") {
                        return "} else {";
                    }
                    else if (token.value.toLowerCase() == "function") {
                        return "function ";
                    }
                    else if (token.value.toLowerCase() == "return") {
                        return "return ";
                    }
                    else if (token.value.toLowerCase() == "mod") {
                        return " % ";
                    }
                    else if (token.value.toLowerCase() == "cls") {
                        return "Cls()";
                    }
                    else {
                        return token.value;
                    }
                }
                else if (token.type == parse.Kons.TY_BINOP) {
                    if (token.token.length == 2) {
                        return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                    }
                    else if (token.token.length == 3) {
                        return this.terjemah(token.token[0]) + " " + this.terjemah(token.token[1]) + " " + this.terjemah(token.token[2]);
                    }
                    else {
                        throw new Error();
                    }
                }
                else if (token.type == parse.Kons.TY_TEKS) {
                    return this.string(token.token);
                }
                else if (token.type == parse.Kons.TY_BARIS) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_FOR) {
                    let hasil = '';
                    hasil += 'for (let ' + this.terjemah(token.token[1]) + " = " + this.terjemah(token.token[3]) + ";";
                    hasil += ' ' + this.terjemah(token.token[1]) + " <= " + this.terjemah(token.token[5]) + ";";
                    hasil += ' ' + this.terjemah(token.token[1]) + '++) {';
                    return hasil;
                }
                else if (token.type == parse.Kons.TY_IF) {
                    return 'if (' + this.terjemah(token.token[1]) + ") {";
                }
                else if (token.type == parse.Kons.TY_IFP) {
                    return this.terjemah(token.token[0]) + " " + this.terjemah(token.token[1]) + " }";
                }
                else if (token.type == parse.Kons.TY_KATA) {
                    if (token.token && token.token.length == 2) {
                        return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                    }
                    else if (token.value) {
                        return token.value;
                    }
                    else {
                        throw Error('');
                    }
                }
                else if (token.type == parse.Kons.TY_KATA_DOT) {
                    return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                }
                else if (token.type == parse.Kons.TY_KURUNG_ISI) {
                    return this.terjemah(token.token[0]) + this.terjemah(token.token[1]) + this.terjemah(token.token[2]);
                }
                else if (token.type == parse.Kons.TY_KURUNG_KOSONG) {
                    return "()";
                }
                else if (token.type == parse.Kons.TY_MIN) {
                    return token.token[0].value + this.terjemah(token.token[1]);
                }
                else if (token.type == parse.Kons.TY_OP) {
                    if (token.value == "<>") {
                        return "!=";
                    }
                    else if (token.value.toLowerCase() == "mod") {
                        return " % ";
                    }
                    return token.value;
                }
                else if (token.type == parse.Kons.TY_PANGGIL_FUNGSI) {
                    let hsl = '';
                    hsl = this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                    if (parse.data.config.awaitFl) {
                        hsl = hsl.trim();
                        hsl = 'await ' + hsl;
                    }
                    return hsl;
                }
                else if (token.type == parse.Kons.TY_PERINTAH) {
                    let hsl = '';
                    if (token.token.length == 2) {
                        if (token.token[0].value && token.token[0].value.toLowerCase() == 'global') {
                            return 'window.' + this.terjemah(token.token[1]) + ';';
                        }
                        else {
                            hsl = this.terjemah(token.token[0]) + "(" + this.terjemah(token.token[1]) + ")";
                        }
                    }
                    else if (token.token.length == 1) {
                        if (token.value && token.value.toLowerCase() == 'wend') {
                            return "}";
                        }
                        else {
                            hsl = this.terjemah(token.token[0]) + "()";
                        }
                    }
                    else {
                        throw Error("");
                    }
                    if (parse.data.config.awaitFl) {
                        hsl = hsl.trim();
                        if (hsl.slice(0, 6) == 'return') {
                        }
                        else {
                            hsl = 'await ' + hsl;
                        }
                    }
                    return hsl;
                }
                else if (token.type == parse.Kons.TY_WEND) {
                    return this.wend(token);
                }
                else if (token.type == parse.Kons.TY_SYMBOL) {
                    if (token.value == ".")
                        return token.value;
                    return token.value + " ";
                }
                else if (token.type == parse.Kons.TY_ELSEIF) {
                    return "} else if " + " (" + this.terjemah(token.token[1]) + ") " + " { ";
                }
                else if (token.type == parse.Kons.TY_FUNC_DEC) {
                    let hsl = '';
                    let st = parse.data.config.awaitFl;
                    parse.data.config.awaitFl = false;
                    hsl = token.token[0].value.toLowerCase() + " " + this.terjemah(token.token[1]) + " {";
                    parse.data.config.awaitFl = st;
                    if (parse.data.config.awaitFl) {
                        hsl = 'async ' + hsl;
                    }
                    return hsl;
                }
                else if (token.type == parse.Kons.TY_KOTAK) {
                    if (token.token.length == 2) {
                        return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                    }
                    else if (token.token.length == 3) {
                        return this.terjemah(token.token[0]) + this.terjemah(token.token[1]) + this.terjemah(token.token[2]);
                    }
                    else {
                        throw Error('Error parsing: ' + (parse.data.barisObj ? parse.data.barisObj.baris : "unknown line"));
                    }
                }
                else if (token.type == parse.Kons.TY_ARRAY) {
                    return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                }
                else if (token.type == parse.Kons.TY_RETURN) {
                    if (token.token.length == 1) {
                        return "return";
                    }
                    else if (token.token.length == 2) {
                        return this.terjemah(token.token[0]) + " " + this.terjemah(token.token[1]);
                    }
                    else {
                        throw Error();
                    }
                }
                else {
                    throw Error();
                }
            }
            string(token) {
                let hasil = '';
                token.forEach((item) => {
                    hasil += item.value;
                });
                return " " + hasil;
            }
            wend(token) {
                let hasil = '';
                hasil += token.token[0].value.toLowerCase();
                hasil += " (" + this.terjemah(token.token[1]) + ") {";
                return hasil;
            }
            varAssign(token) {
                if (token.token.length == 2) {
                    let token1 = token.token[0].value.toLowerCase();
                    let token2 = this.terjemah(token.token[1]);
                    if (token1 == "global") {
                        return "window." + token2;
                    }
                    else if (token1 == "const") {
                        return "const " + token2;
                    }
                    else {
                        console.log('token 1 ' + token1);
                        console.log('token 2 ' + token2);
                        throw Error("");
                    }
                }
                else if (token.token.length == 3) {
                    return this.terjemah(token.token[0]) + "=" + this.terjemah(token.token[2]);
                }
                else {
                    throw Error('');
                }
            }
        }
        parse.terj = new Terjemah();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
