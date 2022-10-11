const parser = new Parser();
parser.kataCadangan.push('><');
parser.kataCadangan.push('[{');
parser.pecah('131233=>/?><[{ ]}-313131');
console.log(parser.kata);
