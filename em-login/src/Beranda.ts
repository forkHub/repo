namespace ha.contact {
    class Beranda {

        init(): void {
            // let exit: HTMLButtonElement = document.body.querySelector("button.exit") as HTMLButtonElement;
            // console.log(exit);
            // exit.onclick = () => {
            //     let data: IMessage = {
            //         to: 'server',
            //         action: 'exit',
            //         data: ''
            //     }

            //     window.parent.postMessage(JSON.stringify(data), "*");
            // }
        }

        get cont(): HTMLDivElement {
            return ha.comp.Util.getEl('ha-cont') as HTMLDivElement;
        }

        get kolomKiri(): HTMLDivElement {
            return ha.comp.Util.getEl('ha-cont kol-kiri') as HTMLDivElement;
        }

        get kolomKanan(): HTMLDivElement {
            return ha.comp.Util.getEl('ha-cont kol-kanan') as HTMLDivElement;
        }

        get cariTbl(): HTMLButtonElement {
            return ha.comp.Util.getEl('ha-header button.cari') as HTMLButtonElement;
        }

        get tutupTbl(): HTMLButtonElement {
            return ha.comp.Util.getEl("ha-header button.tutup") as HTMLButtonElement;
        }

    }

    export var beranda: Beranda = new Beranda();
}