import { Data } from "../Data";
export class HalProject {
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
