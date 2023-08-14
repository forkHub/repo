var ha;
(function (ha) {
    var parse;
    (function (parse) {
        var js;
        (function (js) {
            class Terjemah {
                static kedalaman = [];
                static kurungStak = [];
                static kontek = [];
                static kontekBinopMin = false;
                static tab = 0;
                static async terjemah(data) {
                    let hasil = '';
                    this.kedalaman.push(data.nama);
                    if (data.nama == parse.Kons.STMT) {
                        console.log('');
                    }
                    console.log('terjemah ' + data.nama);
                    if (data.nilai.length > 0) {
                        let kata = data.nilai[0];
                        if (data.nama == parse.Kons.OPR) {
                            hasil += ' ' + kata + ' ';
                        }
                        else {
                            hasil += this.terjemahKata(kata);
                        }
                        // if (kata == '{') {
                        // 	hasil += '\n';
                        // }
                        // else if (kata == '}') {
                        // 	hasil += '\n';
                        // }
                    }
                    else if (data.token.length > 0) {
                        hasil += await this.terjemahGenerik(data);
                    }
                    else {
                        throw Error('item belum di kerjakan: ' + data.nama);
                    }
                    this.kedalaman.pop();
                    return hasil;
                }
                static async terjemahGenerik(data) {
                    let hasil = '';
                    if (data.nama == parse.Kons.FOR_STMT) {
                        let varIsi = [];
                        let varIsiStr;
                        this.getVarIsi(data, varIsi);
                        varIsiStr = await this.terjemah(varIsi[0]);
                        let binop = [];
                        this.getToken(data, binop, parse.Kons.BINOP);
                        this.kontek.push(data.nama);
                        let hasil = this.spasiTab() + 'for ' + varIsiStr + ' to ' + (await this.terjemah(binop[0].token[2])) + '';
                        let kr = [];
                        this.getToken(data, kr, '{}');
                        hasil += await this.terjemah(kr[0]);
                        return hasil;
                    }
                    if (data.nama == parse.Kons.BINOP) {
                        if (data.token.length == 2) {
                            let hasil = '';
                            hasil += await this.terjemah(data.token[0]);
                            hasil += ' ';
                            this.kontekBinopMin = true;
                            hasil += await this.terjemah(data.token[1]);
                            this.kontekBinopMin = false;
                            return hasil;
                        }
                    }
                    if (data.nama == parse.Kons.MIN) {
                        if (this.kontekBinopMin) {
                            debugger;
                            let hasil = '';
                            hasil += await this.terjemah(data.token[0]);
                            hasil += ' ';
                            hasil += await this.terjemah(data.token[1]);
                            return hasil;
                        }
                    }
                    for (let i = 0; i < data.token.length; i++) {
                        hasil += await this.terjemah(data.token[i]);
                    }
                    return hasil;
                }
                static spasiTab() {
                    let hasil = '';
                    for (let i = 0; i < this.tab; i++) {
                        hasil += '    ';
                    }
                    return hasil;
                }
                static terjemahKata(kata) {
                    if (kata == '=') {
                        return ' = ';
                    }
                    if (kata == 'while') {
                        this.kontek.push(kata);
                    }
                    if (kata == 'else') {
                        this.kontek.push(kata);
                    }
                    if (kata == 'else if') {
                        this.kontek.push(kata);
                        return 'ElseIf ';
                    }
                    if (kata == '(') {
                        this.kurungStak.push(0);
                        console.log('push: ' + this.kurungStak.length);
                    }
                    if (kata == ')') {
                        this.kurungStak.pop();
                        console.log('pop: ' + this.kurungStak.length);
                    }
                    if (kata == '{') {
                        this.tab++;
                        if (this.kontek.length > 0) {
                            let kontekStr = this.kontek[this.kontek.length - 1];
                            if (kontekStr == 'function') {
                                return '\n';
                            }
                            else if (kontekStr == 'while') {
                                return '\n';
                            }
                            else if (kontekStr == 'else if') {
                                return '\n';
                            }
                            else if (kontekStr == 'else') {
                                return '\n';
                            }
                            else if (kontekStr == parse.Kons.FOR_STMT) {
                                return '\n';
                            }
                            else if (kontekStr == 'if') {
                                return ' Then\n';
                            }
                        }
                    }
                    if (kata == '}') {
                        this.tab--;
                        let kstr = this.kontek.pop();
                        if (kstr == 'if') {
                            return this.spasiTab() + 'EndIf\n';
                        }
                        else if (kstr == 'while') {
                            return this.spasiTab() + 'Wend\n';
                        }
                        else if (kstr == 'else if') {
                            return '\n';
                        }
                        else if (kstr == 'else') {
                            return this.spasiTab() + 'EndIf\n';
                        }
                        else if (kstr == parse.Kons.FOR_STMT) {
                            return this.spasiTab() + 'Next\n';
                        }
                        else if (kstr == 'function') {
                            return this.spasiTab() + 'EndFunction\n';
                        }
                    }
                    if (kata == 'function') {
                        this.kontek.push(kata);
                        return this.spasiTab() + 'Function ';
                    }
                    if (kata == 'if') {
                        this.kontek.push(kata);
                        return this.spasiTab() + 'If ';
                    }
                    if (kata == ';') {
                        console.log('stack lengh ' + this.kurungStak.length);
                        // debugger;
                        if (this.kurungStak.length > 0) {
                            return '; ';
                        }
                        else {
                            return '\n';
                        }
                    }
                    //check spasi
                    let spasi = this.checkSpasi(kata);
                    if (spasi) {
                        kata += ' ';
                    }
                    kata = this.spasiTab() + kata;
                    return kata;
                }
                static checkSpasi(kata) {
                    for (let i = 0; i < parse.parser.kataCadangan.length; i++) {
                        if (kata == parse.parser.kataCadangan[i]) {
                            if (kata == 'true')
                                return false;
                            if (kata == 'false')
                                return false;
                            return true;
                        }
                    }
                    if (kata == ',')
                        return true;
                    return false;
                }
                static getVarIsi(token, hasil) {
                    this.getToken(token, hasil, parse.Kons.VAR_ISI);
                }
                static getToken(tokenSumber, hasil, namaToken) {
                    if (hasil.length > 0) {
                        return;
                    }
                    if (tokenSumber.nama == namaToken) {
                        hasil.push(tokenSumber);
                        return;
                    }
                    for (let i = 0; i < tokenSumber.token.length; i++) {
                        this.getToken(tokenSumber.token[i], hasil, namaToken);
                    }
                }
            }
            js.Terjemah = Terjemah;
        })(js = parse.js || (parse.js = {}));
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
