interface ISlAnggota {
	id?: number,
	nama?: string,

	populated?: boolean
	pas?: string;
	anak?: ISlAnggota[]
}