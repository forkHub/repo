namespace ha.parse.basic {

	export const rumusStmt: IRumus[] = [
		//while exp
		{
			nama: Kons.WHILE,
			rumus: [[], ['while', Kons.EXP], [Kons.OPR, '+', '-', ',', '(', Kons.KURUNG, Kons.MIN]]
		},

		//if exp then 
		{
			nama: Kons.IF,
			rumus: [[], ['if', Kons.EXP, 'then'], []]
		},

		//else if exp then
		{
			nama: Kons.ELSE_IF,
			rumus: [[], ['elseif', Kons.EXP], [Kons.OPR, '+', '-', ',', Kons.KURUNG, Kons.MIN, '(']]
		},

		//else
		{
			nama: Kons.ELSE,
			rumus: [[], ['else'], []]
		},

		//for
		{
			nama: Kons.FOR_STMT,
			rumus: [
				[],
				['for', Kons.VAR_ISI, 'to', Kons.EXP],
				[Kons.EXP, '+', '-', '(', Kons.MIN]
			]
		},

		//assignment
		//a = 1
		{
			nama: Kons.VAR_ISI,
			rumus: [['var'], [Kons.KATA, '=', Kons.EXP], [Kons.MIN, Kons.OPR, '+', '-']]
		},

		//var a
		{
			nama: Kons.DEK_VAR,
			rumus: [[], ['var', Kons.KATA], ['=']]
		},

		//var a = exp
		{
			nama: Kons.DEK_VAR,
			rumus: [[], ['var', Kons.KATA, '=', Kons.EXP], [Kons.OPR, '+', '-', Kons.MIN]]
		},

		{
			nama: Kons.DEK_FUNGSI,
			rumus: [[], ['function', Kons.KATA, Kons.KURUNG], []]
		},

		{
			nama: Kons.RETURN_STMT,
			rumus: [[], ['return', Kons.EXP], [Kons.OPR, '+', '-', Kons.MIN, Kons.KURUNG]]
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
	]

}
