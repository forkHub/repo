let menuEl: HTMLDivElement = document.querySelector('div.menu') as HTMLDivElement;
let editorEl: HTMLDivElement = document.querySelector('div.editor') as HTMLDivElement;
let layoutAktif: ly.ILayout;

//buat awal
layoutAktif = ly.Layout.create();

editorEl.appendChild(ly.View.create(layoutAktif).view);
