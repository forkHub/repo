var ha;
(function (ha) {
    var parse;
    (function (parse) {
        var basic;
        (function (basic) {
            async function init() {
                let file = await parse.load('./data/test_js.vb');
                let barisAr = file.split('\n');
                for (let i = 0; i < barisAr.length; i++) {
                    console.group('parse ' + barisAr[i]);
                    while (parse.token.length > 0) {
                        parse.token.pop();
                    }
                    await parse.parser.pecah(barisAr[i]);
                    await parse.Grammar.check();
                    console.log(parse.token);
                    console.groupEnd();
                    if (parse.token.length > 1) {
                        throw Error('');
                    }
                }
                window.localStorage.setItem('parse', JSON.stringify(parse.token));
            }
            basic.init = init;
            parse.pushRumus(basic.expToken);
            parse.pushRumus(basic.rumusKurung);
            parse.pushRumus(basic.rumusBinop);
            parse.pushRumus(basic.rumusArray);
            parse.pushRumus(basic.rumusLain);
            parse.pushRumus(basic.rumusStmt);
            parse.pushCadangan(basic.cadangan);
            basic.binopOpr.forEach((item) => {
                parse.parser.binopOpr.push(item);
            });
            init().then(() => {
                console.log('selesai');
                console.log(basic.Terjemah.kedalaman);
            }).catch((e) => {
                console.log(e);
            });
        })(basic = parse.basic || (parse.basic = {}));
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
