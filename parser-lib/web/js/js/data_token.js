var ha;
(function (ha) {
    var parse;
    (function (parse) {
        var js;
        (function (js) {
            js.cadangan = [
                "else if",
                "abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue",
                "debugger", "default", "delete", "do", "double", "else", "enum", "eval", "export", "extends", "false", "final",
                "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int",
                "interface", "let", "long", "native", "new", "null", "package", "private", "protected", "public", "return",
                "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try",
                "typeof", "var", "void", "volatile", "while", "with", "yield"
            ];
            // plus dan minus gak masuk karena termasuk minus/plus
            js.binopOpr = [
                '!==', '===', '>>>',
                "==", '!=', '>=', '<=', "**",
                '&&', '||', '<<', '>>',
                "*", "/", "%",
                '?', '>', '<',
                '!', '&', '|', '~', '^',
            ];
            js.stmtOpr = [
                '+=', '-=', '*=', '/=', '%=', '**=', '++', '--'
            ];
        })(js = parse.js || (parse.js = {}));
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
