export interface ISlAnggota {
	id?: number,
	nama?: string,
	tgl_lahir?: string,
	tgl_meninggal?: string,
	ortu_id?: number,

	//external
	ayah_nama?: string
	ibu_nama?: string
	anak?: ISlAnggota[]
}

export interface IFoto {
	upload?: boolean,
	gbr_asli?: string,
	gbr_baru?: string,
	thumb_baru?: string,
	nama_thumb?: string,
	nama_gbr?: string,
	url_thumb?: string,
	url_gbr?: string
}