export class Kons {
	public readonly folder_public: string = '/public/';
	public readonly folder_upload: string = '/public/upload/';
	readonly folder_download: string = '/upload/';

	static readonly CARI_NORMAL: number = 1;
	static readonly CARI_PASANGAN: number = 2;
	static readonly CARI_ANAK: number = 3;
	static readonly CARI_ORTU: number = 4;
}
export var kons: Kons = new Kons();
