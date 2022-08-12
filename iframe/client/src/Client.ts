interface IApi {

}

interface Window {
    client2: {
        setApi: (api2: IApi) => void,
        update: () => void,
        updateParent: () => void
    },

}
namespace client2 {
    let api: IApi;
    let tbl: HTMLButtonElement;

    function log(msg: string): void {
        console.log('client: ' + msg);
    }

    window.onload = () => {
        log('on load');
        tbl = ha.comp.Util.getEl('button.update') as HTMLButtonElement;
        tbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            log('tbl click');
            updateParent()
                .then(() => {
                    log('update parent selesai')
                })
                .catch((e) => {
                    console.error(e);
                })
        }
    }

    export function setApi(api2: IApi): void {
        log('set api');
        api = api2
    }

    async function updateParent(): Promise<void> {
        for (let i: number = 0; i < 3; i++) {
            if (api) {
                log('update parent sukses');
                break;
            }
            else {
                log('update parent delay ' + i);
            }
        }
    }

    export async function update(): Promise<void> {
        log('update');
    }
}


