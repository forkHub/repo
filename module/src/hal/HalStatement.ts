namespace ha.modul {

    class HalStatement {
        private daftarView: HTMLDivElement;

        tampil() {
            ha.modul.session.load();
            this.daftarView = ha.comp.Util.getEl('halaman daftar') as HTMLDivElement;
            sessionObj.modulDipilih = daftarModul[0];
            this.render();
            menu.ganti(KONTEK_MODUL, ha.comp.Util.getEl('menu') as HTMLDivElement)
        }

        render(): void {

            console.group('render, jml ' + daftarModul.length);

            while (this.daftarView.firstChild) {
                this.daftarView.removeChild(this.daftarView.firstChild);
            }

            //render item
            daftarModul.forEach((item: IModul) => {
                if (item.view) item.view.detach();

                let view: ItemView = new ItemView();
                view.judul.innerHTML = item.nama;
                view.attach(this.daftarView);
                item.view = view;
                if (sessionObj.modulDipilih == item) {
                    view.dipilih();
                }
                // this.items.push(item);

                //tambahkan item event
                item.view.elHtml.onclick = () => {

                    //reset pilih
                    daftarModul.forEach((item: IModul) => {
                        item.view.tidakDipilih();
                    });

                    //pilih item sekarang
                    item.view.dipilih();
                    sessionObj.modulDipilih = item;
                }
            });

            console.groupEnd();
        }
    }

    export var halStatement: HalStatement = new HalStatement();
}