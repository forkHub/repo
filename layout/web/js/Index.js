let menuEl = document.querySelector('div.menu');
let editorEl = document.querySelector('div.editor');
let layoutAktif;
//buat awal
layoutAktif = ly.Layout.create();
editorEl.appendChild(ly.View.create(layoutAktif).view);
