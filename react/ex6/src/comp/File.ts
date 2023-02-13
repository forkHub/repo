namespace ha.comp {
	export class File {
		private static cacheStr: ICache[] = [];

		static async addCach(caches: ICache[]) {
			caches.forEach((item: ICache) => {
				this.cacheStr.push(item);
			})
		}

		static loadFromCache(url: string): string {
			for (let i: number = 0; i < this.cacheStr.length; i++) {
				if (this.cacheStr[i].url == url) {
					return this.cacheStr[i].str;
				}
			}

			return null;
		}

		static async load(url: string, cache: boolean): Promise<string> {
			let str: string = '';

			console.log('load: ' + url + 'cache: ' + cache);

			if (cache) {
				this.cacheStr.forEach((item: ICache) => {
					console.log(item.url + ' / ' + url);
					if (item.url == url) {
						str = item.str;
						console.log('cached');
					}
				});
			}

			if (str && str != '') {
				return str;
			}
			console.log('str ' + str);

			str = await ha.comp.Util.Ajax2('get', url, '');
			this.cacheStr.push({
				url: url,
				str: str
			});
			console.log(this.cacheStr);

			return str;
		}

	}

	interface ICache {
		url: string
		str: string
	}
}