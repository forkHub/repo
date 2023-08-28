/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: HalProject

;// CONCATENATED MODULE: ./out/Data.js
class Data {
    static loaded = false;
    static db = 'ha.blockly.data';
    static template = `eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJHcmFmaXMiLCJpZCI6Iis3eTNEWW1gdzMkTX1icXRodzF8IiwieCI6LTY0NSwieSI6LTExNSwiaW5wdXRzIjp7IndpZHRoIjp7InNoYWRvdyI6eyJ0eXBlIjoibWF0aF9udW1iZXIiLCJpZCI6InBsTz1pbzFRbHE5TmI9ZHNIdiE7IiwiZmllbGRzIjp7Ik5VTSI6MzIwfX19LCJoZWlnaHQiOnsic2hhZG93Ijp7InR5cGUiOiJtYXRoX251bWJlciIsImlkIjoidWZTT2tUNGNbVixudiE4LihCRmsiLCJmaWVsZHMiOnsiTlVNIjoyNDB9fX19LCJuZXh0Ijp7ImJsb2NrIjp7InR5cGUiOiJ2YXJpYWJsZXNfc2V0IiwiaWQiOiJGW19wXXV9eHd4OVRkWiV0Li10VSIsImZpZWxkcyI6eyJWQVIiOnsiaWQiOiJWPUh8P0gsNiNEcmFlOSEoIThkXSJ9fSwiaW5wdXRzIjp7IlZBTFVFIjp7ImJsb2NrIjp7InR5cGUiOiJoYS5iYmpzLlNwcml0ZS5Mb2FkU3ByaXRlIiwiaWQiOiI5TjVtQV5qJVdTVFVXMngxay1YOiIsImlucHV0cyI6eyJ1cmwiOnsic2hhZG93Ijp7InR5cGUiOiJ0ZXh0IiwiaWQiOiJCfCFfNFFbZTYsSXpZckI/P21zbCIsImZpZWxkcyI6eyJURVhUIjoiLi9pbWdzL2JveC5wbmcifX19fX19fX19fSx7InR5cGUiOiJwcm9jZWR1cmVzX2RlZm5vcmV0dXJuIiwiaWQiOiIhaC5XRj9iRnxvZ1kwN0ZYXjN0SCIsIngiOi0yNDIsInkiOi0xMDUsImljb25zIjp7ImNvbW1lbnQiOnsidGV4dCI6IkRlc2NyaWJlIHRoaXMgZnVuY3Rpb24uLi4iLCJwaW5uZWQiOmZhbHNlLCJoZWlnaHQiOjgwLCJ3aWR0aCI6MTYwfX0sImZpZWxkcyI6eyJOQU1FIjoidXBkYXRlIn0sImlucHV0cyI6eyJTVEFDSyI6eyJibG9jayI6eyJ0eXBlIjoiaGEuYmUuTWFpbi5CZXJzaWgiLCJpZCI6IkpFXi91bXJnR15maEJpPWx2PVRFIiwibmV4dCI6eyJibG9jayI6eyJ0eXBlIjoiaGEuYmJqcy5TcHJpdGUuRHJhd1Nwcml0ZV92MiIsImlkIjoifiN1dH47ZWxiIWsqYG1TR0dtNWUiLCJmaWVsZHMiOnsiaW1nIjp7ImlkIjoiVj1IfD9ILDYjRHJhZTkhKCE4ZF0ifX19fX19fX1dfSwidmFyaWFibGVzIjpbeyJuYW1lIjoiaW1nIiwiaWQiOiJWPUh8P0gsNiNEcmFlOSEoIThkXSJ9XX0=`;
    static _data;
    static get data() {
        this.load();
        return Data._data;
    }
    static default() {
        return {
            files: [],
            activeFileId: '',
            fileTemp: null
        };
    }
    static load() {
        if (Data.loaded)
            return;
        try {
            console.group('load: ');
            let str = window.localStorage.getItem(this.db);
            let obj = JSON.parse(str);
            if (obj) {
                Data._data = obj;
                Data.loaded = true;
                console.log("load:", str);
                console.log("obj ", obj);
            }
            else {
                Data._data = this.default();
            }
        }
        catch (e) {
            Data._data = this.default();
            console.log('load error');
            console.warn(e);
            console.log(Data.data.files);
            console.log(Data);
        }
        finally {
            console.groupEnd();
        }
    }
    static baru(item) {
        this.load();
        this.data.files.push(item);
    }
    static semuaFile() {
        this.load();
        console.log("semua file", Data.data.files);
        return Data.data.files;
    }
    static simpan() {
        try {
            console.group("persist data:");
            window.localStorage.setItem(this.db, JSON.stringify(this.data));
            console.groupEnd();
        }
        catch (e) {
            console.warn(e);
        }
    }
    static hapus(id) {
        for (let i = 0; i < this.data.files.length; i++) {
            let item = this.data.files[i];
            if (item.id == id) {
                console.log('item deleted:", item.id ' + id, "item:", item);
                this.data.files.slice(i, 1);
            }
        }
    }
    static getFileById(id) {
        let hsl;
        this.load();
        this.data.files.forEach((item) => {
            if (item.id == id) {
                hsl = item;
            }
        });
        if (!hsl) {
            console.warn('file not found, id: ' + id);
        }
        return hsl;
    }
}

;// CONCATENATED MODULE: ./out/Id.js
class Id {
    static _id = Date.now();
    static get id() {
        this._id++;
        return this._id;
    }
}

;// CONCATENATED MODULE: ./out/project/halProject.js


//entry point
class HalProject {
    static list(cont) {
        //get data;
        let hasil = '';
        console.log(Data.semuaFile());
        Data.semuaFile().forEach((item) => {
            hasil += (`<div>
                        <span>${item.nama}</span>
                        |
                        <span>
                            <button onclick="openFile(${item.id})">open</button>
                            <button onclick="deleteFile(${item.id})">delete</button>
                            <button onclick="renameFile(${item.id})">rename</button>
                        </span>
                    </div>`);
        });
        cont.innerHTML = hasil;
        return hasil;
    }
    static winFunc() {
        document.body.querySelector('button.baru').onclick = () => {
            console.log('baru klik');
            let nama = window.prompt("file name: ", "file" + Id.id);
            let file = {
                id: Id.id + '',
                data: '{}',
                data64: Data.template,
                nama: nama,
                diedit: false
            };
            Data.baru(file);
            Data.simpan();
            document.location.reload();
        };
        //window function
        let w = window;
        w.openFile = (id) => {
            console.group('load file, id ' + id);
            Data.data.activeFileId = id;
            Data.simpan();
            window.location.href = './edit.html';
            console.groupEnd();
        };
        w.deleteFile = (id) => {
            id;
            //TODO:
        };
        w.renameFile = (id, name) => {
            let nama2 = window.prompt("name", name);
            Data.getFileById(id).nama = nama2;
            Data.simpan();
            window.location.reload();
        };
    }
    static init() {
        HalProject.list(document.body.querySelector('.list'));
        this.winFunc();
    }
}
HalProject.init();

/******/ })()
;