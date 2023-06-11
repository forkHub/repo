var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Util {
    static html(str) {
        let div = document.createElement('div');
        div.innerHTML = str;
        let hasil = div.firstElementChild;
        return hasil;
    }
    static dialog(pesan) {
        let str = `
            <dialog>
                <p>${pesan}</p>
                <form method="dialog">
                    <button class="ok">OK</button>
                </form>
            </dialog>
        `;
        let el = this.html(str);
        document.body.appendChild(el);
        el.showModal();
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
    static delay(m = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, m);
            });
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
}
Util.sUserId = 'user_id';
Util.sLevel = 'level';
Util.sFilter = 'filter';
Util.storageId = 'xyz.hagarden.tugas';
