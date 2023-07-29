class Chat {
    static render(data, cont) {
        let div;
        div = document.createElement('div');
        div.classList.add('chat-bot');
        div.innerHTML = data.isi;
        cont.appendChild(div);
    }
}
const chatCont = ha.comp.Util.getEl('chat-cont');
Chat.render(data[0], chatCont);
