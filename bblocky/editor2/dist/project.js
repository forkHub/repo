/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: HalProject

;// CONCATENATED MODULE: ./out/Data.js
class Data_Data {
    static loaded = false;
    static db = 'ha.blockly.data';
    static data = {
        files: []
    };
    static load() {
        if (Data_Data.loaded)
            return;
        try {
            let str = window.localStorage.getItem(this.db);
            let obj = JSON.parse(str);
            Data_Data.data.files = obj;
            Data_Data.loaded = true;
            console.log("load:", str);
            console.log("obj ", obj);
        }
        catch (e) {
            Data_Data.data.files = [];
            console.log('load error');
            console.warn(e);
            console.log(Data_Data.data.files);
            console.log(Data_Data);
        }
    }
    static baru(item) {
        this.load();
        this.data.files.push(item);
    }
    static semua() {
        console.log("semua", Data_Data.data);
        this.load();
        console.log("semua", Data_Data.data);
        return Data_Data.data.files;
    }
    static simpan() {
        try {
            window.localStorage.setItem(this.db, JSON.stringify(this.data.files));
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
}

;// CONCATENATED MODULE: ./out/project/halProject.js

//entry point
class HalProject {
    static list(cont) {
        //get data;
        let hasil = '';
        console.log(Data.semua());
        Data.semua().forEach((item) => {
            hasil += (`<div>
                        <span>${item.nama}</span>
                        |
                        <span>
                            <button onclick="openFile(${item.id})">open</button>
                            <button onclick="deleteFile(${item.id})">delete</button>
                        </span>
                    </div>`);
        });
        cont.innerHTML = hasil;
        return hasil;
    }
    static init() {
        HalProject.list(document.body.querySelector('.list'));
        document.body.querySelector('button.baru').onclick = () => {
            console.log('baru klik');
            let file = {
                id: 1 + '',
                data: '',
                nama: 'file1'
            };
            Data.baru(file);
            Data.simpan();
            document.location.reload();
        };
    }
}

/******/ })()
;