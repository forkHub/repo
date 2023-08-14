var ha;
(function (ha) {
    var parse;
    (function (parse) {
        var basic;
        (function (basic) {
            basic.cadangan = [
                "elseif", "if", "endif", "then", "else",
                "function", "endfunction",
                "for", "to", "next", "do",
                "boolean",
                "const",
                "false", "true",
                "let",
                "return",
                "while", "wend",
                "var"
            ];
            basic.binopOpr = [
                '!==', '===', '>>>',
                "==", '!=', '>=', '<=', "**",
                '&&', '||', '<<', '>>',
                "*", "/", "%",
                '?', '>', '<',
                '!', '&', '|', '~', '^',
                "and", "or"
            ];
        })(basic = parse.basic || (parse.basic = {}));
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
