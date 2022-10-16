class Terjemah {
    static async terjemah(data) {
        let hasil = '';
        debugOn();
        if (data.nama == Kons.STMT) {
            debugLog('');
        }
        debugLog('terjemah ' + data.nama);
        // debugLog(data);
        if (data.nama == Kons.STMT2) {
            hasil += await this.terjmahStmt2(data);
        }
        // else if (data.nama == Kons.STMT) {
        // 	hasil += await this.terjemahStmt(data);
        // }
        else if (data.nama == Kons.IF_ELSE) {
            hasil += await this.terjemahIfElse(data);
        }
        else if (data.nama == Kons.IF) {
            hasil += await this.terjmahIf(data);
        }
        // else if (data.nama == '{}') {
        // 	hasil += await this.terjemahKurungKeriting(data);
        // }
        //exp
        else if (data.nama == Kons.EXP) {
            // debugLog('exp__');
            hasil += await this.terjemahExp(data);
        }
        else if (data.nama == '()') {
            hasil += await this.terjemahKurung(data);
        }
        // else if (data.nama == Kons.BINOP) {
        // 	hasil += await this.terjemahBinop(data);
        // }
        else if (data.nilai.length > 0) {
            let kata = data.nilai[0];
            hasil += kata + ' ';
            if (kata == '{') {
                hasil += '\n';
            }
            else if (kata == '}') {
                hasil += '\n';
            }
        }
        else if (data.token.length > 0) {
            hasil += await this.terjemahGenerik(data);
        }
        else {
            throw Error('item belum di kerjakan: ' + data.nama);
        }
        return hasil;
    }
    static async terjemahGenerik(data) {
        let hasil = '';
        for (let i = 0; i < data.token.length; i++) {
            hasil += await this.terjemah(data.token[i]);
        }
        return hasil;
    }
    // private static async terjemahKurungKeriting(data: IToken): Promise<string> {
    // 	let hasil: string = '';
    // 	if (data.token.length == 2) {
    // 		hasil += '{}';
    // 	}
    // 	else if (data.token.length == 3) {
    // 		hasil += '{' + await this.terjemah(data.token[1]) + '}';
    // 	}
    // 	else {
    // 		debugger;
    // 	}
    // 	return hasil;
    // }
    // private static async terjemahBinop(data: IToken): Promise<string> {
    // 	let hasil: string = '';
    // 	for (let i: number = 0; i < data.token.length; i++) {
    // 		hasil += await this.terjemah(data.token[i]);
    // 	}
    // 	return hasil;
    // }
    static async terjemahKurung(data) {
        if (data.token.length == 1) {
            return await this.terjemah(data.token[0]);
        }
        else {
            let hasil = '';
            for (let i = 0; i < data.token.length; i++) {
                hasil += await this.terjemah(data.token[i]);
            }
            return hasil;
        }
    }
    static async terjemahExp(data) {
        return await this.terjemah(data.token[0]);
    }
    //'if', Kons.EXP, '{}'
    static async terjmahIf(data) {
        let hasil = '';
        hasil += 'if ' + await this.terjemah(data.token[1]) + await this.terjemah(data.token[2]);
        return hasil;
    }
    static async terjemahIfElse(data) {
        let hasil = '';
        for (let i = 0; i < data.token.length; i++) {
            hasil += await this.terjemah(data.token[i]);
        }
        return hasil;
    }
    // private static async terjemahStmt(data: IToken): Promise<string> {
    // 	let hasil: string = '';
    // 	if (data.nama != Kons.STMT) throw Error('');
    // 	for (let i: number = 0; i < data.token.length; i++) {
    // 		hasil += await this.terjemah(data.token[i]);
    // 	}
    // 	return hasil;
    // }
    static async terjmahStmt2(data) {
        if (data.nama != Kons.STMT2)
            throw Error('');
        let stmtAr = [];
        let hasil = '';
        //pecah statement
        this.pecahStmt(data, stmtAr);
        for (let i = 0; i < stmtAr.length; i++) {
            hasil += await this.terjemah(stmtAr[i]);
        }
        return hasil;
    }
    static pecahStmt(data, hasil) {
        if (data.nama != Kons.STMT2)
            throw Error('');
        let tokenAr = data.token;
        // debugger;
        hasil.unshift(tokenAr[1]);
        if (tokenAr[0].nama == Kons.STMT) {
            hasil.unshift(tokenAr[0]);
            return;
        }
        else if (tokenAr[0].nama == Kons.STMT2) {
            this.pecahStmt(tokenAr[0], hasil);
        }
        else {
            throw Error('');
        }
    }
}
class Kondisi {
    static async check(data) {
        data;
        // if (data.nama = Kons.ELSE_IF_ELSE) {
        // 	Terjemah.hasil += await this.terjemahElseIfElse(data);
        // }
        // if (data.nama = Kons.ELSE) {
        // 	return false;
        // 	// Terjemah.hasil += await this.terjemahElseIfElse(data);
        // }
        // if (data.nama = Kons.ELSE_IF) {
        // 	return false;
        // 	// Terjemah.hasil += await this.terjemahElseIfElse(data);
        // }
        // if (data.nama = Kons.ELSE_IF2) {
        // 	return false;
        // 	// Terjemah.hasil += await this.terjemahElseIfElse(data);
        // }
        // if (data.nama = Kons.IF) {
        // 	return false;
        // 	// Terjemah.hasil += await this.terjemahElseIfElse(data);
        // }
        // else {
        // 	return false;
        // }
        return false;
    }
    //Kons.ELSE_IF2, Kons.ELSE
    //Kons.ELSE_IF, Kons.ELSE
    static async terjemahElseIfElse(data) {
        let hasil = '';
        for (let i = 0; i < data.token.length; i++) {
            hasil += await Terjemah.terjemah(data.token[i]);
        }
        return hasil;
    }
    static async terjemahElseIf(data) {
        let hasil = '';
        for (let i = 0; i < data.token.length; i++) {
            hasil += await Terjemah.terjemah(data.token[i]);
        }
        return hasil;
    }
    //'else', '{}'
    static async terjemahElse(data) {
        let hasil = '';
        hasil += ' else ' + await Terjemah.terjemah(data.token[1]);
        return hasil;
    }
}
