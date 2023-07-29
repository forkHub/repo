namespace ly {
    export const tombol: HTMLButtonElement[] = [

    ];

    tombol.push(buatTombol('+kolom', async (): Promise<void> => {

    }));


    function buatTombol(label: string, klik: () => Promise<void>): HTMLButtonElement {
        let tbl: HTMLButtonElement;

        tbl = document.createElement('button') as HTMLButtonElement;
        tbl.innerText = label;
        tbl.onclick = async (e): Promise<void> => {
            e.stopPropagation();
            await klik();
        }

        return tbl;
    }

    export interface ILayout {
        id: number;
        anak: ILayout[]
    }
}