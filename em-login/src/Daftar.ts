namespace ha.contact {
    class Daftar {

        render(data: IContactList[]): void {
            ha.contact.beranda.kolomKiri.innerHTML = '';

            data.forEach((item: IContactList) => {
                let view: View = new View(item);
                // console.log(ha.contact.beranda.kolomKiri);
                view.attach(ha.contact.beranda.kolomKiri);
            })
        }
    }

    class View extends ha.comp.BaseComponent {
        private item: IContactList;

        constructor(item: IContactList) {
            super();

            this._elHtml = this.getTemplate('ha-contact-item');
            this.item = item;

            this.tanggal.innerHTML = this.formatTanggal(this.item.startTime);
            this.nama.innerHTML = this.item.agentDisplayName;

            //direction
            //channel
            this._elHtml.setAttribute("data-direction", this.item.direction);
            this._elHtml.setAttribute("data-channel", item.channel);

            let icon: string;
            if (item.channel == "Offline") {
                icon = ha.contact.Font.icon_adult;
            }
            else if (item.channel == "Email") {
                icon = ha.contact.Font.icon_email;
            }
            else if (item.channel == "Messaging Interaction") {
                icon = ha.contact.Font.icon_messaging;
            }
            else if (item.channel == "Telephony") {
                icon = ha.contact.Font.icon_phone;
            }
            else {
                console.log(item.channel);
                throw Error("");
            }
            this.icon.innerHTML = icon;

            this._elHtml.onclick = () => {
                console.log('click');
            }
        }

        formatTanggal(tgl: string): string {
            let date: Date = new Date(tgl);
            let tahun: number = date.getFullYear();
            let bln: number = date.getMonth();
            let hari: number = date.getDate();

            if (date.toString() == "Invalid Date") {
                // console.log('date invalid');
                date = new Date();
            }

            tahun = date.getFullYear();
            bln = date.getMonth();
            hari = date.getDate();

            // console.group("format tanggal: ");
            // console.log("tgl " + tgl);
            // console.log("date:");
            // console.log(date);
            // console.groupEnd();

            return tahun + '/' + bln + '/' + hari;
        }

        get tanggal(): HTMLDivElement {
            return this.getEl('ha-tanggal') as HTMLDivElement;
        }

        get nama(): HTMLDivElement {
            return this.getEl('ha-nama') as HTMLDivElement;
        }

        get icon(): HTMLSpanElement {
            return this.getEl('span.icon') as HTMLSpanElement;
        }
    }

    export var daftar: Daftar = new Daftar();
}