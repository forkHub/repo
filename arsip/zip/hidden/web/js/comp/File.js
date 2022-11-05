var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class File {
            static cacheStr = [];
            static async load(url) {
                let str = '';
                console.log('load: ' + url);
                this.cacheStr.forEach((item) => {
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
                console.log('str ' + str);
                return str;
            }
        }
        comp.File = File;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
