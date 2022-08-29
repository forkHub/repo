namespace ha.contact {
    class Contact {
        private data: Idata;
        private frame: HTMLIFrameElement;
        private readonly _dev: boolean = false;
        public get dev(): boolean {
            return this._dev;
        }

        constructor() {
        }

        init(): void {
            console.group('contact init');

            window.addEventListener("message", (e: MessageEvent) => {
                console.group("client receive message:");

                console.log("event:");
                console.log(e);

                this.processData(e.data);

                console.groupEnd();
            });


            console.groupEnd();
        }

        postRefresh(): void {
            console.log('post refresh');
            let data: IMessage = {
                to: 'server',
                action: 'refresh',
                data: ''
            }

            window.parent.postMessage(JSON.stringify(data), "*");
        }

        refresh(data: IMessage): void {
            let data2: any = data.data as IContactListCont;
            let size: number = data2.size;

            console.group('refresh:');
            console.log("data:");
            console.log(data);
            console.log("size: " + size);
            console.log("data 2:");
            console.log(data2);
            console.log(JSON.parse(data2));


            for (let i: number = 0; i < size; i++) {
                let obj: any = data2 as unknown;
                let data3: IContactList = ((obj[i + ""] as unknown) as IContactList);
                console.log("i" + i);
                console.log(data3);
            }

            console.groupEnd();
        }

        processData(data: IMessage): void {
            console.group('process data');

            if (data.data == "") {
                console.log('empty data, no continue');
                console.groupEnd();
                return;
            }

            let msg: IMessage = JSON.parse(data.data);
            console.log("msg:");
            console.log(msg);

            if (data.to == 'client') {
                console.log('message is for client');
                if ('refresh' == data.action) {
                    this.refresh(data);
                }
                else {
                    console.log('invalid action');
                    console.log(data);
                    throw Error('');
                }
            }
            else {
                console.log('the message is not for me');
            }

            console.groupEnd();
        }

        component2(): void {
            let frame: HTMLIFrameElement;
            frame;
            window.addEventListener("message", (e: MessageEvent) => {
                console.group("component receive message:");

                console.log("event:");
                console.log(e);

                let msg: IMessage = JSON.parse(e.data);
                if (msg.to == 'server') {
                    console.log("the message is for server");
                    this.data.data = msg.data
                    this.postUpdate();
                }
                else if (msg.to == "client") {
                    console.log('the message is for client');
                    this.frame.contentWindow.postMessage(msg.data, '*');
                }

                console.groupEnd();
            });
        }

        postUpdate(): void {

        }
    }

    export var contact: Contact = new Contact();

}



window.onload = () => {
    // var contact: ha.Contact = new ha.Contact();
    // contact.init();

    ha.contact.contact.init();

    ha.contact.beranda.init();
    ha.contact.cari.init();

    //contact detail
    ha.contact.offline.init();
    ha.contact.wrapUp.init();
    ha.contact.customer.init();

    //daftar contact
    ha.contact.daftar.render(ha.contact.data.daftarContact());

    //detail
    ha.contact.offline.attach(ha.contact.beranda.kolomKanan);
    ha.contact.wrapUp.attach(ha.contact.beranda.kolomKanan);
    ha.contact.customer.attach(ha.contact.beranda.kolomKanan);
}



