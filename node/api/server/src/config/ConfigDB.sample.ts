export var configDB: IConfigDB = {
	host: 'localhost',
	user: 'root',
	pass: '',
	db: 'silsilah',
	port: 3306,
	email: {
		service: '',
		user: '',
		pass: '',
		from: 'jangan_dibalas@pasartamel.com'
	},
	admin: {
		id: 'admin',
		pass: 'admin123!'
	}
}

interface IConfigDB {
	host: string,
	user: string,
	pass: string,
	db: string,
	port: number,
	email: {
		service: string, //'gmail',
		user: string,
		pass: string,
		from: string, //'jangan_dibalas@pasartamel.com'
	},
	admin: {
		id: 'admin',
		pass: 'admin123!'
	}

}