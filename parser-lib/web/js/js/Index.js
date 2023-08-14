var ha;
(function (ha) {
    var parse;
    (function (parse) {
        var js;
        (function (js) {
            parse.pushRumus(js.expToken);
            parse.pushRumus(js.rumusKurung);
            parse.pushRumus(js.rumusBinop);
            parse.pushRumus(js.rumusArray);
            parse.pushRumus(js.rumusLain);
            parse.pushRumus(js.rumusStmt);
            parse.pushCadangan(js.cadangan);
            parse.pushCadangan(js.stmtOpr);
            js.binopOpr.forEach((item) => {
                parse.parser.binopOpr.push(item);
            });
            async function init() {
                let cache = window.localStorage.getItem('parse');
                let file = await parse.load('./data/test_js.vb');
                let reload = true;
                if (reload) {
                    cache = '';
                }
                if (cache && cache != '') {
                    let data = JSON.parse(cache);
                    let terj = await js.Terjemah.terjemah(data[0]);
                    console.log(terj);
                }
                else {
                    await parse.parser.pecah(file);
                    console.log(parse.renderToken(parse.token));
                    await parse.Grammar.check();
                    console.log(parse.token);
                    window.localStorage.setItem('parse', JSON.stringify(parse.token));
                    let terj = await js.Terjemah.terjemah(parse.token[0]);
                    console.log(terj);
                }
            }
            js.init = init;
            init().then(() => {
                console.log('selesai');
                console.log(js.Terjemah.kedalaman);
            }).catch((e) => {
                console.log(e);
            });
        })(js = parse.js || (parse.js = {}));
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
