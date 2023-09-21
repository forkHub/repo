namespace ha.be {

	class Cache {
		private files: ICache[] = [];

		getGbr(url: string): HTMLImageElement {

			for (let i: number = 0; i < this.files.length; i++) {
				if (this.files[i].url == url) {
					console.log('ambil dari cache: ' + url);
					return this.files[i].img;
				}
			}

			return null;
		}

		setFile(url: string, img: HTMLImageElement): void {
			let img2: HTMLImageElement;

			img2 = this.getGbr(url);
			if (img2) {
				return;
			}

			console.log('cache: ' + url);
			this.files.push({
				url: url,
				img: img
			});
		}
	}

	interface ICache {
		url: string;
		img: HTMLImageElement;
	}

	export const cache: Cache = new Cache();
}