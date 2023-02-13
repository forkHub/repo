var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Ajax {
            async send(conf) {
                return new Promise((resolve, reject) => {
                    try {
                        console.group('send data, method: ' + conf.method);
                        let xhr = new XMLHttpRequest();
                        xhr.onload = () => {
                            comp.loading.detach();
                            resolve(xhr);
                        };
                        xhr.onerror = (e) => {
                            reject(new Error(e.message));
                        };
                        xhr.onprogress = (p) => {
                            if (conf.onProgress) {
                                conf.onProgress(p);
                            }
                        };
                        xhr.open(conf.method, conf.url, true);
                        conf.header.forEach((item) => {
                            xhr.setRequestHeader(item.key, item.value);
                        });
                        xhr.send(conf.data);
                        console.groupEnd();
                    }
                    catch (e) {
                        console.log('Util error');
                        console.log(e);
                        reject(new Error(e.message));
                    }
                });
            }
            conf() {
                return {
                    data: '',
                    header: [],
                    method: '',
                    url: ''
                };
            }
        }
        comp.ajax = new Ajax();
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
