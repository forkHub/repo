namespace ha.comp {
	export class File {
		private static cacheStr: ICache[] = [];

		static fromCache(url: string): string {
			for (let i: number = 0; i < this.cacheStr.length; i++) {
				if (this.cacheStr[i].url == url) {
					return this.cacheStr[i].str;
				}
			}

			throw Error('url: ' + url);
		}

		static async load(url: string): Promise<string> {
			let str: string = '';

			console.log('load: ' + url);

			this.cacheStr.forEach((item: ICache) => {
				if (item.url == url) {
					str = item.str;
					console.log('cached');
				}
			});

			if (str && str != '') {
				return str;
			}

			str = await ha.comp.Util.Ajax2('get', url, '');
			this.cacheStr.push({
				url: url,
				str: str
			});

			return str;
		}

	}

	interface ICache {
		url: string
		str: string
	}
}