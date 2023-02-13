class TpsService {
    static readonly url: string = 'http://localhost:8312/tenant-properties-service/default/properties';

    static async refresh(): Promise<void> {
        //TODO:
        // while (session.prop.items.length > 0) {
        //     session.prop.items.pop();
        // }
        // await this.getProp();
    }

    static async getProp(): Promise<void> {
        console.log(TpsService.name + 'getProp: ');

        let x: XMLHttpRequest = new XMLHttpRequest();
        x.open('get', TpsService.url, true);
        x.setRequestHeader('Authorization', `OIDC_id_token ${tempSession.token}`);
        await ha.comp.Util.AjaxSend(x, '');

        if (200 == x.status) {
            //TODO:
            // let obj: any = JSON.parse(x.responseText);

            // session.prop.total = obj["hydra:totalItems"];
            // let items: any[] = obj["hydra:member"];

            // while (session.prop.items.length > 0) {
            //     session.prop.items.pop();
            // }

            // items.forEach((item: any) => {
            //     session.prop.items.push({
            //         id: ha.comp.Id.id + '',
            //         nama: item["vcfg:name"],
            //         value: item["vcfg:value"]
            //     })
            // })
        }
        else {
            console.log('error, ' + x.status);
        }
    }

    static async setProp(nama: string, value: string): Promise<XMLHttpRequest> {
        let conf: IAjaxConfiguration = ha.comp.ajax.conf();
        // let prop: IProp2 = sessionGet(id);

        conf.header.push({
            key: 'Authorization',
            value: `OIDC_id_token ${tempSession.token}`
        });

        conf.header.push({
            key: 'Content-Type',
            value: 'application/ld+json'
        })

        let req: any = {};
        req["@type"] = "vcfg:PropertyUpdateOrCreate"
        req["vcfg:name"] = nama;
        req["vcfg:value"] = value;

        conf.data = JSON.stringify(req);
        conf.method = 'PATCH';
        conf.url = TpsService.url;

        let x: XMLHttpRequest = await ha.comp.ajax.send(conf);
        return x;
    }

    static async tambahProp(prop: IProp2): Promise<XMLHttpRequest> {
        let conf: IAjaxConfiguration = ha.comp.ajax.conf();

        conf.header.push({
            key: 'Authorization',
            value: `OIDC_id_token ${tempSession.token}`
        });

        conf.header.push({
            key: 'Content-Type',
            value: 'application/ld+json'
        })

        debugger;

        let req: any = {};
        req["@type"] = "vcfg:PropertyUpdateOrCreate"
        req["vcfg:name"] = prop.nama;
        req["vcfg:value"] = prop.value;

        conf.data = JSON.stringify(req);
        conf.method = 'PATCH';
        conf.url = TpsService.url;

        let x: XMLHttpRequest = await ha.comp.ajax.send(conf);
        return x;
    }
}

interface IProp {
    total: number,
    items: IProp2[]
}

interface IProp2 {
    id: string
    nama: string,
    value: any
}