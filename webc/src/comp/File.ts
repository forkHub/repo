namespace ha.comp {
	export class File {
		private static cacheStr: ICache[] = [];

		static async load(url: string, cache: boolean): Promise<string> {
			let str: string = '';

			console.log('load: ' + url);

			if (cache) {
				this.cacheStr.forEach((item: ICache) => {
					if (item.url == url) {
						str = item.str;
						console.log('cached');
					}
				});
			}

			if (str && str != '') {
				return str;
			}

			str = await ha.comp.Util.Ajax2('get', url, '');
			this.cacheStr.push({
				url: url,
				str: str
			});

			console.log('str ' + str);
			return str;
		}

	}

	interface ICache {
		url: string
		str: string
	}
}