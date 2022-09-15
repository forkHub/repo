var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Util {
            static sUserId = 'user_id';
            static sLevel = 'level';
            static sFilter = 'filter';
            static storageId = 'xyz.hagarden.tugas';
            static createEl(str) {
                let div = document.createElement('div');
                let el;
                div.innerHTML = str;
                el = div.firstElementChild;
                if (!el) {
                    console.log(div);
                    console.log(str);
                    throw new Error('');
                }
                return el;
            }
            static getTemplate(query) {
                try {
                    let template = document.body.querySelector('template').content;
                    return template.querySelector(query).cloneNode(true);
                }
                catch (e) {
                    console.log('template:' + query);
                    throw Error(e);
                }
            }
            static getEl(query, parent = null, err = true) {
                let el;
                if (!parent)
                    parent = document.body;
                el = parent.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(parent);
                    console.log(query);
                    if (err) {
                        throw new Error('query not found ');
                    }
                    else {
                        return null;
                    }
                }
            }
            static id() {
                return Date.now();
            }
            static async delay(m = 10) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, m);
                });
            }
            static stackTrace() {
                try {
                    throw Error('');
                }
                catch (e) {
                    console.error(e);
                }
            }
            static bersihDiv(div) {
                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }
            }
            //default error
            static error(e) {
                console.error(e);
                comp.dialog.tampil(e.message);
            }
            //shared
            static kirimWa(teks) {
                return "whatsapp://send?text=" + teks;
            }
            static getUrl(url, params) {
                let urlHasil = url;
                console.group('get url');
                console.log('url: ' + url);
                console.log('params: ' + JSON.stringify(params));
                params.forEach((item) => {
                    console.log('reg: ' + urlHasil.search(/\:[a-zA-Z_0-9]+/));
                    urlHasil = urlHasil.replace(/\:[a-zA-Z_0-9]+/, item + '');
                    console.log('item: ' + item);
                    console.log('url: ' + urlHasil);
                });
                console.log('url hasil: ' + urlHasil);
                console.groupEnd();
                return urlHasil;
            }
            static build(temp) {
                let div = document.createElement('div');
                let el;
                div.innerHTML = temp;
                el = div.firstElementChild;
                // this._elHtml = el;
                if (!el) {
                    console.log(div);
                    console.log(temp);
                    throw new Error('');
                }
                return el;
            }
            static async AjaxLogin(type, urlServer, dataStr, loginUrl, pf = null) {
                let xml;
                xml = await this.Ajax(type, urlServer, dataStr, pf);
                if (401 == xml.status) {
                    window.top.location.href = loginUrl;
                    return null;
                }
                else {
                    return xml;
                }
            }
            static async Ajax2(type, url, dataStr, pf = null) {
                let x = await this.Ajax(type, url, dataStr, pf);
                if (x.status == 200 || x.status == 0) {
                    return x.responseText;
                }
                console.log('error status code: ' + x.status);
                throw Error(x.responseText);
            }
            static async Ajax(type, url, dataStr, pf = null) {
                return new Promise((resolve, reject) => {
                    try {
                        console.group('send data');
                        // console.log(dataStr);
                        console.log("type " + type);
                        comp.loading.attach(document.body);
                        let xhr = new XMLHttpRequest();
                        xhr.onload = () => {
                            comp.loading.detach();
                            resolve(xhr);
                        };
                        xhr.onerror = (e) => {
                            console.log('xhr error');
                            console.log(e);
                            comp.loading.detach();
                            reject(new Error(e.message));
                        };
                        xhr.onprogress = (p) => {
                            if (pf) {
                                pf(p);
                            }
                        };
                        xhr.open(type, url + "", true);
                        xhr.setRequestHeader('Content-type', 'application/json');
                        // xhr.setRequestHeader('from', window.sessionStorage.getItem(Util.sUserId));
                        // xhr.setRequestHeader('id', window.sessionStorage.getItem(Util.sUserId));
                        xhr.send(dataStr);
                        // console.log("type " + type);
                        // console.log("url " + url);
                        console.groupEnd();
                    }
                    catch (e) {
                        console.log('Util error');
                        console.log(e);
                        comp.loading.detach();
                        reject(new Error(e.message));
                    }
                });
            }
        }
        comp.Util = Util;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
