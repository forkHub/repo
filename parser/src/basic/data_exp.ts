namespace ha.parse.basic {

	console.log('initialize exp:');
	export const expToken: IRumus[] = [
		{
			nama: Kons.EXP,
			rumus: [[], [Kons.ANGKA], []]
		},
		{
			nama: Kons.EXP,
			rumus: [[], [Kons.TEKS], []]
		},
		{
			nama: Kons.EXP,
			rumus: [[], [Kons.BINOP], []]
		},
		{
			nama: Kons.EXP,
			rumus: [
				[Kons.EXP, Kons.KATA],
				[Kons.MIN],
				[]
			]
		},

		//exp dari kurung
		{
			nama: Kons.EXP,
			rumus: [
				[Kons.KATA, 'function'],
				[Kons.KURUNG],
				[]
			]
		},

		//exp dari boolean
		{
			nama: Kons.EXP,
			rumus: [
				[],
				['true'],
				[]
			]
		},

		//exp dari boolean
		{
			nama: Kons.EXP,
			rumus: [
				[],
				['false'],
				[]
			]
		},

		//exp dari kata
		{
			nama: Kons.EXP,
			rumus: [['var', 'let', 'const'], [Kons.KATA], ['=', '(', Kons.KURUNG, '[', '[]', '{', '{}']]
		},

		//kata - kurung => func() => exp
		{
			nama: Kons.EXP,
			rumus: [["function"], [Kons.KATA, Kons.KURUNG], []]
		},

		{
			nama: Kons.EXP,
			rumus: [[], ['typeof', Kons.EXP], []]
		},

		{
			nama: Kons.EXP,
			rumus: [[], [Kons.AKSES_ARRAY], []]
		},

		{
			nama: Kons.MIN,
			rumus: [[Kons.EXP, Kons.ANGKA, Kons.TEKS, Kons.KATA, ')', Kons.KURUNG], ['-', Kons.EXP], []]
		}

	];

	export const rumusBinop: IRumus[] = [
		{
			nama: Kons.BINOP,
			rumus: [[], [Kons.EXP, Kons.MIN], []]
		},
		{
			nama: Kons.BINOP,
			rumus: [["-", '+'], [Kons.EXP, '+', Kons.EXP], []]
		},
		{
			nama: Kons.BINOP,
			rumus: [['-', '+'], [Kons.EXP, '-', Kons.EXP], []]
		},
		{
			nama: Kons.BINOP,
			rumus: [['-', '+'], [Kons.EXP, Kons.OPR, Kons.EXP], []]
		}
	];

	export const rumusKurung: IRumus[] = [
		//KURUNG
		//kurung kosong
		{
			nama: Kons.KURUNG,
			rumus: [[], ['(', ')'], []]
		},

		//kurung gabung
		{
			nama: Kons.KURUNG,
			rumus: [[], [Kons.KURUNG, Kons.KURUNG], []]
		},

		//kurung exp
		{
			nama: Kons.KURUNG,
			rumus: [[], ['(', Kons.EXP, ')'], []]
		},

		//kurung exp
		{
			nama: Kons.KURUNG,
			rumus: [[], ['(', Kons.ARG, ')'], []]
		},
	];

	export const rumusArray: IRumus[] = [
		{
			nama: '[]',
			rumus: [[], ['[', ']'], []]
		},
		{
			nama: '[]',
			rumus: [[], ['[', Kons.EXP, ']'], []]
		},
		{
			nama: '[]',
			rumus: [[], ['[]', '[]'], []]
		},
		{
			nama: Kons.AKSES_ARRAY,
			rumus: [[], [Kons.KATA, '[]'], ['[', '[]']]
		},

	];

	export const rumusLain: IRumus[] = [
		{
			nama: Kons.ARG1,
			rumus: [
				[','],
				[Kons.EXP, ',', Kons.EXP],
				[]
			]
		},
		{
			nama: Kons.ARG1,
			rumus: [
				[],
				[Kons.ARG1, ',', Kons.EXP],
				[]
			]
		},
		{
			nama: Kons.ARG,
			rumus: [
				[],
				[Kons.ARG1],
				[',']
			]
		},
		{
			nama: Kons.ARG,
			rumus: [
				[],
				[Kons.ARG2],
				[',']
			]
		},

	];
}