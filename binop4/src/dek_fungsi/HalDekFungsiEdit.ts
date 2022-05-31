// namespace fungsi.deklarasi {
//     //const

//     export function mulai(): void {
//         storage.muat();

//         //cari modul diedit
//         let modulObj: IModul = modul.diedit();
//         let variableObj: IVar[];
//         let paramObj: IParam[];

//         if (modulObj) {
//             variableObj = variable.byIndukId(modulObj.id);
//             paramObj = param.byIndukId(modulObj.id);

//         }
//         else {
//             console.error('tidak ada modul diedit');
//         }

//         //TODO:
//         variableObj;
//         paramObj;

//     }

//     export function event(): void {
//         // menu.tambah.param().onclick = (e: MouseEvent) => {
//         //     e.stopPropagation();
//         // }
//     }
// }

// /*
// namespace fungsi.deklarasi.daftar {
//     export function nama(): HTMLDivElement {
//         return ha.comp.Util.getEl('div.daftar div.nama') as HTMLDivElement;
//     }

//     export function param(): HTMLDivElement {
//         return ha.comp.Util.getEl('div.daftar div.param') as HTMLDivElement;
//     }

//     export function variable(): HTMLDivElement {
//         return ha.comp.Util.getEl('div.daftar div.var') as HTMLDivElement;
//     }

//     export function stmt(): HTMLDivElement {
//         return ha.comp.Util.getEl('div.daftar div.stmt') as HTMLDivElement;
//     }
// }
// */

// /*
// namespace fungsi.deklarasi.menu {
//     export function el(): HTMLDivElement {
//         return ha.comp.Util.getEl('div.menu') as HTMLDivElement;
//     }

//     export namespace utama {

//         export function el(): HTMLDivElement {
//             return ha.comp.Util.getEl('div.utama', menu.el()) as HTMLDivElement;
//         }

//         export function modul(): HTMLButtonElement {
//             return ha.comp.Util.getEl('button.modul', utama.el()) as HTMLButtonElement;
//         }

//         export function tambah(): HTMLButtonElement {
//             return ha.comp.Util.getEl('button.tambah', utama.el()) as HTMLButtonElement;
//         }

//         export function update(): HTMLButtonElement {
//             return ha.comp.Util.getEl('button.update', utama.el()) as HTMLButtonElement;
//         }

//         export function hapus(): HTMLButtonElement {
//             return ha.comp.Util.getEl('button.delete', utama.el()) as HTMLButtonElement;
//         }

//     }

//     export namespace tambah {
//         export function el(): HTMLDivElement {
//             return ha.comp.Util.getEl('div.tambah', menu.el()) as HTMLDivElement;
//         }

//         export function variable(): HTMLButtonElement {
//             return ha.comp.Util.getEl('button.var', utama.el()) as HTMLButtonElement;
//         }

//         export function param(): HTMLButtonElement {
//             return ha.comp.Util.getEl('button.param', utama.el()) as HTMLButtonElement;
//         }

//         export function stmt(): HTMLButtonElement {
//             return ha.comp.Util.getEl('button.stmt', utama.el()) as HTMLButtonElement;
//         }

//     }
// }
// */


