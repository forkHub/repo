
namespace ha.list {

    class List {
        readonly ar: IListObj[] = [];
        readonly obj: ListObj = new ListObj();
        private aktif: IListObj;

        getByNama(nama: string): IListObj {

            for (let i: number = 0; i < this.ar.length; i++) {
                if (this.ar[i].nama == nama) {
                    this.aktif = this.ar[i];
                    return this.aktif;
                }
            }

            return null;
        }

        baru(nama: string): void {
            this.ar.push({
                nama: nama,
                aktif: null
            });
        }

        hapus(): void {
            if (!this.aktif) {
                return;
            }

            for (let i: number = 0; i < this.ar.length; i++) {
                if (this.ar[i] == this.aktif) {
                    this.ar.splice(i, 1);
                    this.aktif = null;
                    return;
                }
            }
        }
    }

    class ListObj {
        maju(list: IListObj) {
            if (list.aktif.set) {
                list.aktif = list.aktif.set;
            }
        }

        mundur(list: IListObj) {
            if (list.aktif.seb) {
                list.aktif = list.aktif.seb;
            }
        }

        sisip(list: IListObj, data: any): void {
            if (!list.aktif) {
                list.aktif = {
                    data: data
                }
                return;
            }

            let item: IItem = {
                seb: list.aktif,
                set: list.aktif.set,
                data: data
            }

            if (list.aktif.set) {
                list.aktif.set.seb = item;
            }

            list.aktif.set = item;
            list.aktif = item;
        }

        hapus(list: IListObj): void {
            if (!list.aktif) {
                return;
            }

            if (list.aktif.seb) {
                list.aktif.seb.set = list.aktif.set;
            }

            if (list.aktif.set) {
                list.aktif.set.seb = list.aktif.seb
            }

            if (list.aktif.seb) {
                list.aktif = list.aktif.seb;
            }
            else if (list.aktif.set) {
                list.aktif = list.aktif.set;
            }
            else {
                list.aktif = null;
            }
        }

        update(list: IListObj, data: any): void {
            if (!list.aktif) return;
            list.aktif.data = data;
        }
    }

    interface IListObj {
        nama?: string,
        aktif?: IItem
    }

    interface IItem {
        seb?: IItem
        set?: IItem
        data: any
    }

    export var list: List = new List();
}