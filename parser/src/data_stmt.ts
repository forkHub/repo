const rumusStmt: IRumus[] = [
	{
		nama: Kons.WHILE,
		rumus: [[], ['while', Kons.EXP, '{}'], []]
	},

	//if then 
	{
		nama: Kons.IF,
		rumus: [[], ['if', Kons.EXP, '{}'], []]
	},

	{
		nama: Kons.ELSE_IF,
		rumus: [[], ['else if', Kons.EXP, '{}'], []]
	},

	{
		nama: Kons.ELSE_IF2,
		rumus: [[Kons.ELSE_IF2], [Kons.ELSE_IF, Kons.ELSE_IF], []]
	},

	{
		nama: Kons.ELSE_IF2,
		rumus: [[], [Kons.ELSE_IF2, Kons.ELSE_IF], []]
	},

	{
		nama: Kons.ELSE_IF_ELSE,
		rumus: [[], [Kons.ELSE_IF2, Kons.ELSE], []]
	},

	{
		nama: Kons.ELSE_IF_ELSE,
		rumus: [[Kons.ELSE_IF, Kons.ELSE_IF2], [Kons.ELSE_IF, Kons.ELSE], []]
	},

	{
		nama: Kons.ELSE,
		rumus: [[], ['else', '{}'], []]
	},

	{
		nama: Kons.IF_ELSE,
		rumus: [
			[],
			[Kons.IF, Kons.ELSE],
			[]
		]
	},

	{
		nama: Kons.IF_ELSE,
		rumus: [
			[],
			[Kons.IF, Kons.ELSE_IF_ELSE],
			[]
		]
	},

	{
		nama: Kons.FOR_STMT,
		rumus: [
			[],
			['for', '(', Kons.STMT2, ')', '{}'],
			[]
		]
	},

	//assignment
	{
		nama: Kons.VAR_ISI,
		rumus: [['var'], [Kons.KATA, '=', Kons.EXP], [Kons.MIN, Kons.OPR, '+', '-']]
	},
	{
		nama: Kons.VAR_ISI,
		rumus: [['='], [Kons.EXP, '++'], []]
	},

	{
		nama: Kons.DEK_VAR,
		rumus: [[], ['var', Kons.KATA], ['=']]
	},
	{
		nama: Kons.DEK_VAR,
		rumus: [[], ['var', Kons.KATA, '=', Kons.EXP], [Kons.OPR, '+', '-', Kons.MIN]]
	},
	{
		nama: '{}',
		rumus: [[], ['{', '}'], []]
	},
	{
		nama: '{}',
		rumus: [[], ['{', Kons.STMT, '}'], []]
	},
	{
		nama: '{}',
		rumus: [[], ['{', Kons.STMT2, '}'], []]
	},
	{
		nama: Kons.STMT2,
		rumus: [[Kons.STMT], [Kons.STMT, Kons.STMT], [';']]
	},
	{
		nama: Kons.STMT2,
		rumus: [[Kons.STMT], [Kons.STMT2, Kons.STMT], [';']]
	},
	{
		nama: Kons.DEK_FUNGSI1,
		rumus: [[], ['function', Kons.KATA, Kons.KURUNG], []]
	},
	{
		nama: Kons.DEK_FUNGSI,
		rumus: [[], [Kons.DEK_FUNGSI1, '{}'], []]
	},

	{
		nama: Kons.RETURN_STMT,
		rumus: [[], ['return', Kons.EXP], [Kons.OPR, '+', '-', Kons.MIN]]
	},

	//stmt convert
	{
		nama: Kons.STMT,
		rumus: [[], [Kons.STMT, ';'], []]
	},

	{
		nama: Kons.STMT,
		rumus: [[], [Kons.RETURN_STMT], []]
	},

	{
		nama: Kons.STMT,
		rumus: [[], [Kons.IF_ELSE], []]
	},

	{
		nama: Kons.STMT,
		rumus: [[], [Kons.WHILE], []]
	},

	{
		nama: Kons.STMT,
		rumus: [[], [Kons.FOR_STMT], []]
	},

	{
		nama: Kons.EXP,
		rumus: [[], [Kons.DEK_FUNGSI], []]
	},

	{
		nama: Kons.STMT,
		rumus: [[], [Kons.DEK_VAR], []]
	},

	{
		nama: Kons.STMT,
		rumus: [[], [Kons.VAR_ISI], []]
	},

	//stmt dar exp
	{
		nama: Kons.STMT,
		rumus: [
			[Kons.OPR, ',', '=', 'return', 'if', 'else if', 'while', 'for', '+', '-'],
			[Kons.EXP],
			[Kons.OPR, ',', '=', '+', '-', Kons.MIN]
		]
	},
]