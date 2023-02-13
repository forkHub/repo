var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class File {
            static cacheStr = [];
            static async addCach(caches) {
                caches.forEach((item) => {
                    this.cacheStr.push(item);
                });
            }
            static loadFromCache(url) {
                for (let i = 0; i < this.cacheStr.length; i++) {
                    if (this.cacheStr[i].url == url) {
                        return this.cacheStr[i].str;
                    }
                }
                return null;
            }
            static async load(url, cache) {
                let str = '';
                console.log('load: ' + url + 'cache: ' + cache);
                if (cache) {
                    this.cacheStr.forEach((item) => {
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
        comp.File = File;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
