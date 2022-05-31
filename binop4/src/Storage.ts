namespace storage {
    export function simpan(): void {
        let str: string;

        str = JSON.stringify(data.simpan());
        window.localStorage.setItem('ha.binop', str);
    }

    export function muat(): void {
        let str: string;
        let obj: ISimpan;

        try {
            str = window.localStorage.getItem('ha.binop');
            obj = JSON.parse(str);
            data.muat(obj);
        }
        catch (e) {

        }
    }
}