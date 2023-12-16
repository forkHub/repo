namespace ha.blockly {

    export enum EEntity {
        PROJECT = "project",
        FILE = "file",
    }

    export class Entity {
        private static readonly dbName = 'ha.blockly.data2';
        static readonly list: IEntity[] = [];

        static init() {
            try {
                let str;
                let obj: IEntity[];

                while (this.list.length > 0) {
                    this.list.pop();
                }

                str = window.localStorage.getItem(this.dbName);
                obj = JSON.parse(str);

                obj.forEach((item) => {
                    this.list.push(item);
                })

            }
            catch (e) {
                console.log('load error');
                console.warn(e);
            }
        }

        static getByType(ty: EEntity): IEntity[] {
            let hasil: IEntity[] = [];

            this.list.forEach((item) => {
                if (item.type == ty) {
                    hasil.push(item);
                }
            })

            return hasil;

        }

        static getById(id: string): IEntity {
            let hasil: IEntity;

            this.list.forEach((item) => {
                if (item.id == id) {
                    hasil = item;
                }
            })

            return hasil;
        }

        static getByParentId(pId: string): IEntity {
            let hasil: IEntity;

            this.list.forEach((item) => {
                if (item.parentId == pId) {
                    hasil = item;
                }
            })

            return hasil;
        }

        static update(id: string, data: IEntity) {
            this.delete(id);
            this.tambah(data);
        }

        static delete(id: string): void {
            console.group('delete by id ' + id);
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].id == id) {
                    console.log('deleted ' + id);
                    this.list.splice(i, 1);
                    break;
                }
            }
            console.groupEnd();
        }

        static tambah(data: IEntity): void {
            this.list.push(data);
        }

        static commit() {
            try {
                window.localStorage.setItem(this.dbName, JSON.stringify(this.list));
            }
            catch (e) {
                console.error(e);
            }
        }
    }

    export class Project {

        getById(id: string): IProject {
            return Entity.getById(id) as IProject;
        }

        delete(id: string): void {
            Entity.delete(id);
        }

        update(data: IProject): void {
            Entity.update(data.id, data);
        }

        tambah(data: IProject): void {
            Entity.tambah(data);
        }
    }

    export class File {
        getById(id: string): IFile {
            id;
            return null;
        }

        delete(id: string): void {
            id;
        }

        update(data: IFile): void {
            data;
        }

        tambah(data: IFile): void {
            data;
        }
    }
}