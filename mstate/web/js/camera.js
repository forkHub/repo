let log = [];
const M_IDLE = 'idle';
const M_PENCET = 'pencet';
const M_GERAK = 'gerak';
const M_DRAG = 'drag';
const M_TAP = 'tap';
let mState = M_IDLE;
let mPencetX = 0;
let mPencetY = 0;
let mDragX = 0;
let mDragY = 0;
let clientX = 0;
function debug(msg) {
    log = [];
    ha.comp.Util.getEl('div.debug').innerHTML = msg;
}
function debugTambah(msg) {
    log.push(msg);
    let str = '';
    log.forEach((item) => {
        str += item + '<br/>';
    });
    ha.comp.Util.getEl('div.debug').innerHTML = str;
}
window.onpointerdown = (e) => {
    mState = M_PENCET;
    mPencetX = e.clientX;
    mPencetY = e.clientY;
};
window.onpointermove = (e) => {
    if (mState == M_PENCET) {
        mDragX = e.clientX - mPencetX;
        mDragY = e.clientY - mPencetY;
        let p = (Math.abs(mDragX) + Math.abs(mDragY));
        if (p > 1.5) {
            mState = M_DRAG;
            clientX = e.clientX;
        }
    }
    else if (mState == M_DRAG) {
        mDragX = e.clientX - mPencetX;
        mDragY = e.clientY - mPencetY;
        clientX = e.clientX;
    }
    else if (mState == M_IDLE) {
        mState = M_GERAK;
    }
};
window.onpointerleave = () => {
    mState = M_IDLE;
};
window.onpointerenter = () => {
    mState = M_IDLE;
};
window.onpointerover = () => {
};
window.onpointerup = () => {
    if (mState == M_DRAG) {
        mState = M_IDLE;
    }
    else if (mState == M_PENCET) {
        mState = M_TAP;
    }
};
window.onload = () => {
    setInterval(() => {
        debug('');
        debugTambah('m state: ' + mState);
        debugTambah('m drag, x: ' + mDragX + '/y: ' + mDragY);
        debugTambah('client, x: ' + clientX);
    }, 100);
};
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        // export function createComponent(template: string): BaseComponent {
        // 	let comp: BaseComponent = new BaseComponent();
        // 	comp.template = template;
        // 	comp.build();
        // 	return comp;
        // }
        class BaseComponent {
            constructor() {
                this._template = '';
                this._elHtml = document.createElement('div');
            }
            // protected get template(): string {
            // 	return this._template;
            // }
            // protected set template(value: string) {
            // 	this._template = value;
            // }
            static buat(temp) {
                let view = new BaseComponent();
                view.build(temp);
                return view;
            }
            async loadTemplate(f) {
                let http = await comp.Util.Ajax('get', f, '');
                if (200 == http.status) {
                    return http.responseText;
                }
                else {
                    throw new Error(http.responseText);
                }
            }
            destroy() {
                this.detach();
                while (this._elHtml.firstChild) {
                    this._elHtml.removeChild(this._elHtml.firstChild);
                }
                this._elHtml = null;
            }
            attach(parent) {
                parent.appendChild(this._elHtml);
                this._parent = parent;
            }
            detach() {
                // console.log('loading detach');
                // console.log(this._elHtml.parentElement);
                if (this._elHtml.parentElement) {
                    this._elHtml.parentElement.removeChild(this._elHtml);
                    return true;
                }
                return false;
            }
            getEl(query) {
                let el;
                el = this._elHtml.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(this._elHtml);
                    console.log(query);
                    throw new Error('query not found ');
                }
            }
            build(temp = '') {
                let div = document.createElement('div');
                let el;
                if (temp && temp != '') {
                    this._template = temp;
                }
                div.innerHTML = this._template;
                el = div.firstElementChild;
                this._elHtml = el;
                if (!this._elHtml) {
                    console.log(div);
                    console.log(this._template);
                    throw new Error('');
                }
            }
            getTemplate(query) {
                try {
                    let template = document.body.querySelector('template').content;
                    return template.querySelector(query).cloneNode(true);
                }
                catch (e) {
                    console.log('template:' + query);
                    throw Error(e);
                }
            }
            // getElFromDoc(query: string): HTMLElement {
            // 	let el: HTMLElement;
            // 	el = document.querySelector(query);
            // 	if (!el) throw new Error();
            // 	return el;
            // }
            get elHtml() {
                return this._elHtml;
            }
        }
        comp.BaseComponent = BaseComponent;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Dialog extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='comp dialog'>
					<div class='box'>
						<p class='deskripsi'>Contoh dialog </p>
						<button class="btn btn-primary ok">OK</button>
					</div>
				</div>
				`;
                this.build();
            }
            init() {
                this.detach();
            }
            tampil(pesan = '', def = true) {
                ha.comp.Util.stackTrace();
                this.p.innerHTML = pesan;
                if (def) {
                    this.okTbl.onclick = () => {
                        this.detach();
                    };
                }
                this.attach(document.body);
                this._elHtml.style.display = 'block';
            }
            get okTbl() {
                return this.getEl('button.ok');
            }
            get p() {
                return this.getEl('p');
            }
        }
        comp.dialog = new Dialog();
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Loading extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='loading'>
					<div class='box'>
						<img src=''/>
						<p>Memuat ...</p> 
					</div> 
				</div>
			`;
                this.build();
            }
            tampil() {
                console.log('loading tampil');
                this.attach(document.body);
            }
        }
        comp.loading = new Loading();
        console.log('exporting loading: ' + comp.loading);
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class MenuKontek {
            constructor() {
                this.view = new View();
            }
            buatTombol(t) {
                let button = document.createElement('button');
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.style.display = 'inline-block';
                button.style.margin = 'auto';
                button.style.marginBottom = '8px';
                button.textContent = t.label;
                button.onclick = (e) => {
                    e.stopPropagation();
                    this.view.detach();
                    t.f();
                };
                this.view.elHtml.appendChild(button);
            }
        }
        comp.MenuKontek = MenuKontek;
        class View extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='menu-context'>
				</div>
			`;
                this.build();
                this._elHtml.style.wordBreak = 'no-wrap';
            }
        }
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class MenuPopup {
            constructor() {
                this.view = new View();
            }
            destroy() {
                this.view.destroy();
            }
            buatTombol2(t) {
                t.forEach((item) => {
                    this.buatTombol(item);
                });
            }
            buatTombol(t) {
                let button = document.createElement('button');
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.style.display = 'block';
                button.style.margin = 'auto';
                button.style.marginBottom = '8px';
                button.textContent = t.label;
                button.onclick = (e) => {
                    e.stopPropagation();
                    this.view.detach();
                    t.f();
                };
                this.view.box.appendChild(button);
            }
        }
        comp.MenuPopup = MenuPopup;
        class View extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='menu-popup' style="position:fixed; top:0px; left:0px; right:0px; bottom:0px; z-index:1000; background-color: rgba(0,0,0,.3)">
					<div class='box cont' style="position:fixed; bottom:0px; left:0px; right:0px">
					</div>
				</div>
			`;
                this.build();
                this.box.style.backgroundColor = 'white';
                this.box.style.padding = '8px';
                this.box.style.textAlign = 'center';
                this._elHtml.onclick = () => {
                    this.detach();
                };
            }
            get box() {
                return this.getEl('div.box.cont');
            }
        }
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Util {
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
        Util.sUserId = 'user_id';
        Util.sLevel = 'level';
        Util.sFilter = 'filter';
        Util.storageId = 'xyz.hagarden.tugas';
        comp.Util = Util;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
