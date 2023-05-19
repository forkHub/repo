//NOTE: FINAL
export interface IConfigDB {
	host: string,
	user: string,
	pass: string,
	db: string,
	port: number,

	email: {
		service: string,
		user: string,
		pass: string,
		from: string
	}

	admin: {
		id: string,
		pass: string
	}
}


export interface IHasilQuery {
	fieldCount: number,
	affectedRows: number,
	insertId: number,
	serverStatus: 2,
	warningCount: number,
	message: string,
	protocol41: true,
	changedRows: number
}

export interface IFileObj {
	id: string,
	thumb: string,
	gbr: string
}

export interface IBarangObj {
	id?: number;
	nama?: string;
	// deskripsi?: string;
	desk_panjang?: string;
	harga?: number;
	publish?: number;
	thumb?: string;
	gbr?: string;

	//ref
	anggota_id?: number;

	//auto
	tgl_update?: string;
	jml_view?: number;

	//external
	wa?: string;
	lapak_nama?: string;
}

export interface IAnggotaObj {
	id?: number;
	user_name?: string;
	password?: string;
	lapak?: string,		//nama lapak
	deskripsi?: string;
	setuju?: number;
	level?: string;
	wa?: string;
	alamat?: string;
	email?: string;
	aktif?: number;
}

export interface IPassword {
	password_lama: string;
	password_baru: string;
	password_konfirmasi: string;
}

export interface IFoto {
	upload?: boolean,
	gbr_asli?: string,
	gbr_baru?: string,
	thumb_baru?: string,
	nama_thumb?: string,
	nama_gbr?: string
}

export interface IJUmlah {
	jumlah: number;
}