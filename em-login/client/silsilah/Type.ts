interface IAnggota__ {
	id?: number;
	nama?: string;
	foto?: string;
	tgl_lahir?: string,
	tgl_meninggal?: string,
	ortu_id?: number;
	rel_id?: number;
	jkl?: string,

	//loaded
	//external
	pas?: ISlAnggota;
	rel?: ISlRelasi;

	pasangan_id?: number;
	pasangan?: IAnggota__;
	populated?: boolean;
	anak?: IAnggota__[];
}

interface ISlAnggota {
	id?: number,
	nama?: string,
	nama_lengkap?: string,
	alamat?: string,
	jkl?: string,
	wa?: string,
	fb?: string,
	instagram?: string,
	tgl_lahir?: string,
	tgl_meninggal?: string,
	foto?: string;
	thumb?: string;

	ortu_id?: number,
	rel_id?: number,

	//external
	populated?: boolean
	pas?: ISlAnggota;
	rel?: ISlRelasi;

	pasangan_id?: number,
	pasangan_nama?: string,
	ayah_nama?: string
	ibu_nama?: string
	anak?: ISlAnggota[]
}

interface ISlRelasi {
	id?: number,
	istri?: number,
	suami?: number,

	//external
	nama_suami?: string,
	nama_istri?: string
}
