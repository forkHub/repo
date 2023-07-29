// export function editModul(cont: HTMLElement) {
//     let menu = cont.querySelector('div.menu');

//     menu.innerHTML = `
//         <button class='buka'>buka</button>
//         <button class='tambah'>tambah</button>
//         <button class='hapus'>hapus</button>
//         <button class='rename'>rename</button>
//         <button class='var'>var</button>
//     `;

//     cont.querySelector('span.desk').innerHTML = 'Modul';

//     (menu.querySelector('button.buka') as HTMLButtonElement).onclick = (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         bukaModul();
//     };

//     (menu.querySelector('button.tambah') as HTMLButtonElement).onclick = (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         tambahModul();
//     };

//     (menu.querySelector('button.hapus') as HTMLButtonElement).onclick = (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         hapusModul();
//     };

//     (menu.querySelector('button.rename') as HTMLButtonElement).onclick = (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         renameModul();
//     };

//     (menu.querySelector('button.var') as HTMLButtonElement).onclick = (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         bukaVar();
//     };

// }