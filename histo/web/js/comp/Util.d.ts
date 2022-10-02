declare namespace ha.comp {
    class Util {
        static readonly sUserId: string;
        static readonly sLevel: string;
        static readonly sFilter: string;
        static readonly storageId: string;
        static getEl(query: string, parent?: HTMLElement, err?: boolean): HTMLElement;
        static error(e: Error): void;
        static kirimWa(teks: string): string;
        static getUrl(url: string, params: any[]): string;
        static AjaxLogin(type: string, urlServer: string, dataStr: string, loginUrl: string, pf?: (p: ProgressEvent) => void): Promise<XMLHttpRequest>;
        static Ajax2(type: string, url: string, dataStr: string, pf?: (p: ProgressEvent) => void): Promise<string>;
        static sql(query: string): Promise<any[]>;
        static Ajax(type: string, url: string, dataStr: string, pf?: (p: ProgressEvent) => void): Promise<XMLHttpRequest>;
    }
}
