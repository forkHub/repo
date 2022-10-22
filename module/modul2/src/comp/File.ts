namespace ha.comp {
	export class File {
		private static cacheStr: ICache[] = [];

		static async load(url: string): Promise<string> {
			let str: string;

			this.cacheStr.forEach((item: ICache) => {
				if (item.url == url) {
					str = item.str;
				}
			});

			if (str != '') return str;

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