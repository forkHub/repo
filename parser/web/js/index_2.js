function push(kata) {
    kata.forEach((item) => {
        parser.kataCadangan.push(item);
    });
}
async function load() {
    return await ha.comp.Util.Ajax2('get', './data/test.txt', '');
}
