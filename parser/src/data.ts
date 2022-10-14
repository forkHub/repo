const cadangan: string[] = [
    "abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue",
    "debugger", "default", "delete", "do", "double", "else", "enum", "eval", "export", "extends", "false", "final",
    "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int",
    "interface", "let", "long", "native", "new", "null", "package", "private", "protected", "public", "return",
    "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try",
    "typeof", "var", "void", "volatile", "while", "with", "yield"
]

const binopOpr: string[] = [
    '!==', '===', '>>>',
    "==", '!=', '>=', '<=', "**",
    '&&', '||', '<<', '>>',
    "*", "/", "+", "-", "%",
    '?', '>', '<',
    '!', '&', '|', '~', '^',
];

const stmtOpr: string[] = [
    '+=', '-=', '*=', '/=', '%=', '**=', '++', '--'
]

const pintasan: string[] = [
    '()', '[]', '{}'
];

const token: IToken[] = [];

const grammar: IRumus[] = [
    {
        nama: Kons.EXP,
        rumus: [[], [Kons.ANGKA], []]
    },
    {
        nama: Kons.EXP,
        rumus: [[], [Kons.TEKS], []]
    },
    {
        nama: Kons.BINOP,
        rumus: [[], [Kons.EXP, Kons.OPR, Kons.EXP], []]
    },

]