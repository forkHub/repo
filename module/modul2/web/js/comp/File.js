var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class File {
            static async load(url) {
                let str;
                this.cacheStr.forEach((item) => {
                    if (item.url == url) {
                        str = item.str;
                    }
                });
                if (str != '')
                    return str;
                str = await ha.comp.Util.Ajax2('get', url, '');
                this.cacheStr.push({
                    url: url,
                    str: str
                });
                return str;
            }
        }
        File.cacheStr = [];
        comp.File = File;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
