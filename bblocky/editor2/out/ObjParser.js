export class ObjectParser {
    static parse(obj, depth = 0) {
        depth++;
        console.log('parse obj, d ' + depth);
        if (depth > 2)
            return;
        for (let i in obj) {
            console.log(i + '/' + typeof (i));
            let j = i;
            if (obj[j] instanceof Object) {
                ObjectParser.parse(obj[j], depth);
            }
        }
    }
}
