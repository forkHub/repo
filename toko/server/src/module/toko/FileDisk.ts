import fs from "fs";

class FileDisk {

	async bacaDir(dir: string): Promise<string[]> {
		return new Promise((_resolve, _reject) => {
			fs.readdir(dir, (err: NodeJS.ErrnoException, files: string[]) => {
				if (err) {
					_reject(err);
				}
				else {
					_resolve(files);
				}
			})

		});
	}

	async hapusFile(url: string): Promise<void> {
		return new Promise((resolve, _reject) => {
			fs.unlink(url, (err) => {
				if (err) {
					_reject(err)
				}
				resolve();
			})
		})
	}
}

//TODO: [ref] dep
export var fileDisk: FileDisk = new FileDisk();