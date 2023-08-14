var ha;
(function (ha) {
    var parse;
    (function (parse) {
        var js;
        (function (js) {
            js.rumusStmt = [
                {
                    nama: parse.Kons.WHILE,
                    rumus: [[], ['while', parse.Kons.EXP, '{}'], []]
                },
                //if then 
                {
                    nama: parse.Kons.IF,
                    rumus: [[], ['if', parse.Kons.EXP, '{}'], []]
                },
                {
                    nama: parse.Kons.ELSE_IF,
                    rumus: [[], ['else if', parse.Kons.EXP, '{}'], []]
                },
                {
                    nama: parse.Kons.ELSE_IF2,
                    rumus: [[parse.Kons.ELSE_IF2], [parse.Kons.ELSE_IF, parse.Kons.ELSE_IF], []]
                },
                {
                    nama: parse.Kons.ELSE_IF2,
                    rumus: [[], [parse.Kons.ELSE_IF2, parse.Kons.ELSE_IF], []]
                },
                {
                    nama: parse.Kons.ELSE_IF_ELSE,
                    rumus: [[], [parse.Kons.ELSE_IF2, parse.Kons.ELSE], []]
                },
                {
                    nama: parse.Kons.ELSE_IF_ELSE,
                    rumus: [[parse.Kons.ELSE_IF, parse.Kons.ELSE_IF2], [parse.Kons.ELSE_IF, parse.Kons.ELSE], []]
                },
                {
                    nama: parse.Kons.ELSE,
                    rumus: [[], ['else', '{}'], []]
                },
                {
                    nama: parse.Kons.IF_ELSE,
                    rumus: [
                        [],
                        [parse.Kons.IF, parse.Kons.ELSE],
                        []
                    ]
                },
                {
                    nama: parse.Kons.IF_ELSE,
                    rumus: [
                        [],
                        [parse.Kons.IF, parse.Kons.ELSE_IF_ELSE],
                        []
                    ]
                },
                {
                    nama: parse.Kons.FOR_STMT,
                    rumus: [
                        [],
                        ['for', '(', parse.Kons.STMT2, ')', '{}'],
                        []
                    ]
                },
                //assignment
                {
                    nama: parse.Kons.VAR_ISI,
                    rumus: [['var'], [parse.Kons.KATA, '=', parse.Kons.EXP], [parse.Kons.MIN, parse.Kons.OPR, '+', '-']]
                },
                {
                    nama: parse.Kons.VAR_ISI,
                    rumus: [['='], [parse.Kons.EXP, '++'], []]
                },
                {
                    nama: parse.Kons.DEK_VAR,
                    rumus: [[], ['var', parse.Kons.KATA], ['=']]
                },
                {
                    nama: parse.Kons.DEK_VAR,
                    rumus: [[], ['var', parse.Kons.KATA, '=', parse.Kons.EXP], [parse.Kons.OPR, '+', '-', parse.Kons.MIN]]
                },
                {
                    nama: '{}',
                    rumus: [[], ['{', '}'], []]
                },
                {
                    nama: '{}',
                    rumus: [[], ['{', parse.Kons.STMT, '}'], []]
                },
                {
                    nama: '{}',
                    rumus: [[], ['{', parse.Kons.STMT2, '}'], []]
                },
                {
                    nama: parse.Kons.STMT2,
                    rumus: [[parse.Kons.STMT], [parse.Kons.STMT, parse.Kons.STMT], [';']]
                },
                {
                    nama: parse.Kons.STMT2,
                    rumus: [[parse.Kons.STMT], [parse.Kons.STMT2, parse.Kons.STMT], [';']]
                },
                {
                    nama: parse.Kons.DEK_FUNGSI1,
                    rumus: [[], ['function', parse.Kons.KATA, parse.Kons.KURUNG], []]
                },
                {
                    nama: parse.Kons.DEK_FUNGSI,
                    rumus: [[], [parse.Kons.DEK_FUNGSI1, '{}'], []]
                },
                {
                    nama: parse.Kons.RETURN_STMT,
                    rumus: [[], ['return', parse.Kons.EXP], [parse.Kons.OPR, '+', '-', parse.Kons.MIN]]
                },
                //stmt convert
                {
                    nama: parse.Kons.STMT,
                    rumus: [[], [parse.Kons.STMT, ';'], []]
                },
                {
                    nama: parse.Kons.STMT,
                    rumus: [[], [parse.Kons.RETURN_STMT], []]
                },
                {
                    nama: parse.Kons.STMT,
                    rumus: [[], [parse.Kons.IF_ELSE], []]
                },
                {
                    nama: parse.Kons.STMT,
                    rumus: [[], [parse.Kons.WHILE], []]
                },
                {
                    nama: parse.Kons.STMT,
                    rumus: [[], [parse.Kons.FOR_STMT], []]
                },
                {
                    nama: parse.Kons.EXP,
                    rumus: [[], [parse.Kons.DEK_FUNGSI], []]
                },
                {
                    nama: parse.Kons.STMT,
                    rumus: [[], [parse.Kons.DEK_VAR], []]
                },
                {
                    nama: parse.Kons.STMT,
                    rumus: [[], [parse.Kons.VAR_ISI], []]
                },
                //stmt dar exp
                {
                    nama: parse.Kons.STMT,
                    rumus: [
                        [parse.Kons.OPR, ',', '=', 'return', 'if', 'else if', 'while', 'for', '+', '-'],
                        [parse.Kons.EXP],
                        [parse.Kons.OPR, ',', '=', '+', '-', parse.Kons.MIN]
                    ]
                },
            ];
        })(js = parse.js || (parse.js = {}));
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
