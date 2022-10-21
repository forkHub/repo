var ha;
(function (ha) {
    var parse;
    (function (parse) {
        var basic;
        (function (basic) {
            console.log('initialize exp:');
            basic.expToken = [
                {
                    nama: parse.Kons.EXP,
                    rumus: [[], [parse.Kons.ANGKA], []]
                },
                {
                    nama: parse.Kons.EXP,
                    rumus: [[], [parse.Kons.TEKS], []]
                },
                {
                    nama: parse.Kons.EXP,
                    rumus: [[], [parse.Kons.BINOP], []]
                },
                {
                    nama: parse.Kons.EXP,
                    rumus: [
                        [parse.Kons.EXP, parse.Kons.KATA],
                        [parse.Kons.MIN],
                        []
                    ]
                },
                //exp dari kurung
                {
                    nama: parse.Kons.EXP,
                    rumus: [
                        [parse.Kons.KATA, 'function'],
                        [parse.Kons.KURUNG],
                        []
                    ]
                },
                //exp dari boolean
                {
                    nama: parse.Kons.EXP,
                    rumus: [
                        [],
                        ['true'],
                        []
                    ]
                },
                //exp dari boolean
                {
                    nama: parse.Kons.EXP,
                    rumus: [
                        [],
                        ['false'],
                        []
                    ]
                },
                //exp dari kata
                {
                    nama: parse.Kons.EXP,
                    rumus: [['var', 'let', 'const'], [parse.Kons.KATA], ['=', '(', parse.Kons.KURUNG, '[', '[]', '{', '{}']]
                },
                //kata - kurung => func() => exp
                {
                    nama: parse.Kons.EXP,
                    rumus: [["function"], [parse.Kons.KATA, parse.Kons.KURUNG], []]
                },
                {
                    nama: parse.Kons.EXP,
                    rumus: [[], ['typeof', parse.Kons.EXP], []]
                },
                {
                    nama: parse.Kons.EXP,
                    rumus: [[], [parse.Kons.AKSES_ARRAY], []]
                },
                {
                    nama: parse.Kons.MIN,
                    rumus: [[parse.Kons.EXP, parse.Kons.ANGKA, parse.Kons.TEKS, parse.Kons.KATA, ')', parse.Kons.KURUNG], ['-', parse.Kons.EXP], []]
                }
            ];
            basic.rumusBinop = [
                {
                    nama: parse.Kons.BINOP,
                    rumus: [[], [parse.Kons.EXP, parse.Kons.MIN], []]
                },
                {
                    nama: parse.Kons.BINOP,
                    rumus: [["-", '+'], [parse.Kons.EXP, '+', parse.Kons.EXP], []]
                },
                {
                    nama: parse.Kons.BINOP,
                    rumus: [['-', '+'], [parse.Kons.EXP, '-', parse.Kons.EXP], []]
                },
                {
                    nama: parse.Kons.BINOP,
                    rumus: [['-', '+'], [parse.Kons.EXP, parse.Kons.OPR, parse.Kons.EXP], []]
                }
            ];
            basic.rumusKurung = [
                //KURUNG
                //kurung kosong
                {
                    nama: parse.Kons.KURUNG,
                    rumus: [[], ['(', ')'], []]
                },
                //kurung gabung
                {
                    nama: parse.Kons.KURUNG,
                    rumus: [[], [parse.Kons.KURUNG, parse.Kons.KURUNG], []]
                },
                //kurung exp
                {
                    nama: parse.Kons.KURUNG,
                    rumus: [[], ['(', parse.Kons.EXP, ')'], []]
                },
                //kurung exp
                {
                    nama: parse.Kons.KURUNG,
                    rumus: [[], ['(', parse.Kons.ARG, ')'], []]
                },
            ];
            basic.rumusArray = [
                {
                    nama: '[]',
                    rumus: [[], ['[', ']'], []]
                },
                {
                    nama: '[]',
                    rumus: [[], ['[', parse.Kons.EXP, ']'], []]
                },
                {
                    nama: '[]',
                    rumus: [[], ['[]', '[]'], []]
                },
                {
                    nama: parse.Kons.AKSES_ARRAY,
                    rumus: [[], [parse.Kons.KATA, '[]'], ['[', '[]']]
                },
            ];
            basic.rumusLain = [
                {
                    nama: parse.Kons.ARG1,
                    rumus: [
                        [','],
                        [parse.Kons.EXP, ',', parse.Kons.EXP],
                        []
                    ]
                },
                {
                    nama: parse.Kons.ARG1,
                    rumus: [
                        [],
                        [parse.Kons.ARG1, ',', parse.Kons.EXP],
                        []
                    ]
                },
                {
                    nama: parse.Kons.ARG,
                    rumus: [
                        [],
                        [parse.Kons.ARG1],
                        [',']
                    ]
                },
                {
                    nama: parse.Kons.ARG,
                    rumus: [
                        [],
                        [parse.Kons.ARG2],
                        [',']
                    ]
                },
            ];
        })(basic = parse.basic || (parse.basic = {}));
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
