interface ISlAnggota {
	id?: number,
	nama?: string,

	populated?: boolean
	pas?: ISlAnggota;
	anak?: ISlAnggota[]
}