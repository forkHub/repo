import { dialog } from "../comp/Dialog.js";
import { loading } from "../comp/Loading.js";
//TODO:hapus
class Util {
    static sUserId = 'user_id';
    static sLevel = 'level';
    static sFilter = 'filter';
    static storageId = 'xyz.hagarden.tugas';
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
    static async Ajax(type, url, dataStr, pf = null) {
        console.log('ajax');
        return new Promise((resolve, reject) => {
            try {
                console.group('send data');
                console.log(dataStr);
                console.log("type " + type);
                loading.attach(document.body);
                let xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    loading.detach();
                    resolve(xhr);
                };
                xhr.onerror = (e) => {
                    console.log('xhr error');
                    console.log(e);
                    loading.detach();
                    reject(new Error(e.message));
                };
                xhr.onprogress = (p) => {
                    if (pf) {
                        pf(p);
                    }
                };
                xhr.open(type, url + "", true);
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('from', window.sessionStorage.getItem(Util.sUserId));
                xhr.setRequestHeader('id', window.sessionStorage.getItem(Util.sUserId));
                xhr.send(dataStr);
                // console.log("type " + type);
                // console.log("url " + url);
                console.groupEnd();
            }
            catch (e) {
                console.log('Util error');
                console.log(e);
                loading.detach();
                reject(new Error(e.message));
            }
        });
    }
    static error(e) {
        console.error(e);
        dialog.tampil(e.message);
    }
    static async sql(query) {
        console.log('sql');
        let hasil = await this.Ajax("post", "http://localhost:3000/api/", JSON.stringify({ api: query }));
        if (hasil.status == 200) {
            return JSON.parse(hasil.responseText);
        }
        else {
            throw Error(hasil.responseText);
        }
    }
}
Util;
