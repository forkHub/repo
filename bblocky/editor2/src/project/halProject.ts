import { Data, TFile } from "../Data";

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
            let file: TFile = {
                id: 1 + '',
                data: '',
                nama: 'file1'
            }
            Data.baru(file);
            Data.simpan();
            document.location.reload();
        }
    }

    // static render(): void {
    //     let html = `
    //         <div style="">
    //             <h1>My Work: </h1> | <button>New +</button>
    //             <div>
    //             </div>
    //         </div>
    //     `;
    //     document.body.innerHTML = html;
    // }
}