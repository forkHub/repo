namespace ha.modul.menu {

    export function ganti(kontek: string, cont: HTMLDivElement): void {
        let menu: IMenu[] = [];

        menu = getMenuByContext(kontek);

        menu.forEach((item: IMenu) => {
            item.view = buatTombol(item.nama);
            item.view.onclick = () => {
                console.log("item on click");
                item.klik();
            }
            cont.appendChild(item.view);
        });
    }

    function buatTombol(label: string): HTMLButtonElement {
        let tombol: HTMLButtonElement;

        tombol = document.createElement("button") as HTMLButtonElement;
        tombol.innerText = label;

        return tombol;
    }

    function getMenuByContext(kontek: string): IMenu[] {
        let hasil: IMenu[] = [];

        menuData.forEach((item: IMenu) => {
            if (item.kontek == kontek) {
                hasil.push(item);
            }
        })

        return hasil;
    }

}