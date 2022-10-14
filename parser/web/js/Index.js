const parser = new Parser();
push(cadangan);
push(stmtOpr);
push(binopOpr);
push(pintasan);
load().then((hasil) => {
    parser.pecah(hasil);
    console.log(token);
    Grammar.check();
});
