namespace ha {
	export class Folder implements IFolder {

		private _id: number = 0;
		private _nama: string = '';
		private _metaData: number[] = [];
		private _sub: number[] = [];
		private _indukId: number = 0;
		private _populated: boolean = false;

		readonly fileData: IFile[] = [];
		readonly subData: IFolder[] = [];

		private static readonly daftar: IFolder[] = [];
		private static readonly daftarFile: IFile[] = [];
		private static _root: IFolder;

		constructor(id: number, nama: string, indukId: number) {
			this._id = id;
			this._indukId = indukId;
			this._nama = nama;
		}

		static buatFolder(path: string): void {
			let pathAr: string[] = path.split('/');

			console.log('buat folder, path: ' + path);
			console.log(pathAr);

			let folder: IFolder = this._root;

			for (let i: number = 0; i < pathAr.length; i++) {
				let nama: string = pathAr[i];

				console.log('buat folder, nama: ' + nama);

				let sub: IFolder = Folder.getSubFolderByName(folder, nama);

				if (sub) {
					throw Error('folder sudah ada');
				}
				else {
					folder = Folder.buatSubFolder(ha.comp.Id.id, nama, folder.id);
				}
			}
		}

		static buatFile(path: string, namaFile: string, isi: string): IFile {
			let pathAr: string[] = path.split('/');

			let folder: IFolder = Folder.populate(this._root);

			console.log('buat file: ');
			console.log(pathAr);

			for (let i: number = 0; i < pathAr.length; i++) {
				let nama: string = pathAr[i];

				folder = Folder.getSubFolderByName(folder, nama, true);
			};

			let file: IFile = Folder.getSubFileByName(folder, pathAr[pathAr.length - 1]);

			if (file) {
				throw Error('file sudah ada, path ' + path);
			}
			else {
				console.log('buat sub file, folder: ' + folder.nama + '/nama file: ' + namaFile + '/isi: ' + isi);
				this.buatSubFile(folder, namaFile, isi);
			}

			return file;
		}

		static bacaFile(path: string): string {
			let pathAr: string[] = path.split('/');
			let hasil: string = '';

			let folder: IFolder = Folder.populate(this._root);

			for (let i: number = 0; i < pathAr.length - 1; i++) {
				let nama: string = pathAr[i];

				folder = Folder.getSubFolderByName(folder, nama, true);
			};

			let file: IFile = Folder.getSubFileByName(folder, pathAr[pathAr.length - 1], true);

			hasil = file.isi;

			return hasil;
		}

		private static getSubFileByName(folder: IFolder, nama: string, error: boolean = false): IFile {
			let hasil: IFile;

			Folder.populate(folder);

			folder.fileData.forEach((file: IFile) => {
				if (file.nama == nama) {
					hasil = file;
				}
			})

			if (!hasil && error) {
				throw Error('file not found: ' + nama + '/induk: ' + folder.nama);
			}

			return hasil;
		}

		private static getSubFolderByName(folder: IFolder, nama: string, error: boolean = false): IFolder {
			let hasil: IFolder;

			console.group('get sub by name: ' + nama);

			Folder.populate(folder);

			folder.subData.forEach((item: IFolder) => {
				if (item.nama == nama) {
					hasil = item;
				}
			})

			if (!hasil && error) {
				throw Error('folder tidak ada, folder ' + nama + '/induk ' + folder.nama);
			}

			console.log('hasil: ' + hasil);
			console.groupEnd();

			return hasil;
		}

		private static getFileById(id: number): IFile {
			let hasil: IFile;

			this.daftarFile.forEach((file: IFile) => {
				if (file.id == id) {
					hasil = file;
				}
			})

			return hasil;
		}

		private static populate(folder: IFolder): IFolder {
			if (folder.populated) return folder;

			folder.sub.forEach((item: number) => {
				folder.subData.push(Folder.getFolderById(item));
			});

			folder.file.forEach((id: number) => {
				folder.fileData.push(Folder.getFileById(id));
			});

			return folder;
		}

		private static getFolderById(id: number, error: boolean = false): IFolder {
			let hasil: IFolder;

			this.daftar.forEach((item: IFolder) => {
				if (item.id == id) {
					hasil = item;
				}
			})

			if (null == hasil && error) {
				throw Error('id tidak ketemu: ' + id);
			}

			return hasil;
		}

		private static buatSubFolder(id: number, nama: string, indukId: number): IFolder {
			let hasil: IFolder;

			console.group('buat sub folder, nama: ' + nama + '/induk id: ' + indukId);

			let induk: IFolder = Folder.populate(Folder.getFolderById(indukId));
			let sub: IFolder = Folder.getSubFolderByName(induk, nama);

			if (sub) {
				throw Error('folder sudah ada: ' + nama + '/parent: ' + induk.nama);
			}

			hasil = new Folder(id, nama, indukId);

			this.daftar.push(hasil);

			induk = this.getFolderById(indukId);
			induk.sub.push(hasil.id);

			console.log('parent ' + induk.sub);

			console.groupEnd();

			return hasil;
		}

		private static buatSubFile(induk: IFolder, namaFile: string, isi: string): void {
			let file: IFile;
			let subFile: IFile = Folder.getSubFileByName(induk, namaFile);



			if (subFile) {
				throw Error('file sudah ada: ' + subFile.nama);
			}

			file = {
				id: ha.comp.Id.id,
				nama: namaFile,
				isi: isi,
				indukId: induk.id,
			}


			induk.file.push(file.id);
			this.daftarFile.push(file);
		}

		static init(): void {
			this._root = new Folder(ha.comp.Id.id, 'root', 0);
			this.daftar.push(this._root);
		}

		public get populated(): boolean {
			return this._populated;
		}
		public set populated(value: boolean) {
			this._populated = value;
		}

		public static get root(): IFolder {
			return Folder._root;
		}

		public get indukId(): number {
			return this._indukId;
		}
		public set indukId(value: number) {
			this._indukId = value;
		}

		public get id(): number {
			return this._id;
		}
		public set id(value: number) {
			this._id = value;
		}

		public get nama(): string {
			return this._nama;
		}
		public set nama(value: string) {
			this._nama = value;
		}

		public get file(): number[] {
			return this._metaData;
		}
		public set file(value: number[]) {
			this._metaData = value;
		}

		public get sub(): number[] {
			return this._sub;
		}
		public set sub(value: number[]) {
			this._sub = value;
		}

	}

	interface IFolder {
		id: number,
		nama: string,
		file: number[],
		sub: number[],
		indukId: number,

		//populated
		fileData: IFile[],
		subData: IFolder[],
		populated: boolean
	}

	interface IFile {
		id: number
		nama: string,
		isi: string,
		indukId: number
	}
}