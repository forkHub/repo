const parser = new Leksikal();
pushRumus(expToken);
pushRumus(rumusKurung);
pushRumus(rumusBinop);
pushRumus(rumusArray);
pushRumus(rumusLain);
pushRumus(rumusStmt);
pushCadangan(cadangan);
pushCadangan(stmtOpr);
binopOpr.forEach((item) => {
    parser.binopOpr.push(item);
});
async function init() {
    let cache = window.localStorage.getItem('parse');
    let file = await load();
    let reload = true;
    if (reload) {
        cache = '';
    }
    if (cache && cache != '') {
        let data = JSON.parse(cache);
        let terj = await Terjemah.terjemah(data[0]);
        console.log(terj);
    }
    else {
        await parser.pecah(file);
        console.log(renderToken(token));
        await Grammar.check();
        console.log(token);
        window.localStorage.setItem('parse', JSON.stringify(token));
        let terj = await Terjemah.terjemah(token[0]);
        console.log(terj);
    }
}
init().then(() => {
    console.log('selesai');
    console.log(Terjemah.kedalaman);
}).catch((e) => {
    console.log(e);
});
