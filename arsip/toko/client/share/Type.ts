


// interface IMengetahui {
// 	id?: number,
// 	tugas_id?: number,
// 	anggota_id?: number
// }

// interface IPetugas {
// 	id?: number,
// 	tugas_id?: number,
// 	anggota_id?: number
// }

// interface IStatus {
// 	id?: number,
// 	nama?: string
// }

// interface IQuery {
// 	fieldCount?: number,
// 	affectedRows?: number,
// 	insertId?: number,
// 	serverStatus?: number,
// 	warningCount?: number,
// 	message?: string,
// 	protocol41?: boolean,
// 	changedRows?: number
// }

// interface ISessionData {
// 	id: number;
// 	statusLogin: boolean;
// 	filter?: IFilter;
// }

// interface IFilter {
// 	petugas: number
// }

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