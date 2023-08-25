namespace ha.bbjs {
    type Obj = {
        id: number,
        obj: any;
        type: string
    }

    export class List {
        static readonly list: Obj[] = [];

        static TambahSprite(obj: any): number {

            //TODO: convert ke sprite 2
            let obj2 = (obj as ISprite2);
            obj2.tile = false;

            let id = Id.getId();
            List.list.push({
                id: id,
                obj: obj2,
                type: 'sprite'
            });

            return id;
        }

        static Ambil(id: number): any {
            for (let i = 0; i < List.list.length; i++) {
                if (List.list[i].id == id) return List.list[i].obj;
            }

            console.warn('object , id: ' + id + 'tidak ketemu');
            return null;
        }

        static AmbilSprite(id: number): ha.bbjs.Sprite {
            return List.Ambil(id) as ha.bbjs.Sprite;
        }
    }
}