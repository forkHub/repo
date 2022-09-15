class Chat {
    static _chatAktif;
    static getByLabel(label) {
        let hasil;
        data.forEach((item) => {
            if (item.label == label) {
                hasil = item;
            }
        });
        return hasil;
    }
    static renderText(str, cont, jawab = false) {
        let div;
        let divCont;
        divCont = document.createElement('div');
        divCont.classList.add('padding');
        div = document.createElement('div');
        div.classList.add('chat-bot');
        div.classList.add('padding');
        div.classList.add('inline-block');
        div.innerHTML = str;
        divCont.appendChild(div);
        if (jawab) {
            divCont.classList.add('jawab');
            divCont.classList.add('text-align-right');
            // div.classList.add('text-align-left');
        }
        cont.appendChild(divCont);
        return divCont;
    }
    static renderMenu(menu) {
        let hasil;
        hasil = document.createElement('div');
        let tbl;
        tbl = document.createElement('button');
        tbl.classList.add('padding');
        tbl.classList.add('inline-block');
        tbl.innerHTML = menu.judul;
        tbl.onclick = (e) => {
            e.stopPropagation();
            this.kirim(menu.judul);
        };
        hasil.appendChild(tbl);
        return hasil;
    }
    static render(data, jawab = false) {
        let div = this.renderText(data.isi, chatCont, jawab);
        if (data.menu) {
            data.menu.forEach((item) => {
                //render menu
                div.appendChild(this.renderMenu(item));
            });
        }
    }
    static mirip(test, teks) {
        test = test.toLowerCase();
        teks = teks.toLowerCase();
        test = test.trim().toLowerCase();
        teks = teks.trim().toLowerCase();
        if (test == teks)
            return true;
        if (test.includes(teks))
            return true;
        if (teks.includes(test))
            return true;
        return false;
    }
    static getGoto(teks) {
        let hasil = [];
        console.group('get goto');
        console.debug('teks: ' + teks);
        //check default
        if (this._chatAktif.gotoDef) {
            console.log('ada di def');
            console.log(this._chatAktif);
            hasil = this._chatAktif.gotoDef;
        }
        //check ada di response
        if (this.chatAktif.menu) {
            this._chatAktif.menu.forEach((item) => {
                if (this.mirip(item.judul, teks)) {
                    hasil = item.goto;
                    console.log('ada di menu');
                    console.log(hasil);
                    console.log(item.goto);
                }
            });
        }
        //check ada di menu
        if (this._chatAktif.resp) {
            this._chatAktif.resp.forEach((item) => {
                if (this.mirip(item.judul, teks)) {
                    console.log('ada di resp');
                    hasil = item.goto;
                }
            });
        }
        console.debug('hasil:');
        console.debug(hasil);
        console.groupEnd();
        return hasil;
    }
    static kirim(teks) {
        this.renderText(teks, chatCont, true);
        let hasil = this.getGoto(teks);
        if (hasil.length == 0) {
            let chat = this._chatAktif;
            // chat = this.getByLabel(item);
            this.render(chat);
            return;
        }
        hasil.forEach((item) => {
            let chat;
            chat = this.getByLabel(item);
            this._chatAktif = chat;
            this.render(chat);
        });
    }
    static get chatAktif() {
        return Chat._chatAktif;
    }
    static set chatAktif(value) {
        Chat._chatAktif = value;
    }
}
const chatCont = ha.comp.Util.getEl('div.chat-cont');
const kirimTbl = ha.comp.Util.getEl('button.kirim');
const jawabTxt = ha.comp.Util.getEl('input.jawab');
Chat.chatAktif = data[0];
Chat.render(data[0]);
// Chat.render(data[1]);
kirimTbl.onclick = (e) => {
    e.stopPropagation();
    Chat.kirim(jawabTxt.value);
};
