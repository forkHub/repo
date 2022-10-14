function push(kata: string[]) {
    kata.forEach((item: string) => {
        parser.kataCadangan.push(item);
    })
}

async function load(): Promise<string> {
    return await ha.comp.Util.Ajax2('get', './data/test.txt', '');
}
