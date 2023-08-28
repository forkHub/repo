import { Data, TFile } from "../Data";
import { Id } from "../Id";

//entry point
export class HalProject {

    static list(cont: HTMLDivElement): string {
        //get data;
        let hasil = '';
        console.log(Data.semua());

        Data.semua().forEach((item) => {
            hasil += (
                `<div>
                        <span>${item.nama}</span>
                        |
                        <span>
                            <button onclick="openFile(${item.id})">open</button>
                            <button onclick="deleteFile(${item.id})">delete</button>
                            <button onclick="renameFile(${item.id})">rename</button>
                        </span>
                    </div>`
            );
        });

        cont.innerHTML = hasil;
        return hasil;
    }

    static init(): void {
        HalProject.list(document.body.querySelector('.list'));

        (document.body.querySelector('button.baru') as HTMLButtonElement).onclick = () => {
            console.log('baru klik');
            let nama = window.prompt("file name: ", "file" + Id.id);
            let file: TFile = {
                id: Id.id + '',
                data: '{}',
                data64: Data.template,
                nama: nama
            }
            Data.baru(file);
            Data.simpan();
            document.location.reload();
        }

        //window function
        let w: any = window;
        w.openFile = (id: string) => {
            console.group('load file, id ' + id);
            Data.data.activeFileId = id;
            Data.simpan();
            window.location.href = './edit.html';
            console.groupEnd();
        };

        w.deleteFile = (id: string) => {
            id;
            //TODO:
        }

        w.renameFile = (id: string, name: string) => {
            let nama2 = window.prompt("name", name);
            Data.getFileById(id).nama = nama2;
            Data.simpan();
            window.location.reload();
        }

    }


}
HalProject.init();