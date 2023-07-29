interface ISlAnggota {
	id?: number,
	nama: string,
	pasangan?: string;
	anak: ISlAnggota[]
}