const parser: Parser = new Parser();

push(cadangan);
push(stmtOpr);
push(binopOpr);
push(pintasan);

load().then((hasil: string) => {
    parser.pecah(hasil);
    console.log(token);
    Grammar.check();
});
