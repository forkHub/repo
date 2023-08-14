var ha;
(function (ha) {
    var parse;
    (function (parse) {
        var basic;
        (function (basic) {
            basic.rumusStmt = [
                //while exp
                {
                    nama: parse.Kons.WHILE,
                    rumus: [[], ['while', parse.Kons.EXP], [parse.Kons.OPR, '+', '-', ',', '(', parse.Kons.KURUNG, parse.Kons.MIN]]
                },
                //if exp then 
                {
                    nama: parse.Kons.IF,
                    rumus: [[], ['if', parse.Kons.EXP, 'then'], []]
                },
                //else if exp then
                {
                    nama: parse.Kons.ELSE_IF,
                    rumus: [[], ['elseif', parse.Kons.EXP], [parse.Kons.OPR, '+', '-', ',', parse.Kons.KURUNG, parse.Kons.MIN, '(']]
                },
                {
                    nama: parse.Kons.ELSE,
                    rumus: [[], ['else'], []]
                },
                {
                    nama: parse.Kons.FOR_STMT,
                    rumus: [
                        [],
                        ['for', parse.Kons.VAR_ISI, 'to', parse.Kons.EXP],
                        [parse.Kons.EXP, '+', '-', '(', parse.Kons.MIN]
                    ]
                },
                //assignment
                //a = 1
                {
                    nama: parse.Kons.VAR_ISI,
                    rumus: [['var'], [parse.Kons.KATA, '=', parse.Kons.EXP], [parse.Kons.MIN, parse.Kons.OPR, '+', '-']]
                },
                //var a
                {
                    nama: parse.Kons.DEK_VAR,
                    rumus: [[], ['var', parse.Kons.KATA], ['=']]
                },
                //var a = exp
                {
                    nama: parse.Kons.DEK_VAR,
                    rumus: [[], ['var', parse.Kons.KATA, '=', parse.Kons.EXP], [parse.Kons.OPR, '+', '-', parse.Kons.MIN]]
                },
                {
                    nama: parse.Kons.DEK_FUNGSI,
                    rumus: [[], ['function', parse.Kons.KATA, parse.Kons.KURUNG], []]
                },
                {
                    nama: parse.Kons.RETURN_STMT,
                    rumus: [[], ['return', parse.Kons.EXP], [parse.Kons.OPR, '+', '-', parse.Kons.MIN, parse.Kons.KURUNG]]
                },
                // {
                // 	nama: Kons.STMT,
                // 	rumus: [[], [Kons.RETURN_STMT], []]
                // },
                // {
                // 	nama: Kons.STMT,
                // 	rumus: [[], [Kons.FOR_STMT], []]
                // },
                // {
                // 	nama: Kons.EXP,
                // 	rumus: [[], [Kons.DEK_FUNGSI], []]
                // },
                // {
                // 	nama: Kons.STMT,
                // 	rumus: [[], [Kons.DEK_VAR], []]
                // },
                // {
                // 	nama: Kons.STMT,
                // 	rumus: [[], [Kons.VAR_ISI], []]
                // },
            ];
        })(basic = parse.basic || (parse.basic = {}));
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
