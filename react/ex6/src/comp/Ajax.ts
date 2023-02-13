namespace ha.comp {
    class Ajax {
        async send(conf: IAjaxConfiguration): Promise<XMLHttpRequest> {
            return new Promise((resolve: any, reject: any) => {
                try {
                    console.group('send data, method: ' + conf.method);
                    let xhr: XMLHttpRequest = new XMLHttpRequest();

                    xhr.onload = () => {
                        loading.detach();
                        resolve(xhr);
                    };

                    xhr.onerror = (e: any) => {
                        reject(new Error(e.message));
                    }

                    xhr.onprogress = (p: ProgressEvent) => {
                        if (conf.onProgress) {
                            conf.onProgress(p);
                        }
                    }

                    xhr.open(conf.method, conf.url, true);
                    conf.header.forEach((item: IRequestHeader) => {
                        xhr.setRequestHeader(item.key, item.value);
                    });

                    xhr.send(conf.data);
                    console.groupEnd();
                }
                catch (e) {
                    console.log('Util error');
                    console.log(e);
                    reject(new Error(e.message));
                }
            });
        }

        conf(): IAjaxConfiguration {
            return {
                data: '',
                header: [],
                method: '',
                url: ''
            }
        }
    }

    export const ajax: Ajax = new Ajax();
}

interface IAjaxConfiguration {
    method: string;
    url: string;
    data: string;
    onProgress?: (p: ProgressEvent) => void;
    header: IRequestHeader[]
}

interface IRequestHeader {
    key: string;
    value: string;
}
